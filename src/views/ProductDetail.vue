<template>
    <main class="container mx-auto p-6">
      <div v-if="product" class="flex flex-col md:flex-row items-center md:items-start bg-white border border-gray-200 shadow-lg rounded-lg p-6">
        <!-- Product Image -->
        <img :src="`/images/products/${product.image_url}`" :alt="product.name" class="w-full md:w-1/2 h-80 object-contain rounded-lg" />
  
        <!-- Product Info -->
        <div class="md:ml-6 flex flex-col space-y-4 text-center md:text-left">
          <h1 class="text-2xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="text-gray-600">{{ product.description }}</p>
  
          <!-- Price -->
          <div class="text-3xl font-semibold text-blue-600">${{ product.price }}</div>
  
          <!-- Rating (Static for Now) -->
          <div class="flex items-center justify-center md:justify-start space-x-1 text-yellow-400">
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star</span>
            <span class="material-icons">star_half</span>
          </div>
  
          <!-- Add to Cart Button -->
          <button @click="addToCart(product)"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition">
            <span class="material-icons text-white">shopping_cart</span>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
  
      <!-- Show Loading Message -->
      <div v-else class="text-center text-gray-600 text-lg">
        Loading product details...
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "../api/axios-auth";
  import { useCartStore } from "../stores/cartStore";

  const route = useRoute();
  const product = ref(null);
  const cartStore = useCartStore();

  const addToCart = (product) => {
  cartStore.addToCart(product);
  };
  
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/${route.params.id}`);
      product.value = response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  
  
  onMounted(fetchProduct);
  </script>
  