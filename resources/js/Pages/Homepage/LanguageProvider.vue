<script setup>
import { provide } from 'vue';
// 1. Import useStorage from @vueuse/core
import { useStorage } from '@vueuse/core';
import { translations } from './assets/translation'; // Corrected path
import { languageKey } from './assets/useLanguage';

// --- REACTIVE STATE using useStorage ---
// **THE FIX**: These two lines replace your onMounted and watch hooks.
// `useStorage` creates a ref that is automatically saved to localStorage
// and stays in sync across browser tabs.
const language = useStorage('language', 'en'); // Key: 'language', Default: 'en'
const currency = useStorage('currency', 'ETB'); // Key: 'currency', Default: 'ETB'

// --- METHODS ---
// These methods now update the useStorage refs directly.
const setLanguage = (lang) => {
  if (['en', 'am'].includes(lang)) {
    language.value = lang;
  }
};

const setCurrency = (curr) => {
  if (['ETB', 'USD', 'EUR'].includes(curr)) {
    currency.value = curr;
  }
};

// Your `t` function is already excellent and needs no changes.
const t = (key) => {
  const lang = language.value;
  const translation = translations[lang]?.[key];
  if (translation) return translation;
  const fallback = translations.en?.[key];
  if (fallback) return fallback;
  return key;
};

// Your formatting functions are also well-written and need no changes.
const formatPrice = (price) => {
  const exchangeRates = { ETB: 1, USD: 0.017, EUR: 0.016 };
  const convertedPrice = Math.round(price * exchangeRates[currency.value]);
  
  switch (currency.value) {
    case 'ETB':
      return `${convertedPrice.toLocaleString()} ብር`;
    case 'USD':
      return `$${convertedPrice.toLocaleString()}`;
    case 'EUR':
      return `€${convertedPrice.toLocaleString()}`;
    default:
      return `${convertedPrice.toLocaleString()} ETB`;
  }
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const locale = language.value === 'am' ? 'am-ET' : 'en-US';
  return date.toLocaleDateString(locale, options);
};

const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return t('time.justNow');
    if (diffMin < 60) return `${diffMin} ${t(diffMin === 1 ? 'time.minuteAgo' : 'time.minutesAgo')}`;
    if (diffHour < 24) return `${diffHour} ${t(diffHour === 1 ? 'time.hourAgo' : 'time.hoursAgo')}`;
    if (diffDay < 30) return `${diffDay} ${t(diffDay === 1 ? 'time.dayAgo' : 'time.daysAgo')}`;
    
    const diffMonth = Math.floor(diffDay / 30);
    return `${diffMonth} ${t(diffMonth === 1 ? 'time.monthAgo' : 'time.monthsAgo')}`;
};

// Provide all state and methods to child components. This remains unchanged.
provide(languageKey, {
  language,
  currency,
  setLanguage,
  setCurrency,
  t,
  formatPrice,
  formatDate,
  formatRelativeTime,
});
</script>

<template>
  <slot></slot>
</template>