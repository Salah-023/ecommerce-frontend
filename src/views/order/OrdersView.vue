<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">My Orders</h2>

    <!-- ✅ Status Filter -->
    <div class="mb-4">
      <label class="font-bold">Filter by Status:</label>
      <select v-model="selectedStatus" @change="fetchOrders" class="p-2 border rounded">
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>

    <!-- Orders List -->
    <div v-if="orders?.length > 0" class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="bg-white shadow p-4 rounded-md">
        <div class="flex justify-between">
          <div>
            <p><strong>Order ID:</strong> {{ order.id }}</p>
            <p v-if="authStore.getRole === 'admin'"><strong>Client:</strong> {{ order.user_name }}</p>
            <p><strong>Total Price:</strong> ${{ order.total_price }}</p>

            <!-- ✅ Admin Can Change Order Status -->
            <div v-if="authStore.getRole === 'admin'">
              <label class="block font-bold">Status:</label>
              <select v-model="order.status" @change="updateOrderStatus(order)" :class="statusClass(order.status)"
                class="p-2 rounded">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <!-- ✅ Show Colored Status for Non-Admins -->
            <p v-else>
              <strong>Status:</strong>
              <span :class="statusClass(order.status)" class="p-1 rounded">{{ order.status }}</span>
            </p>

            <p><strong>Ordered On:</strong> {{ new Date(order.created_at).toLocaleDateString() }}</p>
          </div>
          <button @click="viewOrderDetails(order.id)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500">You have no orders yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import axios from "@/api/axios-authenticated";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const orders = ref([]);
const router = useRouter();
const route = useRoute();

// ✅ Initialize selectedStatus from Query Params
const selectedStatus = ref(route.query.status || "");

// ✅ Fetch Orders with Status Filter
const fetchOrders = async () => {
  try {
    let url = "orders";
    if (selectedStatus.value) {
      url += `?status=${selectedStatus.value}`;
    }

    const response = await axios.get(url);
    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

// ✅ Function to update order status
const updateOrderStatus = async (order) => {
  try {
    const response = await axios.put(`orders/${order.id}`, {
      status: order.status
    });

    console.log("Order status updated:", response.data);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

// ✅ Navigate to Order Details
const viewOrderDetails = (orderId) => {
  router.push(`/orderdetails/${orderId}`);
};

// ✅ Style the Status Dropdown
const statusClass = (status) => ({
  "bg-yellow-200 text-yellow-700": status === "pending",
  "bg-blue-200 text-blue-700": status === "processing",
  "bg-purple-200 text-purple-700": status === "shipped",
  "bg-green-200 text-green-700": status === "delivered",
});

onMounted(fetchOrders);
</script>
