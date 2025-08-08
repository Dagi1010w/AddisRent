<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function authorize()
    {
        // Allow only authenticated users to update their profile
        return Auth::check();
    }

    public function rules()
    {
        $userId = Auth::id();

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'lowercase',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => ['nullable', 'confirmed', Password::defaults()], // nullable for updates without password change
            'phone_number' => [
                'required',
                'string',
                Rule::unique('users', 'phone_number')->ignore($userId),
            ],
            'location_region' => ['required', 'string', 'max:255'],
            'location_city' => ['required', 'string', 'max:255'],
            'location_subcity' => ['required', 'string', 'max:255'],
            'location_specific_area' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'in:person,company'],

            // Person-specific
            'gender' => ['required_if:type,person', 'in:male,female,other'],

            // Company-specific
            'google_map_link' => ['nullable', 'url'],
            'business_license_path' => ['nullable', 'string'],
        ];
    }

    public function prepareForValidation()
    {
        if ($this->has('email')) {
            // force email to lowercase before validation
            $this->merge([
                'email' => strtolower($this->input('email')),
            ]);
        }
    }

}