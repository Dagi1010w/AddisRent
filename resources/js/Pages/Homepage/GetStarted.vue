<!-- File: GetStarted.vue -->
<script setup>
import { ref, reactive, computed } from 'vue';
import { useLanguage } from '../../Components/assets/useLanguage';

// --- Direct Radix Imports ---
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'radix-vue';

// Your other UI components are fine to use
import { Button } from '../../Components/ui/button';
import { Input } from '../../Components/ui/input';
import { Label } from '../../Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../Components/ui/tabs';
import { cn } from '../../Components/ui/utils';

// Import lucide-vue-next icons
import { UserPlus, LogIn, Mail, Lock, User, Phone, Users, TrendingUp, XIcon } from 'lucide-vue-next';

const emit = defineEmits(['authenticated']);
const isOpen = ref(false);
const activeTab = ref("login");
const isLoading = ref(false);
const loginForm = reactive({ email: "", password: "" });
const signupForm = reactive({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", userType: "" });
const { t } = useLanguage();

const handleLogin = async () => { /* ... unchanged ... */ };
const handleSignup = async () => { /* ... unchanged ... */ };

const userTypes = computed(() => [
  { value: "tenant", label: t('auth.tenant'), icon: User },
  { value: "landlord", label: t('auth.landlord'), icon: Users },
  
]);

const dialogDescription = computed(() => {
  return activeTab.value === "login"
    ? "Sign in to your account to access your personalized dashboard and saved properties."
    : "Create a new account to start your property journey with personalized recommendations.";
});
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    
    <DialogPortal>
      <!-- Dark Theme Edit: Added dark:bg-black/80 for a slightly stronger overlay in dark mode -->
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out dark:bg-black/80"
      />
      <DialogContent
        :class="cn(
          'fixed top-[50%] left-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-0 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out overflow-hidden flex flex-col max-h-[90vh]',
          // Dark Theme Edit: Added dark mode border and background colors for the dialog
          'dark:border-slate-800 dark:bg-slate-950'
        )"
      >
        <DialogTitle class="sr-only">{{ t('nav.getStarted') }}</DialogTitle>
        <DialogDescription class="sr-only">{{ dialogDescription }}</DialogDescription>

        <!-- 
          Visual Header 
          Dark Theme Edit: Changed gradient and text colors for dark mode.
        -->
        <div class="p-6 text-center border-b bg-gradient-to-br from-orange-50 to-green-50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-800">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus :size="32" class="text-white" />
          </div>
          <!-- Dark Theme Edit: Inverted text colors for better contrast -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-50">{{ t('nav.getStarted') }}</h2>
          <p class="text-gray-600 mt-2 dark:text-gray-400">{{ dialogDescription }}</p>
        </div>

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
          <Tabs v-model="activeTab" class="w-full">
            <TabsList class="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" class="flex items-center space-x-2"><LogIn :size="16" /><span>{{ t('auth.signIn') }}</span></TabsTrigger>
              <TabsTrigger value="signup" class="flex items-center space-x-2"><UserPlus :size="16" /><span>{{ t('auth.signUp') }}</span></TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form @submit.prevent="handleLogin" class="space-y-4">
                <div class="space-y-2">
                  <!-- Dark Theme Edit: Adjusted label text color -->
                  <Label for="login-email" class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"><Mail :size="16" /><span>{{ t('auth.email') }}</span></Label>
                  <Input id="login-email" type="email" :placeholder="t('auth.email')" v-model="loginForm.email" required class="h-11" />
                </div>
                <div class="space-y-2">
                  <!-- Dark Theme Edit: Adjusted label text color -->
                  <Label for="login-password" class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"><Lock :size="16" /><span>{{ t('auth.password') }}</span></Label>
                  <Input id="login-password" type="password" :placeholder="t('auth.password')" v-model="loginForm.password" required class="h-11" />
                </div>
                <Button type="submit" class="w-full h-11" :disabled="isLoading">
                  <span v-if="!isLoading">{{ t('auth.signIn') }}</span>
                  <span v-else>Signing in...</span>
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form @submit.prevent="handleSignup" class="space-y-4">
                <div class="space-y-2">
                   <!-- Dark Theme Edit: Adjusted label text color -->
                  <Label for="signup-name" class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"><User :size="16" /><span>{{ t('auth.fullName') }}</span></Label>
                  <Input id="signup-name" type="text" :placeholder="t('auth.fullName')" v-model="signupForm.fullName" required class="h-11" />
                </div>
                <div class="space-y-2">
                   <!-- Dark Theme Edit: Adjusted label text color -->
                  <Label for="signup-email" class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"><Mail :size="16" /><span>{{ t('auth.email') }}</span></Label>
                  <Input id="signup-email" type="email" :placeholder="t('auth.email')" v-model="signupForm.email" required class="h-11" />
                </div>
                <div class="space-y-2">
                  <!-- Dark Theme Edit: Adjusted label text color -->
                  <Label for="signup-usertype" class="flex items-center space-x-2 text-slate-700 dark:text-slate-400"><Users :size="16" /><span>User Type</span></Label>
                  <Select v-model="signupForm.userType" required>
                    <SelectTrigger class="h-11">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="type in userTypes" :key="type.value" :value="type.value">
                        <div class="flex items-center space-x-2">
                          <component :is="type.icon" :size="16" />
                          <span>{{ type.label }}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" class="w-full h-11" :disabled="isLoading">
                  <span v-if="!isLoading">{{ t('auth.signUp') }}</span>
                  <span v-else>Creating Account...</span>
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogClose class="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>