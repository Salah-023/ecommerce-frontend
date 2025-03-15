<template>
  <nav class="bg-blue-600 text-white p-4 flex justify-between items-center px-4">
    <!-- Logo -->
    <router-link to="/" class="text-xl font-bold">My Webshop</router-link>

    <!-- Menu -->
    <ul class="flex space-x-6">
      <!-- Show Login Icon if user is NOT authenticated -->
      <router-link v-if="!isAuthenticated" to="/login" class="hover:underline">
        <span class="material-icons text-2xl">login</span>
      </router-link>

      <!-- Show Admin Navigation if the user is an admin -->
      <template v-else-if="userRole === 'admin'">
        <router-link to="/admin" class="hover:underline">Dashboard</router-link>
        <router-link to="/ordermanagement" class="hover:underline">Orders</router-link>
        <router-link to="/productmanagement" class="hover:underline">Products</router-link>
        <router-link to="/categorymanagement" class="hover:underline">Categories</router-link>
        <router-link to="/profile" class="hover:underline">
          <span class="material-icons text-2xl">account_circle</span> <!-- Profile Icon -->
        </router-link>
        <button @click="logout" class="hover:underline">
          <span class="material-icons text-2xl">logout</span> <!-- Logout Icon -->
        </button>
      </template>

      <!-- Show Customer Navigation if the user is a customer -->
      <template v-else>
        <router-link to="/profile" class="hover:underline">
          <span class="material-icons text-2xl">account_circle</span> <!-- Profile Icon -->
        </router-link>
        <router-link to="/orders" class="hover:underline">My Orders</router-link>
        <button @click="logout" class="hover:underline">
          <span class="material-icons text-2xl">logout</span> <!-- Logout Icon -->
        </button>
      </template>

      <!-- Cart Icon (Only visible for customers) -->
      <router-link v-if="userRole != 'admin'" to="/cart" class="relative">
        <span class="material-icons text-2xl">shopping_cart</span>
        <span v-if="cartStore.cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
          {{ cartStore.cartCount }}
        </span>
      </router-link>
    </ul>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { computed, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const cartStore = useCartStore();
const isAuthenticated = ref(authStore.isAuthenticated);
const userRole = ref(authStore.getRole); // Get the user role
const router = useRouter();

// 🚀 Watch for authentication state changes & update immediately
watchEffect(() => {
  isAuthenticated.value = authStore.isAuthenticated;
  userRole.value = authStore.getRole;
});

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style>
.material-icons {
  font-family: 'Material Icons';
}
</style>
