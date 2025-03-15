<template>
    <div class="container mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Order Details</h2>
  
      <div v-if="order">
        <p><strong>Order ID:</strong> {{ order.order_id }}</p>
        <p v-if="authStore.getRole === 'admin'"><strong>Name of the client:</strong> {{ order.user_name }}</p>
        <p><strong>Total Price:</strong> ${{ order.total_price }}</p>
        <p><strong>Status:</strong> <span :class="statusClass(order.status)">{{ order.status }}</span></p>
        <p><strong>Ordered On:</strong> {{ new Date(order.created_at).toLocaleDateString() }}</p>
  
        <h3 class="text-xl font-semibold mt-4">Items:</h3>
        <div v-if="orderItems.length > 0" class="space-y-4">
          <div v-for="item in orderItems" :key="item.id" class="bg-white shadow p-4 rounded-md flex items-center">
            <img :src="`/images/products/${item.product.image_url}`"  :alt="item.image_url" class="w-20 h-20 object-cover rounded">
            <div class="ml-4">
              <p><strong>{{ item.product_name }}</strong></p>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Price: ${{ item.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
  
        <p v-else class="text-gray-500">No items found for this order.</p>
      </div>
  
      <p v-else class="text-gray-500">Loading order details...</p>
  
      <button @click="goBack" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
        Back to Orders
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/authStore";
  import axios from "@/api/axios-authenticated";
  
  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();
  const order = ref(null);
  const orderItems = ref([]);
  
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`orders/${route.params.orderId}`);
      order.value = response.data.items[0].order;
      orderItems.value = response.data.items;
      console.log(response.data.items[0].order);
      console.log(response.data.items);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  
  const goBack = () => {
    if(authStore.getRole == 'admin'){
      router.push("/ordermanagement");
    }else{
      router.push("/orders");
    }
   
  };
  
  const statusClass = (status) => {
  return {
    "bg-yellow-200 text-yellow-700": status === "pending",
    "bg-blue-200 text-blue-700": status === "processing",
    "bg-purple-200 text-purple-700": status === "shipped",
    "bg-green-200 text-green-700": status === "delivered",
  };
};
  
  onMounted(fetchOrderDetails);
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  