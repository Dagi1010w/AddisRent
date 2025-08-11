<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';

const props = defineProps({
  open: Boolean,
  propertiesToCompare: Array,
});

const emit = defineEmits(['update:open', 'removeFromCompare', 'clearCompare']);

const internalOpen = ref(props.open);

watch(() => props.open, (newVal) => {
  internalOpen.value = newVal;
});

const closeModal = () => {
  internalOpen.value = false;
  emit('update:open', false);
};

const removeProperty = (id) => {
  emit('removeFromCompare', id);
};
</script>

<template>
  <transition
    name="modal-fade"
    appear
    @after-leave="$emit('update:open', false)"
  >
    <div
      v-if="internalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeModal"
      aria-modal="true"
      role="dialog"
      aria-labelledby="compare-modal-title"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-[95vw] max-h-[85vh] w-full overflow-auto relative p-6"
        @click.stop
      >
        <!-- Close Button -->
        <button
          @click="closeModal"
          aria-label="Close comparison modal"
          class="absolute top-4 right-4 z-50 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 text-3xl font-bold transition-colors duration-200"
        >
          &times;
        </button>

        <h2
          id="compare-modal-title"
          class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 text-center"
        >
          Compare Properties
        </h2>

        <div class="overflow-auto">
          <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
            <thead class="bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
              <tr>
                <th class="border border-gray-300 dark:border-gray-700 p-2 w-32"></th>
                <th
                  v-for="property in propertiesToCompare"
                  :key="property.id"
                  class="border border-gray-300 dark:border-gray-700 p-2 text-center min-w-[160px] relative"
                >
                  <img
                    :src="property.image"
                    :alt="property.title"
                    class="w-32 h-20 object-cover rounded-md mx-auto shadow-md"
                    loading="lazy"
                  />
                  <div class="text-center mt-3">
  <button
    @click="removeProperty(property.id)"
    class="inline-flex items-center px-3 py-1 text-xs font-medium text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 focus:outline-none"
    type="button"
  >
    <Trash2 class="h-4 w-4 mr-1.5" />
    Remove
  </button>
</div>
                  <div
                    class="mt-2 font-semibold text-gray-900 dark:text-gray-100 truncate"
                    :title="property.title"
                  >
                    {{ property.title }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in [
                { label: 'Price / ዋጋ', key: 'price' },
                { label: 'Bedrooms / የመኝታ ክፍሎች', key: 'bedrooms' },
                { label: 'Bathrooms / የመታጠቢያ ክፍሎች', key: 'bathrooms' },
                { label: 'Area (m²) / ስፋት', key: 'area' },
                { label: 'Type / ዓይነት', key: 'type' },
                { label: 'Furnished / የታጠቀ', key: 'furnished' },
                { label: 'Rating / ደረጃ', key: 'rating' }
              ]" :key="field.key" class="odd:bg-white even:bg-gray-50 dark:even:bg-gray-800 dark:odd:bg-gray-900">
                <th class="border border-gray-300 dark:border-gray-700 p-2 font-medium text-gray-700 dark:text-gray-300 w-40">
                  {{ field.label }}
                </th>
                <td
                  v-for="property in propertiesToCompare"
                  :key="property.id + '-' + field.key"
                  class="border border-gray-300 dark:border-gray-700 p-2 text-center text-gray-800 dark:text-gray-200"
                >
                  {{ property[field.key] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.overflow-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.overflow-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.overflow-auto::-webkit-scrollbar-track {
  background: transparent;
}
</style>
