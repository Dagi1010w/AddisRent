<!-- src/component/DarkModeToggle.vue -->
<script setup>
import { computed } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';

// --- THIS IS THE CRITICAL CHANGE ---
// Import the state and the function directly from our new store file.
import { isDark, toggleDarkMode } from './assets/store.js';

const iconAnimation = computed(() => ({
  rotate: isDark.value ? 180 : 0,
  transition: { duration: 0.3 }
}));
</script>

<template>
  <button
    @click="toggleDarkMode"
    class="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-xl"
    aria-label="Toggle dark mode"
  >
    <div v-motion :animate="iconAnimation">
      <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />
      <Moon v-else class="w-5 h-5 text-gray-600" />
    </div>
  </button>
</template>