<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-900">Login</h2>

      <!-- Error Message -->
      <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>

      <form @submit.prevent="login" class="mt-4">
        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" required
            class="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" id="password" required
            class="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Login Button -->
        <button type="submit" class="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
          Login
        </button>
      </form>

      <!-- Create Account Link -->
      <p class="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore"; // Import our Pinia store
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    console.log(authStore.getRole)
    console.log(authStore.getToken)
    //Redirect user based on role
    if (authStore.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>