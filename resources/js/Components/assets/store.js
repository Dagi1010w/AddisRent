// src/component/assets/store.js
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

// Create the reactive state for dark mode ONCE and export it.
// Every file that imports 'isDark' will get this EXACT SAME ref.
export const isDark = useDark();

// Create the toggle function ONCE and export it.
const internalToggle = useToggle(isDark);

// Create our own toggle function that adds a console log for debugging.
export function toggleDarkMode() {
  console.log('Global toggleDarkMode function in store.js was called!');
  internalToggle();
}