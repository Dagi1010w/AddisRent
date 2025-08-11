@/Components/<script setup>
import { provide } from 'vue';
import { useStorage } from '@vueuse/core';
import { translations } from '@/Components/assets/translation';
import { languageKey } from '@/Components/assets/useLanguage';

const language = useStorage('language', 'en');
const currency = useStorage('currency', 'ETB');

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

const t = (key) => {
  const lang = language.value;
  const translation = translations[lang]?.[key];
  if (translation) return translation;
  const fallback = translations.en?.[key];
  if (fallback) return fallback;
  return key;
};

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
  // Fix here:
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
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
