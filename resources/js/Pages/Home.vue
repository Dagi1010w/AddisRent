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

const properties = ref([
  { id: 1, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop', title: 'Modern Apartment in City Center', titleAm: 'ዘመናዊ አፓርታማ በከተማ መሃል', location: 'New York, USA', locationAm: 'ኒው ዮርክ፣ አሜሪካ', price: 3500, bedrooms: 2, bathrooms: 2, area: 120, type: 'Apartment', furnished: 'Fully Furnished', listedDate: '2025-08-01T12:00:00Z', rating: 4.8, reviews: 24 },
  { id: 2, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop', title: 'Spacious Family House', titleAm: 'ሰፊ የቤተሰብ ቤት', location: 'London, UK', locationAm: 'ለንደን፣ እንግሊዝ', price: 5500, bedrooms: 4, bathrooms: 3, area: 250, type: 'House', furnished: 'Semi-Furnished', listedDate: '2025-07-28T10:00:00Z', rating: 4.9, reviews: 45 },
  { id: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', title: 'Cozy Studio Loft', titleAm: 'ምቹ ስቱዲዮ ሎፍት', location: 'Paris, France', locationAm: 'ፓሪስ፣ ፈረንሳይ', price: 2800, bedrooms: 1, bathrooms: 1, area: 60, type: 'Studio', furnished: 'Not Furnished', listedDate: '2025-08-05T14:30:00Z', rating: 4.7, reviews: 18 },
  { id: 4, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', title: 'Luxury Penthouse', titleAm: 'ውብ ፔንትሀውስ', location: 'Tokyo, Japan', locationAm: 'ቶኪዮ፣ ጃፓን', price: 12000, bedrooms: 3, bathrooms: 3, area: 300, type: 'Penthouse', furnished: 'Fully Furnished', listedDate: '2025-08-06T18:00:00Z', rating: 5.0, reviews: 31 },
  { id: 5, image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2070&auto=format&fit=crop', title: 'Charming Suburban Home', titleAm: 'ማራኪ የከተማ ዳር ቤት', location: 'Sydney, Australia', locationAm: 'ሲድኒ፣ አውስትራሊያ', price: 4500, bedrooms: 3, bathrooms: 2, area: 180, type: 'House', furnished: 'Not Furnished', listedDate: '2025-07-20T09:00:00Z', rating: 4.8, reviews: 52 },
]);

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
