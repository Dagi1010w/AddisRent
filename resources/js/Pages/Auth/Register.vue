<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <div
            class="max-w-md mx-auto bg-background dark:bg-slate-950 border dark:border-slate-800 rounded-lg shadow-lg overflow-hidden"
        >
            <!-- Visual Header (matches GetStarted) -->
            <div
                class="p-6 text-center border-b bg-gradient-to-br from-orange-50 to-green-50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-800"
            >
                <div
                    class="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                        />
                        <circle cx="8.5" cy="7" r="4" />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20 8v6M23 11h-6"
                        />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-50">
                    Create Account
                </h2>
                <p class="text-gray-600 mt-2 dark:text-gray-400">
                    Start your journey with personalized property recommendations.
                </p>
            </div>

            <!-- Form Content -->
            <form
                @submit.prevent="submit"
                class="p-6 space-y-4"
            >
                <div class="space-y-2">
                    <InputLabel
                        for="name"
                        value="Name"
                        class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"
                    />
                    <TextInput
                        id="name"
                        type="text"
                        class="h-11 w-full"
                        v-model="form.name"
                        required
                        autofocus
                        autocomplete="name"
                    />
                    <InputError class="mt-1 text-sm text-red-500" :message="form.errors.name" />
                </div>

                <div class="space-y-2">
                    <InputLabel
                        for="email"
                        value="Email"
                        class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        class="h-11 w-full"
                        v-model="form.email"
                        required
                        autocomplete="username"
                    />
                    <InputError class="mt-1 text-sm text-red-500" :message="form.errors.email" />
                </div>

                <div class="space-y-2">
                    <InputLabel
                        for="password"
                        value="Password"
                        class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"
                    />
                    <TextInput
                        id="password"
                        type="password"
                        class="h-11 w-full"
                        v-model="form.password"
                        required
                        autocomplete="new-password"
                    />
                    <InputError class="mt-1 text-sm text-red-500" :message="form.errors.password" />
                </div>

                <div class="space-y-2">
                    <InputLabel
                        for="password_confirmation"
                        value="Confirm Password"
                        class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        class="h-11 w-full"
                        v-model="form.password_confirmation"
                        required
                        autocomplete="new-password"
                    />
                    <InputError
                        class="mt-1 text-sm text-red-500"
                        :message="form.errors.password_confirmation"
                    />
                </div>

                <div class="flex items-center justify-between pt-4">
                    <Link
                        :href="route('login')"
                        class="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton
                        class="h-11 px-6 bg-gradient-to-br from-orange-500 to-green-600 hover:opacity-90 transition-colors"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </GuestLayout>
</template>
