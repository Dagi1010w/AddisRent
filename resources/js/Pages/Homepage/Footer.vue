<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '@/Components/assets/useLanguage';
import { useTheme } from '@/Components/assets/useTheme';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
// Import all necessary icons from lucide-vue-next
import {
  Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin,
  Youtube, Send, Heart, Star, Shield, Award, Users, TrendingUp,
  Sun, Moon
} from 'lucide-vue-next';

// Activate composables
const { t } = useLanguage();
const { isLight, toggleTheme } = useTheme();

// Local state for the newsletter form
const email = ref("");

const handleNewsletterSubmit = () => {
  console.log("Newsletter signup:", email.value);
  email.value = ""; // Clear the input after submission
};

// Data arrays using translation keys
const quickLinks = computed(() => [
  { name: t('footer.aboutUs'), href: "/about" },
  { name: t('footer.blog'), href: "/blog" },
  { name: t('nav.contact'), href: "/contact" },
]);

const propertyLinks = computed(() => [
  { name: t('nav.rent.apartment'), href: "/rent/apartment" },
  { name: t('nav.rent.office'), href: "/rent/office" },
  { name: t('nav.buy.house'), href: "/buy/house" },
  { name: t('nav.buy.commercial'), href: "/commercial" },
  { name: t('nav.buy.land'), href: "/buy/land" },
]);

const legalLinks = computed(() => [
  { name: t('footer.privacy'), href: "/privacy" },
  { name: t('footer.terms'), href: "/terms" },
  { name: t('footer.sitemap'), href: "/sitemap" },
]);

const socialLinks = ref([
  { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-blue-400" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-600" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-700" },
]);

const stats = ref([
  { icon: Users, value: "50,000+", labelKey: "hero.stats.customers" },
  { icon: Home, value: "10,000+", labelKey: "hero.stats.properties" },
  { icon: Star, value: "4.9/5", labelKey: "hero.stats.rating" },
  { icon: Award, value: "5+", labelKey: "Years Experience" }, // Add translation key if needed
]);
</script>

<template>
  <footer class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div
            v-motion
            :hovered="{ scale: 1.05 }"
            class="flex items-center space-x-3 mb-6 w-fit"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <Home class="w-6 h-6 text-white" />
            </div>
            <span class="text-2xl font-bold text-gray-900 dark:text-white">AddisRent</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Ethiopia's leading property rental platform connecting landlords and tenants across major cities.
          </p>
          <div class="space-y-3">
            <div class="flex items-center space-x-3"><Mail class="w-5 h-5 text-orange-500" /><span class="text-gray-600 dark:text-gray-400">hello@addisrent.com</span></div>
            <div class="flex items-center space-x-3"><Phone class="w-5 h-5 text-green-600" /><span class="text-gray-600 dark:text-gray-400">+251 911 123 456</span></div>
            <div class="flex items-center space-x-3"><MapPin class="w-5 h-5 text-orange-500" /><span class="text-gray-600 dark:text-gray-400">Addis Ababa, Ethiopia</span></div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-6">{{ t('footer.quickLinks') }}</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.href" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">{{ link.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Properties -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-6">{{ t('footer.properties') }}</h3>
          <ul class="space-y-3">
            <li v-for="link in propertyLinks" :key="link.name">
              <a :href="link.href" class="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">{{ link.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Newsletter & Theme -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-6">{{ t('footer.stayUpdated') }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ t('footer.newsletter.desc') }}</p>
          <form @submit.prevent="handleNewsletterSubmit" class="space-y-3 mb-6">
            <div class="flex">
              <Input v-model="email" type="email" placeholder="Enter your email" required class="rounded-r-none border-r-0 focus:ring-orange-500 focus:border-orange-500" />
              <Button type="submit" class="rounded-l-none bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white"><Send class="w-4 h-4" /></Button>
            </div>
          </form>

          <div class="mb-6">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">{{ t('footer.toggleTheme') }}</h4>
            <Button @click="toggleTheme()" variant="outline" size="sm" class="flex items-center space-x-2 hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-orange-900/20">
              <div v-motion :initial="false" :animate="{ rotate: isDark ? 180 : 0 }" :transition="{ duration: 0.3 }">
                <Sun v-if="isDark" class="w-4 h-4 text-yellow-500" />
                <Moon v-else class="w-4 h-4 text-blue-600" />
              </div>
              <span class="text-sm">{{ isDark ? t('footer.lightMode') : t('footer.darkMode') }}</span>
            </Button>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">{{ t('footer.followUs') }}</h4>
            <div class="flex space-x-3">
              <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank" rel="noopener noreferrer"
                v-motion :hovered="{ scale: 1.1, y: -2 }" :tapped="{ scale: 0.95 }"
                :class="['p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200 shadow-sm hover:shadow-md', social.color]"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <Separator class="my-12" />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(stat, index) in stats" :key="stat.labelKey" v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0 }" :transition="{ duration: 500, delay: index * 100 }"
          class="text-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg mb-3"><component :is="stat.icon" class="w-6 h-6 text-white" /></div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ stat.value }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t(stat.labelKey, stat.labelKey) }}</div>
        </div>
      </div>

      <!-- Trust Indicators -->
      <Separator class="my-12" />
      <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
        <div class="flex items-center space-x-2"><Shield class="w-5 h-5 text-green-600" /><span class="text-sm text-gray-600 dark:text-gray-400">Verified Properties</span></div>
        <div class="flex items-center space-x-2"><Award class="w-5 h-5 text-orange-600" /><span class="text-sm text-gray-600 dark:text-gray-400">Trusted Platform</span></div>
        <div class="flex items-center space-x-2"><Star class="w-5 h-5 text-yellow-500" /><span class="text-sm text-gray-600 dark:text-gray-400">4.9/5 Rating</span></div>
        <div class="flex items-center space-x-2"><TrendingUp class="w-5 h-5 text-blue-600" /><span class="text-sm text-gray-600 dark:text-gray-400">Growing Community</span></div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ t('footer.copyright') }}
          </div>
          <div class="flex flex-wrap justify-center md:justify-end gap-4">
            <a v-for="link in legalLinks" :key="link.name" :href="link.href" class="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
