<!-- src/components/AppContent.vue -->
<script setup>
import { ref } from 'vue';
import { useLanguage } from './component/assets/useLanguage.js';
useLanguage();
import { useLanguage } from './assets/useLanguage';
import DarkModeToggle from './DarkModeToggle.vue';
import LanguageToggle from './LanguageToggle.vue';
import SignupForm from './SignupForm.vue';
import { Home, Building2, Search, TrendingUp, Shield } from 'lucide-vue-next';

const { language, t } = useLanguage();
</script>

<template>
  <div class="h-screen w-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
    <DarkModeToggle />
    <LanguageToggle />

    <div class="flex h-full w-full">
      <!-- Left Section -->
      <div class="w-1/2 h-full relative overflow-hidden hidden lg:block">
        <div class="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&h=900&fit=crop"
            alt="Beautiful Modern Apartment Interior"
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="absolute inset-0"
          :style="{
            background: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)`
          }"
        />

        <div class="relative z-10 h-full flex flex-col justify-center items-center px-12 text-center">

          <div
            v-motion
            :initial="{ opacity: 0, y: -30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
            class="mb-8"
          >
            <div class="flex items-center justify-center mb-4">
              <div class="w-14 h-14 bg-[var(--color-orange-primary)] rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                <Home class="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 :class="['text-4xl font-bold text-white drop-shadow-lg', { 'font-amharic': language === 'am' }]">
                  {{ t('app.title') }}
                </h1>
                <p :class="['text-lg text-white text-opacity-90 drop-shadow-md', { 'font-amharic': language === 'am' }]">
                  {{ t('app.subtitle') }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
            class="mb-8 max-w-2xl"
          >
            <h2 :class="['text-4xl xl:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg', { 'font-amharic': language === 'am' }]">
              {{ t('app.welcome') }}
            </h2>
            <p :class="['text-lg xl:text-xl leading-relaxed text-white text-opacity-95 drop-shadow-md mb-4', { 'font-amharic': language === 'am' }]">
              {{ t('app.description') }}
            </p>
            <p :class="['text-base xl:text-lg leading-relaxed text-white text-opacity-90 drop-shadow-md', { 'font-amharic': language === 'am' }]">
              {{ t('app.tagline') }}
            </p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
            class="grid grid-cols-2 gap-4 w-full max-w-xl"
          >
            <div class="bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 shadow-xl">
              <div class="flex items-center mb-2">
                <div class="w-7 h-7 bg-[var(--color-orange-primary)] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <Building2 class="w-4 h-4 text-white" />
                </div>
                <h3 :class="['font-semibold text-black', { 'font-amharic': language === 'am' }]">
                  {{ t('features.listProperties') }}
                </h3>
              </div>
              <p :class="['text-sm text-black text-opacity-90 leading-relaxed', { 'font-amharic': language === 'am' }]">
                {{ t('features.listPropertiesDesc') }}
              </p>
            </div>

            <div class="bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 shadow-xl">
              <div class="flex items-center mb-2">
                <div class="w-7 h-7 bg-[var(--color-green-accent)] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <Search class="w-4 h-4 text-white" />
                </div>
                <h3 :class="['font-semibold text-black', { 'font-amharic': language === 'am' }]">
                  {{ t('features.findRentals') }}
                </h3>
              </div>
              <p :class="['text-sm text-black text-opacity-90 leading-relaxed', { 'font-amharic': language === 'am' }]">
                {{ t('features.findRentalsDesc') }}
              </p>
            </div>

            <div class="bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 shadow-xl">
              <div class="flex items-center mb-2">
                <div class="w-7 h-7 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-green-accent)] rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <TrendingUp class="w-4 h-4 text-white" />
                </div>
                <h3 :class="['font-semibold text-black', { 'font-amharic': language === 'am' }]">
                  {{ t('features.investSmart') }}
                </h3>
              </div>
              <p :class="['text-sm text-black text-opacity-90 leading-relaxed', { 'font-amharic': language === 'am' }]">
                {{ t('features.investSmartDesc') }}
              </p>
            </div>

            <div class="bg-white bg-opacity-15 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-20 shadow-xl">
              <div class="flex items-center mb-2">
                <div class="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <Shield class="w-4 h-4 text-white" />
                </div>
                <h3 :class="['font-semibold text-black', { 'font-amharic': language === 'am' }]">
                  {{ t('features.trustedNetwork') }}
                </h3>
              </div>
              <!-- THIS IS THE CORRECTED LINE -->
              <p :class="['text-sm text-black text-opacity-90 leading-relaxed', { 'font-amharic': language === 'am' }]">
                {{ t('features.trustedNetworkDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="w-full lg:w-1/2 h-full bg-white dark:bg-gray-900 flex flex-col">

        <div class="flex-shrink-0 px-6 lg:px-8 pt-6">
          <div class="lg:hidden text-center mb-4">
            <div
              v-motion
              :initial="{ opacity: 0, y: -20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
              class="flex items-center justify-center mb-3"
            >
              <div class="w-10 h-10 bg-[var(--color-orange-primary)] rounded-xl flex items-center justify-center mr-3">
                <Home class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 :class="['text-2xl font-bold text-[var(--color-orange-primary)]', { 'font-amharic': language === 'am' }]">
                  {{ t('app.title') }}
                </h1>
                <p :class="['text-xs text-gray-600 dark:text-gray-400', { 'font-amharic': language === 'am' }]">
                  {{ t('app.subtitle') }}
                </p>
              </div>
            </div>
          </div>

          <div class="text-center mb-4">
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            >
              <h2 :class="['text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1', { 'font-amharic': language === 'am' }]">
                <span class="hidden lg:inline">{{ t('form.createAccount') }}</span>
                <span class="lg:hidden">{{ t('form.createAccountMobile') }}</span>
              </h2>
              <p :class="['text-sm text-gray-600 dark:text-gray-400', { 'font-amharic': language === 'am' }]">
                 <span class="hidden lg:inline">{{ t('form.getStarted') }}</span>
                 <span class="lg:hidden">{{ t('form.joinToday') }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 lg:px-8 pb-6">
          <div class="flex justify-center">
            <div
              v-motion
              :initial="{ opacity: 0, x: 50 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
              class="w-full max-w-lg"
            >
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Background -->
    <div class="lg:hidden fixed inset-0 -z-10">
      <div class="absolute inset-0">
         <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=1200&fit=crop"
            alt="Beautiful Apartment Mobile Background"
            class="w-full h-full object-cover opacity-20"
          />
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-900 opacity-95"></div>
    </div>
  </div>
</template>
