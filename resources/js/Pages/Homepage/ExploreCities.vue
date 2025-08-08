<script setup>
import { ref } from 'vue';
// Import the motion directive from the newly installed package

// Import icons from the lucide-vue-next library
import { MapPin, ArrowRight } from 'lucide-vue-next';

// Data for the cities, stored in a ref
const cities = ref([
  { name: "Addis Ababa", region: "Capital City", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", propertyCount: 1250 },
  { name: "Bahir Dar", region: "Amhara Region", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", propertyCount: 340 },
  { name: "Hawassa", region: "SNNP Region", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", propertyCount: 280 },
  { name: "Dire Dawa", region: "Eastern Ethiopia", image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=400&h=300&fit=crop", propertyCount: 195 },
  { name: "Mekelle", region: "Tigray Region", image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=400&h=300&fit=crop", propertyCount: 220 },
  { name: "Jimma", region: "Oromia Region", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", propertyCount: 165 },
]);
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
    <div class="container mx-auto px-4">
      <!-- Section Header with animation -->
      <div
        v-motion
        :initial="{ y: 50, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 800 }"
        class="text-center mb-16"
      >
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore by City
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find the perfect location across Ethiopia's major cities and regions
        </p>
      </div>

      <!-- Grid of city cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Loop through cities with v-for, getting index for animation delay -->
        <div
          v-for="(city, index) in cities"
          :key="city.name"
          v-motion
          :initial="{ y: 50, opacity: 0 }"
          :visible-once="{ y: 0, opacity: 1 }"
          :hovered="{ y: -10 }"
          :transition="{ duration: 600, delay: index * 100 }"
          class="group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <div class="relative h-64 overflow-hidden">
              <img
                :src="city.image"
                :alt="city.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

              <!-- City info overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                  <h3 class="text-2xl font-bold mb-1">{{ city.name }}</h3>
                  <div class="flex items-center text-sm text-gray-200 mb-2">
                    <MapPin class="w-4 h-4 mr-1" />
                    <span>{{ city.region }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">
                      {{ city.propertyCount }} Properties
                    </span>
                    <div class="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowRight class="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Floating property count badge with its own animation -->
              <div
                v-motion
                :initial="{ scale: 0 }"
                :visible-once="{ scale: 1 }"
                :transition="{ delay: index * 100 + 300, type: 'spring', stiffness: 500 }"
                class="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-white"
              >
                {{ city.propertyCount }}+
              </div>
            </div>

            <!-- Hover glow effect -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>

      <!-- "View all cities" button with animation -->
      <div
        v-motion
        :initial="{ y: 30, opacity: 0 }"
        :visible-once="{ y: 0, opacity: 1 }"
        :transition="{ duration: 600, delay: 800 }"
        class="text-center mt-12"
      >
        <button class="group bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300">
          <span>View All Cities</span>
          <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
</style>