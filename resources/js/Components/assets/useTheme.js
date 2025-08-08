import { useDark, useToggle } from '@vueuse/core';

export function useTheme() {
  // This one line from @vueuse/core does all the heavy lifting:
  // 1. It creates a reactive `isDark` ref.
  // 2. It automatically adds or removes the 'dark' class from the <html> element.
  // 3. It automatically detects the user's system preference (e.g., if their OS is in dark mode).
  // 4. It saves the user's choice to localStorage, so the theme persists across page reloads.
  const isDark = useDark();

  // This is a simple helper from @vueuse/core that creates a function
  // to flip the boolean value of isDark.
  const toggleTheme = useToggle(isDark);

  // We export the reactive state and the toggle function so any component can use them.
  return {
    isDark,
    toggleTheme,
  };
}