<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useLanguage } from '../../Components/assets/useLanguage';
import { Button } from '../../Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../../Components/ui/dropdown-menu';
import { cn } from '../../Components/ui/utils';
import { Link } from '@inertiajs/vue3';
import {
  DialogRoot as Sheet,
  DialogTrigger as SheetTrigger,
  DialogPortal as SheetPortal,
  DialogOverlay as SheetOverlay,
  DialogContent as SheetContentRadix,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
  DialogClose as SheetClose,
} from 'radix-vue';
import { Menu, Home, Building2, ChevronDown, Factory, Wheat, Pickaxe, Truck, Hotel, Building, MapIcon, BookOpen, Phone, Info, Briefcase, Castle, Warehouse, ShoppingBag, TrendingUp, XIcon, LandPlot } from 'lucide-vue-next';

const emit = defineEmits(['authenticated']);
const isScrolled = ref(false);
const isLoggedIn = ref(false);
const { t } = useLanguage();

onMounted(() => {
  const handleScroll = () => { isScrolled.value = window.scrollY > 50; };
  window.addEventListener("scroll", handleScroll);
  onUnmounted(() => { window.removeEventListener("scroll", handleScroll); });
});

const handleUserAuthenticated = (userType) => {
  isLoggedIn.value = true;
  emit('authenticated', userType);
};

const handleLogout = () => { isLoggedIn.value = false; };

const rentOptions = computed(() => [
  { name: t('nav.rent.apartment'), icon: Building2, href: "/rent/apartment" },
  { name: t('nav.rent.villa'), icon: Castle, href: "/rent/villa" },
  { name: t('nav.rent.house'), icon: Home, href: "/rent/House" },
  { name: t('nav.rent.office'), icon: Briefcase, href: "/rent/office" },
  { name: t('nav.rent.land'), icon: LandPlot, href: "/rent/Land" },
  { name: t('nav.rent.building'), icon: Building, href: "/rent/Building" },
  { name: t('nav.rent.shop'), icon: ShoppingBag, href: "/rent/Shop" },
  { name: t('nav.rent.studio'), icon: Building, href: "/rent/Studio" },
  { name: t('nav.rent.guesthouse'), icon: Home, href: "/rent/guesthouse" },
  { name: t('nav.rent.warehouse'), icon: Warehouse, href: "/rent/warehouse" },
  { name: t('nav.rent.others'),  href: "/rent/Others" },
]);

const buyOptions = computed(() => [
  { name: t('nav.rent.apartment'), icon: Building2, href: "/rent/apartment" },
  { name: t('nav.rent.villa'), icon: Castle, href: "/rent/villa" },
  { name: t('nav.rent.house'), icon: Home, href: "/rent/House" },
  { name: t('nav.rent.office'), icon: Briefcase, href: "/rent/office" },
  { name: t('nav.rent.land'), icon: LandPlot, href: "/rent/Land" },
  { name: t('nav.rent.building'), icon: Building, href: "/rent/Building" },
  { name: t('nav.rent.shop'), icon: ShoppingBag, href: "/rent/Shop" },
  { name: t('nav.rent.studio'), icon: Building, href: "/rent/Studio" },
  { name: t('nav.rent.guesthouse'), icon: Home, href: "/rent/guesthouse" },
  { name: t('nav.rent.warehouse'), icon: Warehouse, href: "/rent/warehouse" },
  ]);

const investmentOptions = computed(() => [
    { name: t('nav.investment.manufacturing'), icon: Factory, href: "/investment/manufacturing", description: t('nav.investment.manufacturing.desc') },
    { name: t('nav.investment.agriculture'), icon: Wheat, href: "/investment/agriculture", description: t('nav.investment.agriculture.desc') },
    { name: t('nav.investment.mining'), icon: Pickaxe, href: "/investment/mining", description: t('nav.investment.mining.desc') },
    { name: t('nav.investment.transport'), icon: Truck, href: "/investment/transport", description: t('nav.investment.transport.desc') },
    { name: t('nav.investment.hotel'), icon: Hotel, href: "/investment/hotel", description: t('nav.investment.hotel.desc') },
    { name: t('nav.investment.buildings'), icon: Building, href: "/investment/buildings", description: t('nav.investment.buildings.desc') },
]);

const othersOptions = computed(() => [
  { name: t('nav.others.about'), icon: Info, href: "/about" },
  { name: t('nav.others.blog'), icon: BookOpen, href: "/blog" },
  { name: t('nav.others.contact'), icon: Phone, href: "/contact" },
]);
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="flex items-center space-x-2 cursor-pointer">
          <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
            <Home :size="20" class="text-white" />
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">AddisRent</span>
        </a>

        <div class="hidden lg:flex items-center space-x-8">
          <!-- Rent Dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                {{ t('nav.rent') }} <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-56">
              <dropdown-menu-item v-for="option in rentOptions" :key="option.name" as-child>
                <a :href="option.href" class="flex items-center space-x-3 cursor-pointer">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <!-- **FIX**: Smaller text -->
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu>

          <!-- Buy Dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                {{ t('nav.buy') }} <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-56">
              <dropdown-menu-item v-for="option in buyOptions" :key="option.name" as-child>
                <a :href="option.href" class="flex items-center space-x-3 cursor-pointer">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <!-- **FIX**: Smaller text -->
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu>

          <!-- Sell Link -->
          <a href="/sell" class="text-gray-700 dark:text-gray-300 hover:text-orange-500 relative group font-medium">
            {{ t('nav.sell') }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
          </a>

          <!-- **FIX**: Investment Menu is now a clickable dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                {{ t('nav.investment') }} <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <!-- Increased width to accommodate two columns -->
            <dropdown-menu-content align="start" class="w-[32rem] p-4">
              <div class="grid grid-cols-2 gap-4">
                <dropdown-menu-item v-for="option in investmentOptions" :key="option.name" as-child>
                  <a :href="option.href" class="flex flex-col space-y-1 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 group cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <component :is="option.icon" :size="20" class="text-orange-500" />
                      <!-- **FIX**: Smaller text -->
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ option.name }}</span>
                    </div>
                    <span class="text-xs text-gray-600 dark:text-gray-400 pl-7">{{ option.description }}</span>
                  </a>
                </dropdown-menu-item>
              </div>
            </dropdown-menu-content>
          </dropdown-menu>

          <!-- Others Dropdown -->
          <dropdown-menu>
            <dropdown-menu-trigger as-child>
              <Button variant="ghost" class="font-medium p-0 h-auto relative group hover:bg-transparent focus-visible:bg-transparent dark:hover:text-orange-400 hover:text-orange-500">
                {{ t('nav.others') }} <ChevronDown :size="16" class="ml-1" />
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all"></span>
              </Button>
            </dropdown-menu-trigger>
            <dropdown-menu-content align="start" class="w-48">
              <dropdown-menu-item v-for="option in othersOptions" :key="option.name" as-child>
                <a :href="option.href" class="flex items-center space-x-3 cursor-pointer">
                  <component :is="option.icon" :size="16" class="text-gray-500" />
                  <!-- **FIX**: Smaller text -->
                  <span class="text-sm">{{ option.name }}</span>
                </a>
              </dropdown-menu-item>
            </dropdown-menu-content>
          </dropdown-menu>
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="!isLoggedIn" class="p-6 border-t">
                    <Link
                                :href="route('login')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Login
                            </Link>

                            <Link
                                :href="route('register')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                  </div>
          <div v-else>
            <!-- User profile dropdown will go here -->
          </div>

          <!-- Mobile Menu -->
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon" class="lg:hidden"><Menu :size="20" /></Button>
            </SheetTrigger>
            <SheetPortal>
              <SheetOverlay class="fixed inset-0 z-50 bg-black/50" />
              <SheetContentRadix
                :class="cn(
                  'fixed z-50 gap-4 bg-background p-0 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
                  'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm'
                )"
              >
                <SheetTitle class="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription class="sr-only">A list of navigation links for the AddisRent website.</SheetDescription>

                <div class="flex flex-col h-full">
                  <div class="p-6 border-b flex justify-between items-center">
                     <span class="text-lg font-bold">AddisRent</span>
                     <SheetClose class="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
                       <XIcon class="h-4 w-4" />
                       <span class="sr-only">Close</span>
                     </SheetClose>
                  </div>
                  <div class="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div class="space-y-2">
                      <div class="font-medium px-3">{{ t('nav.rent') }}</div>
                      <a v-for="option in rentOptions" :key="option.name" :href="option.href" class="flex items-center space-x-3 p-3 pl-6 rounded-lg hover:bg-gray-100">
                        <component :is="option.icon" :size="16" class="text-gray-500" />
                        <span class="text-sm">{{ option.name }}</span>
                      </a>
                    </div>
                    <div class="space-y-2">
                      <div class="font-medium px-3">{{ t('nav.buy') }}</div>
                      <a v-for="option in buyOptions" :key="option.name" :href="option.href" class="flex items-center space-x-3 p-3 pl-6 rounded-lg hover:bg-gray-100">
                        <component :is="option.icon" :size="16" class="text-gray-500" />
                        <span class="text-sm">{{ option.name }}</span>
                      </a>
                    </div>
                    <a href="/sell" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                      <Building2 :size="20" />
                      <span class="font-medium">{{ t('nav.sell') }}</span>
                    </a>
                  </div>
                  <div v-if="!isLoggedIn" class="p-6 border-t">
                    <Link
                                :href="route('login')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Login
                            </Link>

                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                  </div>
                </div>
              </SheetContentRadix>
            </SheetPortal>
          </Sheet>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* These styles are no longer needed for the hover menu, but can be kept for other transitions */
.fade-down-enter-active,
.fade-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>