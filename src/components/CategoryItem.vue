<template>
  <button
    @click="selectCategory"
    class="px-4 py-2 border rounded-lg text-sm font-medium transition hover:bg-blue-600 hover:text-white"
    :class="{ 'bg-blue-600 text-white': isActive }"
  >
    {{ category.name }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  selectedCategory: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["categorySelected"]); // ✅ Define emit

const isActive = computed(() => props.selectedCategory === props.category.id);

const selectCategory = () => {
  emit("categorySelected", props.category.id); // ✅ Use emit correctly
};
</script>
