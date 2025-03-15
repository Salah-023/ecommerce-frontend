<template>
  <div class="flex overflow-x-auto space-x-3 p-4 bg-gray-100 rounded-lg">
    <!-- "All" button to show all products -->
    <CategoryItem
      :category="{ id: null, name: 'All' }"
      :selectedCategory="selectedCategory"
      @categorySelected="updateCategory"
    />

    <!-- Render category buttons -->
    <CategoryItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :selectedCategory="selectedCategory"
      @categorySelected="updateCategory"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import axios from "../api/axios-auth";
import CategoryItem from "./CategoryItem.vue";

const categories = ref([]);
const selectedCategory = ref(null);
const emit = defineEmits(["categoryChanged"]); // ✅ Define emit

const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const updateCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  emit("categoryChanged", categoryId); // ✅ Use emit correctly
};

onMounted(fetchCategories);
</script>
