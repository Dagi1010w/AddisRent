<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from './assets/useLanguage';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Scale, Globe, DollarSign } from 'lucide-vue-next';
import ComparisonModal from './ComparsionModal.vue';

const props = defineProps({
  compareProperties: { type: Array, default: () => [] },
});
const emit = defineEmits(['removeFromCompare', 'clearCompare']);

const isCompareModalOpen = ref(false);

const { language, setLanguage, currency, setCurrency, t } = useLanguage();

const currencies = computed(() => [
  { value: 'ETB', label: 'ETB', name: t('currency.etb') },
  { value: 'USD', label: 'USD', name: t('currency.usd') },
  { value: 'EUR', label: 'EUR', name: t('currency.eur') },
]);

const handleLanguageChange = (newLanguage) => setLanguage(newLanguage);
const handleCurrencyChange = (newCurrency) => setCurrency(newCurrency);
</script>

<template>
  <div>
    <div class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3">
      <!-- Compare Button -->
      <div class="relative group">
        <Button
          variant="outline" size="icon" @click="isCompareModalOpen = true"
          :class="['w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110', compareProperties.length >= 2 ? 'animate-pulse border-blue-500' : 'border-blue-200']"
        >
          <Scale class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span v-if="compareProperties.length > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {{ compareProperties.length }}
          </span>
        </Button>
        <div class="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
          <div class="text-sm font-medium">{{ t('nav.compare') }}</div>
          <div class="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
        </div>
      </div>

      <!-- Language Switcher -->
      <div class="relative group">
        <dropdown-menu>
          <dropdown-menu-trigger as-child>
            <Button variant="outline" size="icon" class="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all hover:scale-110">
              <Globe class="w-5 h-5 text-orange-600" />
            </Button>
          </dropdown-menu-trigger>
          <!-- **THE FIX**: Pass attributes as props with the colon -->
          <dropdown-menu-content :align="'center'" :side="'right'" class="ml-2">
            <DropdownMenuItem @click="handleLanguageChange('en')" :class="['cursor-pointer', language === 'en' && 'bg-orange-50 dark:bg-orange-900/50']">
              English
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleLanguageChange('am')" :class="['cursor-pointer', language === 'am' && 'bg-orange-50 dark:bg-orange-900/50']">
              አማርኛ
            </DropdownMenuItem>
          </dropdown-menu-content>
        </dropdown-menu>
      </div>

      <!-- Currency Selector -->
      <div class="relative group">
        <dropdown-menu>
          <dropdown-menu-trigger as-child>
            <Button variant="outline" size="icon" class="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all hover:scale-110">
              <DollarSign class="w-5 h-5 text-green-600" />
            </Button>
          </dropdown-menu-trigger>
          <!-- **THE FIX**: Pass attributes as props with the colon -->
          <dropdown-menu-content :align="'center'" :side="'right'" class="ml-2">
            <dropdown-menu-item
              v-for="curr in currencies" :key="curr.value" @click="handleCurrencyChange(curr.value)"
              :class="['cursor-pointer', currency === curr.value && 'bg-green-50 dark:bg-green-900/50']"
            >
               {{ curr.name }} ({{ curr.label }})
            </dropdown-menu-item>
          </dropdown-menu-content>
        </dropdown-menu>
      </div>
    </div>
    
    <!-- Modal -->
    <ComparisonModal
      v-model:open="isCompareModalOpen"
      :properties-to-compare="props.compareProperties"
      @remove-from-compare="emit('removeFromCompare', $event)"
      @clear-compare="emit('clearCompare')"
    />
  </div>
</template>

<style scoped>
.group:hover .pointer-events-none {
  pointer-events: auto;
}
</style>