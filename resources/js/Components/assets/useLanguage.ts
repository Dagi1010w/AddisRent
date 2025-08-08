import { inject } from 'vue';

export const languageKey = Symbol();

export function useLanguage() {
   const context = inject(languageKey);

  if (context === undefined) {
    throw new Error('useLanguage() must be used within a <LanguageProvider>');
  }

   return context;
}