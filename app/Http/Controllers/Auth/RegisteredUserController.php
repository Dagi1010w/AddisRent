<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

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
        // Check if the email being registered is admin@example.com
        $isAdminEmail = strtolower($request->input('email')) === 'admin@example.com';

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
            // preference is nullable ONLY if email is admin@example.com
            'preference' => [
    // Rule #1: Conditional Exclusion
    Rule::excludeIf($request->input('email') === 'admin@example.com'),
    
    // Rule #2: Required (for everyone else)
    'required',
    
    // Rule #3: Must be one of the specified values (for everyone else)
    Rule::in(['lister', 'seeker']), 
],

            // Person-specific
            'gender' => $request->input('type') === 'person' ? 'required|in:male,female,other' : 'nullable',

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

        // Assign preference only if not admin email and preference present
        if (!$isAdminEmail && isset($validated['preference'])) {
            $user->preference = $validated['preference'];
        } else {
            $user->preference = null;
        }

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
