<script setup>
import { ref } from "vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import AppContent from "@/Components/AppContent.vue";

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

    <AppContent />
</template>
