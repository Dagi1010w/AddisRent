<!-- File: src/components/FeaturedListings.vue -->
<script setup>
import { useLanguage } from './assets/useLanguage';
import { Button } from './ui/button';
import PropertyCard from './PropertyCard.vue';

const props = defineProps({
  properties: { type: Array, required: true },
  favoriteProperties: { type: Set, required: true },
  compareProperties: { type: Set, required: true },
});

const emit = defineEmits(['toggleCompare']);

// Only emit toggleCompare since we removed toggleFavorite interaction here
const onToggleCompare = (propertyId) => {
  emit('toggleCompare', propertyId);
};

const { t } = useLanguage();
</script>

<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('featured.title') }}</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{{ t('featured.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"

          :is-in-compare="compareProperties.has(property.id)"
          @toggle-compare="onToggleCompare"

        />
      </div>

      <div class="text-center mt-12">
        <Button
          variant="outline"
          size="lg"
          class="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
        >
          {{ t('featured.viewAll') }}
        </Button>
      </div>
    </div>
  </section>
</template>
