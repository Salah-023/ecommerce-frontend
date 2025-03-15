<template>
  <section class="bg-white py-8 antialiased md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

      <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <!-- Cart Items -->
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            <div v-for="item in cartStore.cartItems" :key="item.id"
              class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
              <!-- Product Image -->
              <a href="#" class="shrink-0 md:order-1">
                <img class="h-20 w-20 object-contain" :src="`/images/products/${item.image_url}`" :alt="item.name" />
              </a>

              <!-- Product Details -->
              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" class="text-base font-medium text-gray-900 hover:underline">
                  {{ item.name }}
                </a>
                <p class="text-sm text-gray-500">${{ item.price.toFixed(2) }}</p>
              </div>

              <!-- Quantity & Total Price -->
              <div class="flex items-center justify-between md:order-3 md:w-44">
                <input type="number" min="1"
                  class="w-14 h-10 text-center border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  v-model="item.quantity" @change="cartStore.updateQuantity(item.id, item.quantity)" />
                <p class="text-base font-bold text-gray-900">${{ (item.quantity * item.price).toFixed(2) }}</p>

                <!-- Remove Button -->
                <button @click="cartStore.removeFromCart(item.product_id, item.name)" class="text-red-500 hover:text-red-700">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <p class="text-xl font-semibold text-gray-900">Order Summary</p>

            <div class="space-y-4">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500">Subtotal ({{ cartStore.cartItems.length }} items)</dt>
                <dd class="text-base font-medium text-gray-900">${{ cartStore.cartTotal.toFixed(2) }}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500">Shipping</dt>
                <dd class="text-base font-medium text-green-600">Free</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                <dt class="text-base font-bold text-gray-900">Total</dt>
                <dd class="text-base font-bold text-gray-900">${{ cartStore.cartTotal.toFixed(2) }}</dd>
              </dl>
            </div>

            <button @click="proceedToCheckout"
              class="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
              Proceed to Checkout
            </button>

            <div class="flex items-center justify-center gap-2">
              <span class="text-sm font-normal text-gray-500">or</span>
              <a href="/" class="text-sm font-medium text-blue-600 underline hover:no-underline">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const proceedToCheckout = () => {
  if (!authStore.isAuthenticated) {
    alert("You are not logged in, please log in to continue.");
    router.push("/login"); // Redirect to login page
  } else {
    router.push("/payment"); // Redirect to payment page
  }
}
</script>