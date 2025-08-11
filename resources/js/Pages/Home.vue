<script setup>
// 1. Import Vue functions and all necessary components
import { ref, computed } from 'vue';
import LanguageProvider from '@/Pages/Homepage/LanguageProvider.vue';
import NavgBar from '@/Pages/Homepage/NavgBar.vue';
import FloatingSidebar from '@/Pages/Homepage/FloatingSidebar.vue';
import SearchSection from '@/Pages/Homepage/SearchSection.vue';
import FeaturedListings from '@/Pages/Homepage/FeaturedListings.vue';
import ComparsionModal from '@/Pages/Homepage/ComparsionModal.vue';

// These components can be uncommented as you create them
 import ExploreCities from '@/Pages/Homepage/ExploreCities.vue';
import WhyChooseUs from '@/Pages/Homepage/WhyChooseUs.vue';
import CallToAction from '@/Pages/Homepage/CallToAction.vue';
import Footer from '@/Pages/Homepage/Footer.vue';

const props = defineProps({
  properties: { type: Array, required: true },
});

const favoriteProperties = ref(new Set([1, 3, 5]));
const compareProperties = ref(new Set());

const userType = ref(null);

const propertiesToCompare = computed(() =>
  Array.from(compareProperties.value)
    .map(id => properties.value.find(p => p.id === id))
    .filter(Boolean)
);

const isCompareModalOpen = ref(false);

const handleToggleFavorite = (propertyId) => {
  const newFavorites = new Set(favoriteProperties.value);
  if (newFavorites.has(propertyId)) newFavorites.delete(propertyId);
  else newFavorites.add(propertyId);
  favoriteProperties.value = newFavorites;
};

const handleToggleCompare = (propertyId) => {
  const newCompare = new Set(compareProperties.value);
  if (newCompare.has(propertyId)) {
    newCompare.delete(propertyId);
  } else if (newCompare.size < 4) {
    newCompare.add(propertyId);
  } else {
    const firstProperty = Array.from(newCompare)[0];
    newCompare.delete(firstProperty);
    newCompare.add(propertyId);
  }
  compareProperties.value = newCompare;
};

const handleRemoveFromCompare = (propertyId) => {
  const newCompare = new Set(compareProperties.value);
  newCompare.delete(propertyId);
  compareProperties.value = newCompare;
};

const handleClearCompare = () => {
  compareProperties.value = new Set();
};

const handleOpenCompare = () => {
  if (compareProperties.value.size > 0) {
    isCompareModalOpen.value = true;
  } else {
    alert('Add properties to compare first!');
  }
};

const handleUserAuthenticated = (type) => {
  userType.value = type;
  console.log("User authenticated as:", type);
};
</script>

<template>
  <language-provider>
    <div class="min-h-screen bg-background">
      <navg-bar @authenticated="handleUserAuthenticated" />

      <floating-sidebar
        :compare-properties="compareProperties"
        :all-properties="properties"
        @removeFromCompare="handleRemoveFromCompare"
        @clearCompare="handleClearCompare"
        @openCompare="handleOpenCompare"
      />

      <search-section />

      <main>
        <featured-listings
          :properties="properties"
          :favorite-properties="favoriteProperties"
          :compare-properties="compareProperties"
          @toggle-favorite="handleToggleFavorite"
          @toggle-compare="handleToggleCompare"
        />

        <explore-cities />
        <why-choose-us />
        <call-to-action />
      </main>

      <Footer />

      <ComparsionModal
        v-model:open="isCompareModalOpen"
        :properties-to-compare="propertiesToCompare"
        @remove-from-compare="handleRemoveFromCompare"
        @clear-compare="handleClearCompare"
      />
    </div>
  </language-provider>
</template>

<style>
.bg-background {
  background-color: #f8fafc;
}
body {
  font-family: 'Inter', sans-serif;
}
</style>
