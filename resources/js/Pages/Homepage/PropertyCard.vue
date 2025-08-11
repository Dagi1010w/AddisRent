<script setup>
import { computed } from 'vue';
import { useLanguage } from '@/Components/assets/useLanguage';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Scale, MapPin, Bed, Bath, Car, Maximize, Star, Clock } from 'lucide-vue-next';

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isInCompare: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggleFavorite', 'toggleCompare']);
const { t, formatPrice, formatRelativeTime, language } = useLanguage();

// --- Computed Properties for Display ---

const title = computed(() => {
  return language.value === 'am' && props.property.titleAm
    ? props.property.titleAm
    : props.property.title;
});

const location = computed(() => {
  return language.value === 'am' && props.property.locationAm
    ? props.property.locationAm
    : props.property.location;
});

const propertyTypeText = computed(() => {
  if (!props.property?.type) return '';
  const key = props.property.type.toLowerCase().trim();
  return t(`propertyType.${key}`, props.property.type);
});

const furnishedText = computed(() => {
  if (!props.property?.furnished) return '';
  const key = `property.${props.property.furnished.toLowerCase().trim().replace(/\s+/g, '-')}`;
  return t(key, props.property.furnished);
});
</script>

<template>
  <Card class="overflow-hidden hover:shadow-xl transition-all duration-300 group">
    <div class="relative">
      <img :src="property.image" :alt="title" class="w-full h-48 object-cover transition-transform group-hover:scale-105"/>

      <div class="absolute top-3 left-3">
        <Badge variant="secondary" class="bg-black/70 text-white">{{ propertyTypeText }}</Badge>
      </div>

      <div class="absolute top-3 right-3 flex flex-col gap-2">
        <!-- Favorite button removed -->

        <Button
          variant="ghost" size="icon"
          :class="['h-10 w-10 rounded-full bg-white/90 shadow-lg', isInCompare ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500']"
          @click="emit('toggleCompare', property.id)"
          aria-label="Toggle Compare"
        >
          <Scale :class="['h-5 w-5', isInCompare && 'fill-current']" />
        </Button>
      </div>

      <div class="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
        <Clock class="w-4 h-4" />
        <span class="text-sm font-medium">{{ formatRelativeTime(property.listedDate) }}</span>
      </div>
    </div>

    <CardContent class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <div class="flex items-center text-gray-600 mb-2">
        <MapPin class="w-4 h-4 mr-1" />
        <span class="text-sm">{{ location }}</span>
      </div>

      <div class="text-2xl font-bold text-orange-600 mb-4">
        {{ formatPrice(property.price) }}
        <span class="text-sm font-normal text-gray-500 ml-1">/{{ t('property.perMonth') }}</span>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div v-if="property.bedrooms > 0" class="flex items-center"><Bed class="w-4 h-4 mr-2" /><span>{{ property.bedrooms }} {{ t('property.bedrooms') }}</span></div>
        <div class="flex items-center"><Bath class="w-4 h-4 mr-2" /><span>{{ property.bathrooms }} {{ t('property.bathrooms') }}</span></div>
        <div class="flex items-center"><Maximize class="w-4 h-4 mr-2" /><span>{{ property.area }}m²</span></div>
        <div v-if="property.parking > 0" class="flex items-center"><Car class="w-4 h-4 mr-2" /><span>{{ property.parking }} {{ t('property.parking') }}</span></div>
      </div>

      <div class="flex items-center justify-between">
        <Badge variant="outline" class="text-xs">{{ furnishedText }}</Badge>
        <div class="flex items-center">
          <Star class="w-4 h-4 text-yellow-500 mr-1" />
          <span class="text-sm text-gray-600">{{ property.rating }} ({{ property.reviews }} {{ t('property.reviews') }})</span>
        </div>
      </div>
      <div v-if="isInCompare" class="mt-3 text-xs text-blue-600 font-medium">{{ t('compare.isAdded', 'Added to compare') }}</div>
    </CardContent>

    <CardFooter class="p-6 pt-0 flex gap-3">
      <Button variant="outline" class="flex-1">{{ t('common.view') }}</Button>
      <Button class="flex-1">{{ t('property.contact') }}</Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
.fill-current {
  fill: currentColor;
}
</style>
