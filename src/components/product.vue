<template>
  <div class="bg-white  border-bleu-300 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
    <!-- Product Image -->
    <div class="relative">
      <router-link :to="`/product/${product.product_id}`">
        <img :src="`/images/products/${product.image_url}`" :alt="product.name"
          class="w-full h-40 object-contain rounded-t-lg cursor-pointer" />
      </router-link>

      <!-- Discount Badge (if applicable) -->
      <span v-if="product.discount" class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
        Up to {{ product.discount }}% off
      </span>
      <!-- Wishlist & View Icons -->
      <div class="absolute top-2 right-2 flex space-x-2">
        <router-link :to="`/product/${product.product_id}`" class="bg-white p-1 rounded-full shadow hover:bg-gray-100">
          <span class="material-icons text-gray-500">visibility</span>
        </router-link>
        <button class="bg-white p-1 rounded-full shadow hover:bg-gray-100">
          <span class="material-icons text-gray-500">favorite_border</span>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-900">{{ product.name }}</h2>
      <p class="text-sm text-gray-600">{{ product.description }}</p>

      <!-- Rating Section -->
      <div class="flex items-center space-x-1 mt-2">
        <span class="text-yellow-400 material-icons text-lg">star</span>
        <span class="text-yellow-400 material-icons text-lg">star</span>
        <span class="text-yellow-400 material-icons text-lg">star</span>
        <span class="text-yellow-400 material-icons text-lg">star</span>
        <span class="text-yellow-400 material-icons text-lg">star_half</span>
        <span class="text-gray-600 text-sm ml-1">5.0 ({{ product.reviews }})</span>
      </div>

      <!-- Delivery & Best Price Tags -->
      <div class="flex items-center space-x-4 text-gray-600 text-sm mt-2">
        <span class="flex items-center space-x-1">
          <span class="material-icons text-gray-500">local_shipping</span>
          <span>Fast Delivery</span>
        </span>
        <span class="flex items-center space-x-1">
          <span class="material-icons text-gray-500">attach_money</span>
          <span>Best Price</span>
        </span>
      </div>

      <!-- Price & Add to Cart Button -->
      <div class="flex justify-between items-center mt-4">
        <span class="text-xl font-bold text-gray-900">${{ product.price }}</span>
        <button @click="addToCart(product)"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
          <span class="material-icons text-white">shopping_cart</span>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>
.material-icons {
  font-family: "Material Icons";
}
</style>