<!-- File: src/components/FeaturedListings.vue -->
<script setup>

import { useLanguage } from './assets/useLanguage';
import { Button } from './ui/button';
import PropertyCard from './PropertyCard.vue'; // Import our new reusable card

// Define props received from App.vue
const props = defineProps({
  favoriteProperties: Set,
  compareProperties: Set,
});

// Define events to be emitted up to App.vue
const emit = defineEmits(['toggleFavorite', 'toggleCompare']);

const { t } = useLanguage();

// Mock property data (can be moved or replaced with an API call later)
const featuredProperties = [
  { id: 3, title: "Luxury Penthouse", titleAm: "...", price: 75000, location: "Kazanchis", locationAm: "...", type: "Penthouse", bedrooms: 3, bathrooms: 2, area: 200, parking: 2, furnished: "Furnished", rating: 4.9, reviews: 35, listedDate: new Date(Date.now() - 360000), image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop" },
  { id: 6, title: "Modern Office Space", titleAm: "...", price: 55000, location: "Mexico", locationAm: "...", type: "Office", bedrooms: 0, bathrooms: 2, area: 180, parking: 3, furnished: "not Furnished", rating: 4.7, reviews: 15, listedDate: new Date(Date.now() - 432000000), image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop" },
  { id: 1, title: "Modern Villa in Bole", titleAm: "...", price: 45000, location: "Bole", locationAm: "...", type: "Villa", bedrooms: 4, bathrooms: 3, area: 350, parking: 2, furnished: "Furnished", rating: 4.8, reviews: 24, listedDate: new Date(Date.now() - 17280000), image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop" },
  // ... more properties
];

// Event handlers that just pass the event up to the parent (App.vue)
const onToggleFavorite = (propertyId) => {
  emit('toggleFavorite', propertyId);
};

const onToggleCompare = (propertyId) => {
  emit('toggleCompare', propertyId);
};

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
          v-for="property in featuredProperties"
          :key="property.id"
          :property="property"
          :is-favorite="favoriteProperties.has(property.id)"
          :is-in-compare="compareProperties.has(property.id)"
          @toggle-favorite="onToggleFavorite"
          @toggle-compare="onToggleCompare"
        />
      </div>

      <div class="text-center mt-12">
        <Button variant="outline" size="lg" class="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white">
          {{ t('featured.viewAll') }}
        </Button>
      </div>
    </div>
  </section>
</template>