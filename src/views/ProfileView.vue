<template>
    <div class="container mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">My Profile</h2>
  
      <div v-if="user" class="bg-white shadow-md rounded p-6 max-w-md">
        <div class="mb-4">
          <label class="block font-semibold">Name:</label>
          <input v-model="user.name" class="w-full p-2 border rounded" />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold">Email:</label>
          <input v-model="user.email" class="w-full p-2 border rounded" disabled />
        </div>
  
  
        <!-- <div class="mb-4">
          <label class="block font-semibold">New Password (Optional):</label>
          <input v-model="newPassword" type="password" class="w-full p-2 border rounded" placeholder="Enter new password" />
        </div>
  
        <button @click="updateProfile" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button> -->
      </div>
  
      <p v-else class="text-gray-500">Loading user details...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "@/api/axios-authenticated";
  import { useAuthStore } from "@/stores/authStore";
  
  const authStore = useAuthStore();
  const user = ref(null);
  const newPassword = ref("");
  
  // **Fetch User Details**
  const fetchUser = async () => {
    try {
      const response = await axios.get("users");
      user.value = response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
  // **Update User Profile**
  // const updateProfile = async () => {
  //   try {
  //     const updatedData = {
  //       name: user.value.name,
  //       email: user.value.email, // Kept unchanged
  //       ...(newPassword.value ? { password: newPassword.value } : {}),
  //     };
  
  //     const response = await axios.put("users/me", updatedData);
  //     console.log("Profile updated:", response.data);
  //     newPassword.value = ""; // Clear password field
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };
  
  onMounted(fetchUser);
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  </style>
  