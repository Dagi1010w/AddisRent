<!-- File: src/component/ui/Primitive.vue -->
<script setup>


const props = defineProps({
  asChild: {
    type: Boolean,
    default: false, // Default value is defined here
  },

  as: {
    type: String,
    default: 'div', // Default value is defined here
  },
});
</script>

<template>
  <slot v-if="props.asChild" />
  
  <component :is="props.as" v-else>
    <slot />
  </component>
</template>