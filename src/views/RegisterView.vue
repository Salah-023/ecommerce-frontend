<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-bold text-center text-gray-900">Create an Account</h2>

        <!-- Error Message -->
        <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>

        <form @submit.prevent="register" class="mt-4">
          <!-- Name Field -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              required
              class="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Email Field -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Password Field -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            class="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </form>

        <!-- Already Have an Account Link -->
        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
        </p>
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import axios from "@/api/axios-auth"; // Import Axios instance

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const register = async () => {
  try {
    await axios.post("users/register", { name: name.value, email: email.value, password: password.value });
  
    router.push("/login");
  } catch (error) {
    errorMessage.value = "Registration failed. Please try again.";
  }
};
</script>
