<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h2 class="text-2xl font-bold text-gray-900">Payment</h2>
            <p class="mt-2 text-gray-600">Total Amount: <span class="font-bold">${{ cartStore.cartTotal.toFixed(2)
                    }}</span></p>

            <button @click="completePayment"
                class="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Pay Now
            </button>

            <p v-if="paymentSuccess" class="mt-4 text-green-600 font-bold">Payment Successful! 🎉</p>
        </div>
    </div>
</template>

<script setup>
import axios from "@/api/axios-authenticated";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const paymentSuccess = ref(false);

const completePayment = async () => {
    try {
        const orderDTO = {
            user_id: authStore.getUserId, 
            total_price: cartStore.cartTotal,
            items: cartStore.cartItems.map(item => ({
                product_id: item.product_id, // ✅ FIX: Use "product_id" instead of "id"
                quantity: item.quantity
            }))
        };

        const response = await axios.post("/orders/place", orderDTO);
        console.log("✅ Order placed successfully:", response.data);

        paymentSuccess.value = true;

        setTimeout(() => {
            cartStore.clearCart(); // ✅ FIX: Use correct function to clear the cart
            router.push("/"); // ✅ Redirect to home after payment
        }, 2000);
    } catch (error) {
        console.error("❌ Error placing order:", error);
    }
};


</script>