<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|unique:users,phone_number',
            'location_region' => 'required|string|max:255',
            'location_city' => 'required|string|max:255',
            'location_subcity' => 'required|string|max:255',
            'location_specific_area' => 'nullable|string|max:255',
            'type' => 'required|in:person,company',

            // Person-specific
            'gender' => $request->type === 'person' ? 'required|in:male,female,other' : 'nullable',

            // Company-specific
            'google_map_link' => 'nullable|url',
            'business_license_path' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        $user = new User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->password = bcrypt($validated['password']);
        $user->phone_number = $validated['phone_number'];
        $user->location_region = $validated['location_region'];
        $user->location_city = $validated['location_city'];
        $user->location_subcity = $validated['location_subcity'];
        $user->location_specific_area = $validated['location_specific_area'] ?? null;
        $user->type = $validated['type'];
        $user->save();

        if ($user->type === 'person') {
            $user->personProfile()->create([
                'gender' => $validated['gender'],
            ]);
        } elseif ($user->type === 'company') {
            $businessLicensePath = null;
            if ($request->hasFile('business_license_path')) {
                $businessLicensePath = $request->file('business_license_path')->store('business_licenses', 'public');
            }

            $user->companyProfile()->create([
                'google_map_link' => $validated['google_map_link'] ?? null,
                'business_license_path' => $businessLicensePath,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('home', absolute: false));
    }
}
