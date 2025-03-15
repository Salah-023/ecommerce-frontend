<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Hello, {{ adminName }} 👋</h1>
  
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Revenue -->
        <div class="bg-white shadow-md p-4 rounded-md">
          <h2 class="text-lg font-semibold text-gray-700">Total Revenue</h2>
          <p class="text-2xl font-bold text-green-600">${{ totalRevenue }}</p>
        </div>
  
        <!-- Total Orders -->
        <div class="bg-white shadow-md p-4 rounded-md">
          <h2 class="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p class="text-2xl font-bold">{{ totalOrders }}</p>
        </div>
  
        <!-- ✅ Pending Orders (Clickable with Hover Effect) -->
        <div class="bg-yellow-100 shadow-md p-4 rounded-md cursor-pointer hover:bg-yellow-300"
          @click="goToOrders('pending')">
          <h2 class="text-lg font-semibold text-gray-700">Pending Orders</h2>
          <p class="text-2xl font-bold text-yellow-600">{{ pendingOrders }}</p>
        </div>
  
        <!-- ✅ Processing Orders -->
        <div class="bg-blue-100 shadow-md p-4 rounded-md cursor-pointer hover:bg-blue-300"
          @click="goToOrders('processing')">
          <h2 class="text-lg font-semibold text-gray-700">Processing Orders</h2>
          <p class="text-2xl font-bold text-blue-600">{{ processingOrders }}</p>
        </div>
  
        <!-- ✅ Shipped Orders -->
        <div class="bg-purple-100 shadow-md p-4 rounded-md cursor-pointer hover:bg-purple-300"
          @click="goToOrders('shipped')">
          <h2 class="text-lg font-semibold text-gray-700">Shipped Orders</h2>
          <p class="text-2xl font-bold text-purple-600">{{ shippedOrders }}</p>
        </div>
  
        <!-- ✅ Delivered Orders -->
        <div class="bg-green-100 shadow-md p-4 rounded-md cursor-pointer hover:bg-green-300"
          @click="goToOrders('delivered')">
          <h2 class="text-lg font-semibold text-gray-700">Delivered Orders</h2>
          <p class="text-2xl font-bold text-green-600">{{ deliveredOrders }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/stores/authStore";
  import axios from "@/api/axios-authenticated";
  import { useRouter } from "vue-router";
  
  const authStore = useAuthStore();
  const router = useRouter();
  const adminName = ref(authStore.getUserName || "Admin");
  
  // Order statistics
  const totalRevenue = ref(0);
  const totalOrders = ref(0);
  const pendingOrders = ref(0);
  const processingOrders = ref(0);
  const shippedOrders = ref(0);
  const deliveredOrders = ref(0);
  
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("orders/admin/stats");
      const stats = response.data;
  
      totalRevenue.value = stats.totalRevenue;
      totalOrders.value = stats.totalOrders;
      pendingOrders.value = stats.pendingOrders;
      processingOrders.value = stats.processingOrders;
      shippedOrders.value = stats.shippedOrders;
      deliveredOrders.value = stats.deliveredOrders;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };
  
  // ✅ Navigate to Orders Page with Status Filter
  const goToOrders = (status) => {
    router.push({ path: "/ordermanagement", query: { status } });
  };
  
  onMounted(fetchDashboardData);
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
  