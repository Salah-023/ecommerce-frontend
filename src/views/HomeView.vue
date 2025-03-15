<template>
  <main class="container mx-auto p-4">
    <!-- Category Filters -->
    <CategoryList @categoryChanged="filterProductsByCategory" />

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      <Product v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../api/axios-auth";
import Product from "../components/product.vue";
import CategoryList from "../components/CategoryList.vue";

const products = ref([]);
const selectedCategory = ref(null);

const fetchProducts = async () => {
  try {
    const response = await axios.get("/products");
    products.value = response.data;
    console.log(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const filterProductsByCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value;
  }
  return products.value.filter((product) => 
  product.category.id === selectedCategory.value);
});

onMounted(fetchProducts);
</script>
