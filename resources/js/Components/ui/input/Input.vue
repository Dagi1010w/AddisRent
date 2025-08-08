<script setup>
import { defineProps } from 'vue';
import { cn } from '../utils';

// Define the props that the component will accept.
// 'type' is for the input type (e.g., 'text', 'email'), and 'class' is for custom styles.
const props = defineProps({
  type: String,
  class: String,
});
</script>

<template>
  <!-- 
    We bind the 'type' prop directly to the native <input> element's type attribute.
    We use our 'cn' utility to merge the base input styles with any custom classes
    passed in from the parent component.
    Vue automatically handles passing down any other attributes like 'id', 'placeholder',
    'required', 'disabled', etc., as well as v-model bindings.
  -->
  <input
    :type="props.type"
    :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
  />
</template>