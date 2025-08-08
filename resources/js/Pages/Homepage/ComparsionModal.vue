<script setup>
import { computed } from 'vue';
import { useLanguage } from '../../Components/assets/useLanguage'; // 1. Import language composable
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../Components/ui/dialog';
import { Button } from '../../Components/ui/button';
import { Bed, Bath, Maximize, MapPin, Building, Armchair, Trash2 } from 'lucide-vue-next';

// Activate composable
const { t, formatPrice } = useLanguage();

const isOpen = defineModel('open', { type: Boolean });

const props = defineProps({
  propertiesToCompare: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['removeFromCompare', 'clearCompare']);

// 2. Use translation keys for feature labels
const comparisonFeatures = computed(() => [
  { key: 'location', labelKey: 'property.location', icon: MapPin },
  { key: 'type', labelKey: 'filter.propertyType', icon: Building },
  { key: 'bedrooms', labelKey: 'property.bedrooms', icon: Bed },
  { key: 'bathrooms', labelKey: 'property.bathrooms', icon: Bath },
  { key: 'area', labelKey: 'property.area', icon: Maximize, format: (value) => `${value}m²` },
  { key: 'furnished', labelKey: 'property.furnished', icon: Armchair },
]);

const handleRemove = (propertyId) => {
  emit('removeFromCompare', propertyId);
};

const handleClear = () => {
  emit('clearCompare');
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <!-- 3. Add dark mode classes to the main dialog content panel -->
    <DialogContent class="max-w-5xl grid-rows-[auto,1fr,auto] max-h-[90vh] p-0 bg-white dark:bg-gray-900">
      <DialogHeader class="p-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <!-- 4. Translate title and description -->
        <DialogTitle class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('compare.title') }}</DialogTitle>
        <DialogDescription class="dark:text-gray-400">{{ t('compare.subtitle') }}</DialogDescription>
      </DialogHeader>

      <!-- SCROLLABLE CONTENT AREA -->
      <div class="overflow-auto px-6">
        <div v-if="propertiesToCompare.length > 0">
          <table class="w-full border-collapse text-left">
            <thead>
              <!-- 5. Add dark mode classes to the table -->
              <tr class="border-b-2 border-gray-300 dark:border-gray-700">
                <th class="p-4 align-top w-1/5 font-semibold text-gray-700 dark:text-gray-300">{{ t('property.features') }}</th>
                <th
                  v-for="property in propertiesToCompare"
                  :key="property.id"
                  class="p-4 align-top"
                >
                  <div class="flex flex-col gap-2">
                    <img :src="property.image" :alt="property.title" class="w-full h-32 object-cover rounded-lg">
                    <h3 class="font-bold text-base text-gray-800 dark:text-gray-200">{{ property.title }}</h3>
                    <!-- Use the price formatter -->
                    <p class="font-semibold text-lg text-orange-600">{{ formatPrice(property.price) }} / {{ t('property.perMonth') }}</p>
                    <Button variant="outline" size="sm" @click="handleRemove(property.id)">
                      <Trash2 class="w-4 h-4 mr-2" />
                      {{ t('common.delete') }}
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="feature in comparisonFeatures"
                :key="feature.key"
                class="border-b border-gray-200 dark:border-gray-800 even:bg-gray-50/50 dark:even:bg-white/5"
              >
                <!-- Feature name column -->
                <td class="p-4 font-semibold text-gray-600 dark:text-gray-400">
                  <div class="flex items-center gap-2">
                    <component :is="feature.icon" class="w-4 h-4 text-gray-500" />
                    <!-- Use translation key -->
                    <span>{{ t(feature.labelKey) }}</span>
                  </div>
                </td>
                <!-- Property value columns -->
                <td
                  v-for="property in propertiesToCompare"
                  :key="property.id"
                  class="p-4 text-gray-800 dark:text-gray-300"
                >
                  {{ feature.format ? feature.format(property[feature.key]) : property[feature.key] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State Message -->
        <div v-else class="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
          <p class="font-medium">{{ t('compare.noProperties') }}</p>
          <p class="text-sm">{{ t('compare.addProperties') }}</p>
        </div>
      </div>

      <!-- DIALOG FOOTER -->
      <DialogFooter class="p-6 pt-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex justify-end">
        <Button variant="outline" @click="handleClear" :disabled="propertiesToCompare.length === 0">
          {{ t('compare.clearAll') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>