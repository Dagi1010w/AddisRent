<script setup>
// ... your entire <script setup> block remains unchanged ...
// No logic changes are needed for this fix.
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue';
import { useLanguage } from '../../Components/assets/useLanguage';
import { Button } from '../../Components/ui/button';
import { Input } from '../../Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Components/ui/select';
import { Switch } from '../../Components/ui/switch';
import { Label } from '../../Components/ui/label';
import { Card, CardContent } from '../../Components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../Components/ui/collapsible';
import { Search, MapPin, Building2, DollarSign, Bed, Bath, Maximize, X, Filter, ChevronDown } from 'lucide-vue-next';

const { t } = useLanguage();
const currentImageIndex = ref(0);
const showMoreFilters = ref(false);

const form = reactive({ searchQuery: "", selectedStatus: "rent", selectedRegion: "", selectedSubcity: "", selectedArea: "", selectedPropertyType: "", minPrice: "", maxPrice: "", minArea: "", maxArea: "", bedrooms: "", bathrooms: "", isFurnished: false, });
const heroImages = [ { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop", alt: "Modern villa" }, { url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1920&h=1080&fit=crop", alt: "Luxury apartment" }, { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop", alt: "Beautiful villa" } ];
const regions = [ { value: "addis-ababa", label: "Addis Ababa" }, { value: "oromia", label: "Oromia" }, { value: "amhara", label: "Amhara" }, { value: "tigray", label: "Tigray" }, { value: "snnp", label: "SNNP" } ];
const subcities = { "addis-ababa": [ { value: "bole", label: "Bole" }, { value: "yeka", label: "Yeka" }, { value: "kirkos", label: "Kirkos" }, { value: "arada", label: "Arada" }, { value: "lideta", label: "Lideta" }, { value: "kolfe-keranio", label: "Kolfe Keranio" }, { value: "nifas-silk", label: "Nifas Silk" }, { value: "gulele", label: "Gulele" }, { value: "akaky-kaliti", label: "Akaky Kaliti" }, { value: "addis-ketema", label: "Addis Ketema" } ] };
const areas = { "bole": [ { value: "megenagna", label: "Megenagna" }, { value: "gerji", label: "Gerji" },{ value: "ayat", label: "Ayat" }, { value: "sarbet", label: "Sarbet" }, { value: "edna-mall", label: "Edna Mall Area" } ], "yeka": [ { value: "mebrat-hail", label: "Mebrat Hail" },{ value: "kality", label: "Kality" }, { value: "beza", label: "Beza" }, { value: "gerji-mebrat-hail", label: "Gerji Mebrat Hail" } ],"kirkos": [ { value: "kazanchis", label: "Kazanchis" }, { value: "arat-kilo", label: "Arat Kilo" }, { value: "sidist-kilo", label: "Sidist Kilo" } ] };
const propertyTypes = [ { value: "all", label: "All Properties" }, 
{ value: "apartment", label: "Apartment" }, { value: "villa", label: "Villa" }, { value: "house", label: "House" },{ value: "office", label: "Office" }, { value: "land", label: "Land" },{value: "Building", label: "Building"},{ value: "shop", label: "Shop" }, { value: "studio", label: "Studio" },{ value: "condominum", label: "Condo" }, { value: "warehouse", label: "Warehouse" },  ];
const priceRanges = { rent: { min: [ { value: "no-min", label: "No Min" }, { value: "10000", label: "ETB 10,000" }, { value: "20000", label: "ETB 20,000" }, { value: "30000", label: "ETB 30,000" }, { value: "40000", label: "ETB 40,000" }, { value: "50000", label: "ETB 50,000" }, { value: "60000", label: "ETB 60,000" }, { value: "70000", label: "ETB 70,000" }, { value: "80000", label: "ETB 80,000" }, { value: "90000", label: "ETB 90,000" } ], max: [ { value: "no-max", label: "No Max" }, { value: "10000", label: "ETB 10,000" }, { value: "20000", label: "ETB 20,000" }, { value: "25000", label: "ETB 25,000" }, { value: "30000", label: "ETB 30,000" }, { value: "35000", label: "ETB 35,000" }, { value: "40000", label: "ETB 40,000" }, { value: "45000", label: "ETB 45,000" }, { value: "50000", label: "ETB 50,000" }, { value: "60000", label: "ETB 60,000" }, { value: "70000", label: "ETB 70,000" }, { value: "80000", label: "ETB 80,000" }, { value: "90000", label: "ETB 90,000" }, { value: "100000", label: "ETB 100,000+" } ] }, buy: { min: [ { value: "no-min", label: "No Min" }, { value: "500000", label: "ETB 500k" }, { value: "1000000", label: "ETB 1M" }, { value: "2000000", label: "ETB 2M" }, { value: "3000000", label: "ETB 3M" }, { value: "4000000", label: "ETB 4M" }, { value: "5000000", label: "ETB 5M" }, { value: "6000000", label: "ETB 6M" }, { value: "7000000", label: "ETB 7M" }, { value: "8000000", label: "ETB 8M" }, { value: "9000000", label: "ETB 9M" }, { value: "10000000", label: "ETB 10M" } ], max: [ { value: "no-max", label: "No Max" }, { value: "2000000", label: "ETB 2M" }, { value: "3000000", label: "ETB 3M" }, { value: "5000000", label: "ETB 5M" }, { value: "10000000", label: "ETB 10M" }, { value: "15000000", label: "ETB 15M" }, { value: "20000000", label: "ETB 20M" }, { value: "25000000", label: "ETB 25M" }, { value: "30000000", label: "ETB 30M" }, { value: "35000000", label: "ETB 35M" }, { value: "40000000", label: "ETB 40M" }, { value: "45000000", label: "ETB 45M" }, { value: "50000000", label: "ETB 50M+" } ] } };
const bedroomOptions = [ { value: "any", label: "Any" }, { value: "1", label: "1 Bedroom" }, { value: "2", label: "2 Bedrooms" }, { value: "3", label: "3 Bedrooms" }, { value: "4", label: "4 Bedrooms" }, { value: "5", label: "5 Bedrooms" }, { value: "6+", label: "6+ Bedrooms" } ];
const bathroomOptions = [ { value: "any", label: "Any" }, { value: "1", label: "1 Bathroom" }, { value: "2", label: "2 Bathrooms" }, { value: "3", label: "3 Bathrooms" }, { value: "4", label: "4 Bathrooms" }, { value: "5+", label: "5+ Bathrooms" } ];
const availableSubcities = computed(() => subcities[form.selectedRegion] || []);
const availableAreas = computed(() => areas[form.selectedSubcity] || []);
watch(() => form.selectedRegion, () => { form.selectedSubcity = ""; form.selectedArea = ""; });
watch(() => form.selectedSubcity, () => { form.selectedArea = ""; });
watch(() => form.selectedStatus, () => { form.minPrice = ""; form.maxPrice = ""; });
onMounted(() => { const interval = setInterval(() => { currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length; }, 4000); onUnmounted(() => clearInterval(interval)); });
const handleSearch = () => { console.log("Searching with data:", { ...form }); };
const clearAllFilters = () => { const status = form.selectedStatus; Object.assign(form, { searchQuery: "", selectedRegion: "", selectedSubcity: "", selectedArea: "", selectedPropertyType: "", minPrice: "", maxPrice: "", minArea: "", maxArea: "", bedrooms: "", bathrooms: "", isFurnished: false, }); form.selectedStatus = status; };
const activeFiltersCount = computed(() => { const { searchQuery, selectedRegion, selectedSubcity, selectedArea, selectedPropertyType, minPrice, maxPrice, minArea, maxArea, bedrooms, bathrooms, isFurnished } = form; const filters = [ searchQuery, selectedRegion, selectedSubcity, selectedArea, selectedPropertyType && selectedPropertyType !== "all", minPrice && minPrice !== "no-min", maxPrice && maxPrice !== "no-max", minArea, maxArea, bedrooms && bedrooms !== "any", bathrooms && bathrooms !== "any", isFurnished, ]; return filters.filter(Boolean).length; });
</script>

<template>
  <section class="relative min-h-[600px] pt-20 overflow-hidden">
    <!-- Background Image & Overlay -->
    <div class="absolute inset-0">
      <TransitionGroup name="fade">
        <div v-for="(image, index) in heroImages" :key="image.url">
          <div v-if="index === currentImageIndex" class="absolute inset-0">
            <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover"/>
            <!-- This overlay darkens the image, which helps with text readability -->
            <div class="absolute inset-0 bg-black/50"></div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Text -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6" v-html="t('hero.title')"></h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8" v-html="t('hero.subtitle')"></p>
        </div>

        <!-- **THE FIX IS HERE**: Added dark mode classes to the Card and its children -->
        <Card class="shadow-2xl bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm dark:border dark:border-gray-700">
          <CardContent class="p-6">
            <form @submit.prevent="handleSearch" class="space-y-6">
              <!-- Rent/Buy Toggle -->
              <div class="flex justify-center">
                <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
                  <Button type="button" @click="form.selectedStatus = 'rent'" :variant="form.selectedStatus === 'rent' ? 'default' : 'ghost'" class="dark:text-white">{{ t('filter.forRent') }}</Button>
                  <Button type="button" @click="form.selectedStatus = 'buy'" :variant="form.selectedStatus === 'buy' ? 'default' : 'ghost'" class="dark:text-white">{{ t('filter.forSale') }}</Button>
                </div>
              </div>
              
              <!-- Search Input -->
              <div class="relative">
                <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <Input v-model="form.searchQuery" type="text" :placeholder="t('search.placeholder')" class="pl-12 h-14 text-lg"/>
              </div>

              <Collapsible v-model:open="showMoreFilters">
                <!-- Main Filters Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <!-- All Select items will inherit dark mode styling from shadcn-vue -->
                  <div class="space-y-2">
                    <Label class="dark:text-gray-300"><MapPin class="size-4 mr-1 inline"/>{{ t('filter.region') }}</Label>
                    <Select v-model="form.selectedRegion">
                      <SelectTrigger><SelectValue :placeholder="t('filter.region')" /></SelectTrigger>
                      <SelectContent><SelectItem v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div class="space-y-2">
                     <Label class="dark:text-gray-300">{{ t('filter.subcity') }}</Label>
                     <Select v-model="form.selectedSubcity" :disabled="!form.selectedRegion">
                       <SelectTrigger><SelectValue :placeholder="t('filter.subcity')" /></SelectTrigger>
                       <SelectContent class="max-h-60"><SelectItem v-for="s in availableSubcities" :key="s.value" :value="s.value">{{ s.label }}</SelectItem></SelectContent>
                     </Select>
                  </div>
                  <div class="space-y-2">
                    <Label class="dark:text-gray-300"><Building2 class="size-4 mr-1 inline"/>{{ t('filter.propertyType') }}</Label>
                    <Select v-model="form.selectedPropertyType">
                      <SelectTrigger><SelectValue :placeholder="t('filter.propertyType')" /></SelectTrigger>
                      <SelectContent class="max-h-60"><SelectItem v-for="pt in propertyTypes" :key="pt.value" :value="pt.value">{{ pt.label }}</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div class="space-y-2">
                    <Label class="dark:text-gray-300"><DollarSign class="size-4 mr-1 inline"/>{{ t('filter.minPrice') }}</Label>
                    <Select v-model="form.minPrice">
                      <SelectTrigger><SelectValue :placeholder="t('filter.minPrice')" /></SelectTrigger>
                      <SelectContent class="max-h-60"><SelectItem v-for="p in priceRanges[form.selectedStatus].min" :key="p.value" :value="p.value">{{ p.label }}</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div class="space-y-2">
                    <Label class="dark:text-gray-300"><DollarSign class="size-4 mr-1 inline"/>{{ t('filter.maxPrice') }}</Label>
                    <Select v-model="form.maxPrice">
                      <SelectTrigger><SelectValue :placeholder="t('filter.maxPrice')" /></SelectTrigger>
                      <SelectContent class="max-h-60"><SelectItem v-for="p in priceRanges[form.selectedStatus].max" :key="p.value" :value="p.value">{{ p.label }}</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>

                <!-- Collapsible Content -->
                <CollapsibleContent class="space-y-6 mt-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div class="space-y-2">
                       <Label class="dark:text-gray-300">{{ t('filter.area') }}</Label>
                       <Select v-model="form.selectedArea" :disabled="!form.selectedSubcity">
                         <SelectTrigger><SelectValue :placeholder="t('filter.area')" /></SelectTrigger>
                         <SelectContent class="max-h-60"><SelectItem v-for="a in availableAreas" :key="a.value" :value="a.value">{{ a.label }}</SelectItem></SelectContent>
                       </Select>
                    </div>
                    <div class="space-y-2">
                      <Label class="dark:text-gray-300"><Bed class="size-4 mr-1 inline"/>{{ t('filter.bedrooms') }}</Label>
                      <Select v-model="form.bedrooms"><SelectTrigger><SelectValue :placeholder="t('filter.bedrooms')" /></SelectTrigger><SelectContent><SelectItem v-for="b in bedroomOptions" :key="b.value" :value="b.value">{{ b.label }}</SelectItem></SelectContent></Select>
                    </div>
                     <div class="space-y-2">
                      <Label class="dark:text-gray-300"><Bath class="size-4 mr-1 inline"/>{{ t('filter.bathrooms') }}</Label>
                      <Select v-model="form.bathrooms"><SelectTrigger><SelectValue :placeholder="t('filter.bathrooms')" /></SelectTrigger><SelectContent><SelectItem v-for="b in bathroomOptions" :key="b.value" :value="b.value">{{ b.label }}</SelectItem></SelectContent></Select>
                    </div>
                    <div class="space-y-2">
                      <Label class="dark:text-gray-300"><Maximize class="size-4 mr-1 inline"/>{{ t('filter.minArea') }} (m²)</Label>
                      <Input v-model="form.minArea" type="number" :placeholder="t('filter.minArea')" />
                    </div>
                    <div class="space-y-2">
                      <Label class="dark:text-gray-300"><Maximize class="size-4 mr-1 inline"/>{{ t('filter.maxArea') }} (m²)</Label>
                      <Input v-model="form.maxArea" type="number" :placeholder="t('filter.maxArea')" />
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Label for="furnished-switch" class="dark:text-gray-300">Furnished</Label>
                    <Switch id="furnished-switch" v-model:checked="form.isFurnished" />
                  </div>
                </CollapsibleContent>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" size="lg" class="w-full h-14 flex-1"><Search class="size-5 mr-2" /> {{ t('search.properties') }}</Button>
                  <CollapsibleTrigger as-child><Button type="button" variant="outline" size="lg" class="h-14"><Filter class="size-5 mr-2" /><span>{{ showMoreFilters ? t('filter.less') : t('filter.more') }}</span><ChevronDown :class="['size-4 ml-2 transition-transform', showMoreFilters && 'rotate-180']" /></Button></CollapsibleTrigger>
                  <Button v-if="activeFiltersCount > 0" type="button" variant="ghost" size="lg" @click="clearAllFilters" class="h-14 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"><X class="size-5 mr-2" /> Clear ({{ activeFiltersCount }})</Button>
                </div>
              </Collapsible>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>