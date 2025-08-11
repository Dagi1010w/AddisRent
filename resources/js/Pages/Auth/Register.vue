<script setup>
import { ref } from "vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    location_region: "",
    location_city: "",
    location_subcity: "",
    location_specific_area: "",
    type: "person",
    gender: "",
    google_map_link: "",
    business_license_path: null,
});

const submit = () => {
    form.post(route("register"), {
        forceFormData: true, // needed for file upload
        
    });
};
</script>

<template>
    <Head title="Register" />

    <div class="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 class="text-2xl font-bold mb-4">Register</h1>

        <form @submit.prevent="submit" enctype="multipart/form-data">
            <!-- Name -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Name</label>
                <input v-model="form.name" type="text" class="w-full border rounded p-2" />
                <div v-if="form.errors.name" class="text-red-500 text-sm">{{ form.errors.name }}</div>
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Email</label>
                <input v-model="form.email" type="email" class="w-full border rounded p-2" />
                <div v-if="form.errors.email" class="text-red-500 text-sm">{{ form.errors.email }}</div>
            </div>

            <!-- Phone -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Phone Number</label>
                <input v-model="form.phone_number" type="text" class="w-full border rounded p-2" />
                <div v-if="form.errors.phone_number" class="text-red-500 text-sm">{{ form.errors.phone_number }}</div>
            </div>

            <!-- Location Fields -->
            <div class="grid grid-cols-2 gap-2 mb-4">
                <div>
                    <label class="block font-medium mb-1">Region</label>
                    <input v-model="form.location_region" type="text" class="w-full border rounded p-2" />
                </div>
                <div>
                    <label class="block font-medium mb-1">City</label>
                    <input v-model="form.location_city" type="text" class="w-full border rounded p-2" />
                </div>
                <div>
                    <label class="block font-medium mb-1">Subcity</label>
                    <input v-model="form.location_subcity" type="text" class="w-full border rounded p-2" />
                </div>
                <div>
                    <label class="block font-medium mb-1">Specific Area</label>
                    <input v-model="form.location_specific_area" type="text" class="w-full border rounded p-2" />
                </div>
            </div>

            <!-- Type -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Type</label>
                <select v-model="form.type" class="w-full border rounded p-2">
                    <option value="person">Person</option>
                    <option value="company">Company</option>
                </select>
            </div>

            <!-- If Person -->
            <div v-if="form.type === 'person'" class="mb-4">
                <label class="block font-medium mb-1">Gender</label>
                <select v-model="form.gender" class="w-full border rounded p-2">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <!-- If Company -->
            <div v-if="form.type === 'company'">
                <div class="mb-4">
                    <label class="block font-medium mb-1">Google Map Link</label>
                    <input v-model="form.google_map_link" type="url" class="w-full border rounded p-2" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Business License (PDF)</label>
                    <input type="file" @change="e => form.business_license_path = e.target.files[0]" class="w-full border rounded p-2" />
                </div>
            </div>

            <!-- Password -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Password</label>
                <input v-model="form.password" type="password" class="w-full border rounded p-2" />
            </div>

            <!-- Confirm Password -->
            <div class="mb-4">
                <label class="block font-medium mb-1">Confirm Password</label>
                <input v-model="form.password_confirmation" type="password" class="w-full border rounded p-2" />
            </div>

            <div class="flex items-center justify-between">
                <Link :href="route('login')" class="text-sm text-blue-600 hover:underline">Already registered?</Link>
                <button type="submit" class="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700" :disabled="form.processing">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>
