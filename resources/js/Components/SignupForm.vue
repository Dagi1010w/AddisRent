<!-- src/component/SignupForm.vue -->
<script setup>
import { ref, computed, watch } from 'vue';
import { useLanguage } from './assets/useLanguage';
import { useFormValidation } from './assets/useFormValidation';
import { ethiopianLocations } from './assets/location';
import { Eye, EyeOff, Upload, User, Building2, Home, Search, Sparkles, TrendingUp } from 'lucide-vue-next';

// --- STATE MANAGEMENT & LOGIC ---
const { language, t } = useLanguage();
const { formData, errors, isSubmitting, updateField, touchField, validateForm } = useFormValidation(t);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSuccess = ref(false);
const formElement = ref(null);

const roleOptions = computed(() => [
    { id: 'tenant', label: t.value('roles.tenant'), icon: Home, description: t.value('roles.tenantDesc'), color: 'bg-blue-500' },
    { id: 'buyer', label: t.value('roles.buyer'), icon: Search, description: t.value('roles.buyerDesc'), color: 'bg-green-500' },
    { id: 'lessor', label: t.value('roles.lessor'), icon: Building2, description: t.value('roles.lessorDesc'), color: 'bg-[var(--color-orange-primary)]' },
    { id: 'seller', label: t.value('roles.seller'), icon: TrendingUp, description: t.value('roles.sellerDesc'), color: 'bg-purple-500' }
]);

// --- LOCATION LOGIC ---
const selectedRegionData = computed(() => {
  if (!formData.region) return null;
  return ethiopianLocations.regions.find(r => r.id === formData.region);
});

const availableCities = computed(() => {
  return selectedRegionData.value?.cities || [];
});

const availableSubcities = computed(() => {
  return selectedRegionData.value?.subcities || [];
});

const availableAreas = computed(() => {
  if (!formData.subcity) return [];
  const selectedSubcity = availableSubcities.value.find(s => s.id === formData.subcity);
  return selectedSubcity ? selectedSubcity.areas : [];
});

watch(() => formData.region, () => {
  formData.city = '';
  formData.subcity = '';
  formData.area = '';
});
watch(() => formData.subcity, () => {
  formData.area = '';
});

const handleFileUpload = (e) => {
  const file = e.target.files?.[0];
  if (file) { updateField('businessLicense', file); }
};
const handleSubmit = async () => {
  if (!validateForm()) {
    if (formElement.value) {
      formElement.value.classList.add('animate-shake');
      setTimeout(() => { formElement.value.classList.remove('animate-shake'); }, 500);
    }
    return;
  }
  isSubmitting.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  isSubmitting.value = false;
  isSuccess.value = true;
};
const startOver = () => { isSuccess.value = false; };

const inputBaseClasses = 'w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:scale-105 bg-[#f3f3f5] dark:bg-gray-700/50 text-[var(--foreground)] dark:text-white dark:placeholder:text-gray-400';
const inputBorderClasses = (hasError) => hasError ? 'border-red-500' : 'border-[var(--border)] dark:border-gray-600';
</script>

<template>
  <!-- Success View -->
  <div v-if="isSuccess" v-motion-fade class="flex flex-col items-center justify-center h-full text-center">
    <div v-motion-pop :delay="200" class="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6"><Sparkles class="w-12 h-12 text-[var(--color-green-accent)]" /></div>
    <h2 :class="['text-3xl font-bold mb-4 text-[var(--foreground)]', { 'font-amharic': language === 'am' }]">{{ t('success.welcome') }}</h2>
    <p :class="['text-lg text-gray-600 dark:text-gray-300 mb-6', { 'font-amharic': language === 'am' }]">{{ t('success.accountCreated') }}</p>
    <button @click="startOver" class="px-6 py-2 bg-[var(--color-orange-primary)] hover:bg-[var(--color-orange-gradient)] text-white font-semibold rounded-lg shadow-md">{{ t('actions.getStarted') }}</button>
  </div>

  <!-- Form View -->
  <div v-else v-motion-fade-in :class="['w-full max-w-md mx-auto', { 'font-amharic': language === 'am' }]">
    <form ref="formElement" @submit.prevent="submit" class="space-y-6">

      <!-- Role Selection -->
      <div v-motion-fade-in :delay="100">
        <label class="text-base font-semibold mb-4 block text-[var(--foreground)]">{{ t('roles.selectRole') }}</label>
        <div class="grid grid-cols-2 gap-3">
          <button v-for="role in roleOptions" :key="role.id" type="button" @click="updateField('userRole', role.id)" v-motion :hovered="{ scale: 1.02 }" :tapped="{ scale: 0.98 }" :class="['relative p-4 rounded-xl border-2 transition-all duration-200 text-left', formData.userRole === role.id ? 'border-[var(--color-orange-primary)] bg-orange-50 dark:bg-orange-900/20' : 'border-[var(--border)] dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600']">
            <div class="flex flex-col items-center text-center space-y-2">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', role.color]"><component :is="role.icon" class="w-5 h-5 text-white" /></div>
              <div><p class="font-medium text-sm text-[var(--foreground)]">{{ role.label }}</p><p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ role.description }}</p></div>
            </div>
            <div v-if="formData.userRole === role.id" v-motion-pop class="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-orange-primary)] rounded-full flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full" /></div>
          </button>
        </div>
      </div>

      <!-- General Information -->
      <div v-motion-fade-in :delay="200" class="space-y-4">
        <label class="text-base font-semibold mb-3 block text-[var(--foreground)]">{{ t('account.accountType') }}</label>
        <div class="grid grid-cols-2 gap-3">
          <button type="button" @click="updateField('accountType', 'individual')" :class="['p-3 rounded-lg border-2 transition-all duration-200 text-center', formData.accountType === 'individual' || !formData.accountType ? 'border-[var(--color-orange-primary)] bg-orange-50 dark:bg-orange-900/20' : 'border-[var(--border)] dark:border-gray-700 hover:border-gray-300']"><User class="w-6 h-6 mx-auto mb-1 text-[var(--color-orange-primary)]" /><p class="text-sm font-medium text-[var(--foreground)]">{{ t('account.individual') }}</p></button>
          <button type="button" @click="updateField('accountType', 'organization')" :class="['p-3 rounded-lg border-2 transition-all duration-200 text-center', formData.accountType === 'organization' ? 'border-[var(--color-orange-primary)] bg-orange-50 dark:bg-orange-900/20' : 'border-[var(--border)] dark:border-gray-700 hover:border-gray-300']"><Building2 class="w-6 h-6 mx-auto mb-1 text-[var(--color-orange-primary)]" /><p class="text-sm font-medium text-[var(--foreground)]">{{ t('account.organization') }}</p></button>
        </div>
        
        <template v-if="formData.accountType === 'organization'">
          <div>
            <label for="organizationName" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.organizationName') }}</label>
            <input id="organizationName" type="text" v-model="formData.organizationName" @blur="touchField('organizationName')" :placeholder="t('fields.organizationNamePlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.organizationName)]" />
            <p v-if="errors.organizationName" class="text-red-500 text-sm mt-1">{{ errors.organizationName }}</p>
          </div>
          <div>
            <label for="googleMapsLink" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.googleMapsLink') }}</label>
            <input id="googleMapsLink" type="url" v-model="formData.googleMapsLink" @blur="touchField('googleMapsLink')" :placeholder="t('fields.googleMapsPlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.googleMapsLink)]" />
            <p v-if="errors.googleMapsLink" class="text-red-500 text-sm mt-1">{{ errors.googleMapsLink }}</p>
          </div>
          <div>
            <label for="businessLicense" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.businessLicense') }}</label>
            <label class="mt-2 flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-[var(--color-orange-primary)]" :class="[inputBorderClasses(errors.businessLicense)]">
              <div class="text-center">
                <Upload class="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('fields.uploadLicense') }}</p>
                <p v-if="formData.businessLicense" class="text-xs text-green-600 mt-1">{{ formData.businessLicense.name }}</p>
              </div>
              <input type="file" @change="handleFileUpload" class="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </label>
            <p v-if="errors.businessLicense" class="text-red-500 text-sm mt-1">{{ errors.businessLicense }}</p>
          </div>
        </template>
        <template v-else>
          <div>
            <label for="fullName" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.fullName') }}</label>
            <input id="fullName" type="text" v-model="formData.fullName" @blur="touchField('fullName')" :placeholder="t('fields.fullNamePlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.fullName)]" />
            <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
          </div>
        </template>
      </div>

      <!-- Contact & Security -->
      <div v-motion-fade-in :delay="300" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.email') }}</label>
          <input id="email" type="email" v-model="formData.email" @blur="touchField('email')" :placeholder="t('fields.emailPlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.email)]" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div>
          <label for="phoneNumber" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.phoneNumber') }}</label>
          <input id="phoneNumber" type="tel" v-model="formData.phoneNumber" @blur="touchField('phoneNumber')" :placeholder="t('fields.phoneNumberPlaceholder')" :class="[inputBaseClasses, inputBorderClasses(errors.phoneNumber)]" />
          <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.password') }}</label>
          <div class="relative"><input id="password" :type="showPassword ? 'text' : 'password'" v-model="formData.password" @blur="touchField('password')" :placeholder="t('fields.passwordPlaceholder')" :class="['pr-10', inputBaseClasses, inputBorderClasses(errors.password)]" /><button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center"><component :is="showPassword ? EyeOff : Eye" class="h-4 w-4 text-gray-400" /></button></div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('fields.confirmPassword') }}</label>
          <div class="relative"><input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.confirmPassword" @blur="touchField('confirmPassword')" :placeholder="t('fields.confirmPasswordPlaceholder')" :class="['pr-10', inputBaseClasses, inputBorderClasses(errors.confirmPassword)]" /><button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center"><component :is="showConfirmPassword ? EyeOff : Eye" class="h-4 w-4 text-gray-400" /></button></div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>
      </div>

      <!-- Location Section -->
      <div v-motion-fade-in :delay="400" class="space-y-4">
        <h3 class="text-base font-semibold text-[var(--foreground)]">{{ t('location.location') }}</h3>
        <div>
          <label for="region" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('location.region') }}</label>
          <select id="region" v-model="formData.region" @blur="touchField('region')" :class="[inputBaseClasses, inputBorderClasses(errors.region)]">
            <option disabled value="">{{ t('location.regionPlaceholder') }}</option>
            <option v-for="region in ethiopianLocations.regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
          <p v-if="errors.region" class="text-red-500 text-sm mt-1">{{ errors.region }}</p>
        </div>
        
        <template v-if="formData.region === 'addis_ababa'">
          <div v-if="availableSubcities.length > 0">
            <label for="subcity" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('location.subcity') }}</label>
            <select id="subcity" v-model="formData.subcity" @blur="touchField('subcity')" :class="[inputBaseClasses, inputBorderClasses(errors.subcity)]">
              <option disabled value="">{{ t('location.subcityPlaceholder') }}</option>
              <option v-for="subcity in availableSubcities" :key="subcity.id" :value="subcity.id">{{ subcity.name }}</option>
            </select>
            <p v-if="errors.subcity" class="text-red-500 text-sm mt-1">{{ errors.subcity }}</p>
          </div>
          <div v-if="availableAreas.length > 0">
            <label for="area" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('location.area') }}</label>
            <select id="area" v-model="formData.area" @blur="touchField('area')" :disabled="!formData.subcity" :class="[inputBaseClasses, inputBorderClasses(errors.area)]">
              <option disabled value="">{{ t('location.areaPlaceholder') }}</option>
              <option v-for="area in availableAreas" :key="area.id" :value="area.id">{{ area.name }}</option>
            </select>
            <p v-if="errors.area" class="text-red-500 text-sm mt-1">{{ errors.area }}</p>
          </div>
        </template>
        <template v-else-if="formData.region">
          <div v-if="availableCities.length > 0">
            <label for="city" class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ t('location.city') }}</label>
            <select id="city" v-model="formData.city" @blur="touchField('city')" :class="[inputBaseClasses, inputBorderClasses(errors.city)]">
              <option disabled value="">{{ t('location.cityPlaceholder') }}</option>
              <option v-for="city in availableCities" :key="city.id" :value="city.id">{{ city.name }}</option>
            </select>
            <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
          </div>
        </template>

      </div>

      <!-- Submit Section -->
      <div v-motion-fade-in :delay="500" class="pt-2">
        <div class="flex items-start space-x-3 mb-6">
          <input id="agreeToTerms" type="checkbox" v-model="formData.agreeToTerms" @blur="touchField('agreeToTerms')" class="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--color-orange-primary)] focus:ring-2 focus:ring-[var(--color-orange-primary)] focus:ring-offset-2 dark:focus:ring-offset-gray-900" />
          <div>
            <label for="agreeToTerms" class="text-sm leading-relaxed cursor-pointer text-gray-600 dark:text-gray-300">
              {{ t('terms.agree') }}
              <a href="#" class="text-[var(--color-orange-primary)] hover:underline">{{ t('terms.termsConditions') }}</a> {{ t('terms.and') }} <a href="#" class="text-[var(--color-orange-primary)] hover:underline">{{ t('terms.privacyPolicy') }}</a>
            </label>
            <p v-if="errors.agreeToTerms" class="text-red-500 text-sm mt-1">{{ errors.agreeToTerms }}</p>
          </div>
        </div>
        <button type="submit" :disabled="isSubmitting" class="w-full py-3 text-lg font-semibold relative overflow-hidden group transition-all duration-300 transform hover:scale-105 rounded-lg text-white bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-gradient)] disabled:opacity-60 disabled:cursor-not-allowed">
          <span class="relative z-10">{{ isSubmitting ? t('actions.creatingAccount') : t('actions.createAccount') }}</span>
        </button>
      </div>
    </form>
    
    <div v-motion-fade-in :delay="600" class="mt-8 text-center space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ t('nav.alreadyAccount') }}
        <a href="#" class="font-medium text-[var(--color-orange-primary)] hover:underline">{{ t('nav.loginHere') }}</a>
      </p>
    </div>
  </div>
</template>