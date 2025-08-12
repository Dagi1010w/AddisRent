<!-- src/components/LanguageToggle.vue -->
<script setup>
import { computed } from 'vue';
import { useLanguage } from './assets/useLanguage';
import { Languages } from 'lucide-vue-next';

// Get the shared state and functions from our language composable
const { language, setLanguage } = useLanguage();

/**
 * Toggles the language between English and Amharic.
 */
const toggleLanguage = () => {
  setLanguage(language.value === 'en' ? 'am' : 'en');
};

/**
 * A computed property for the short display text inside the button (e.g., 'EN').
 * It will automatically update when the language ref changes.
 */
const languageDisplay = computed(() => {
  return language.value === 'en' ? 'EN' : 'አማ';
});

/**
 * A computed property for the tooltip text.
 * It shows the full name of the language you will switch TO.
 */
const nextLanguageName = computed(() => {
  return language.value === 'en' ? 'አማርኛ' : 'English';
});
</script>

<template>
  <!-- 
    The 'group' class on this parent div allows child elements (like the tooltip)
    to react when this entire area is hovered.
  -->
  <div class="fixed top-6 left-6 z-50 group">
    <!-- Button Container with initial fade-in animation -->
    <div
      v-motion
      :initial="{ opacity: 0, x: -20 }"
      :enter="{ opacity: 1, x: 0, transition: { delay: 500 } }"
    >
      <button
        @click="toggleLanguage"
        class="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-md px-3 py-1.5 text-sm"
        aria-label="Toggle language"
      >
        <Languages class="w-4 h-4" />
        <span class="font-medium">
          {{ languageDisplay }}
        </span>
      </button>
    </div>
    
    <!-- 
      Tooltip:
      - It starts invisible ('opacity-0') and slightly scaled down ('scale-95').
      - When the parent 'group' is hovered, it becomes visible ('group-hover:opacity-100')
        and scales to its normal size ('group-hover:scale-100').
      - 'pointer-events-none' ensures the tooltip itself doesn't interfere with mouse events.
    -->
    <div
      class="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200"
    >
      {{ nextLanguageName }}
    </div>
  </div>
</template>