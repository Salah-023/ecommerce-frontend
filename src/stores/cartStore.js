import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]); // Stores cart items in Pinia

  // Load cart from localStorage on startup
  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart);
    
    }
  };

  loadCartFromLocalStorage(); // Load cart on page refresh

  // **Add item to cart**
  const addToCart = (product) => {
  
    const existingItem = cartItems.value.find(
      (item) => item.id === product.id && item.name === product.name
    );
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  
    saveCartToLocalStorage();
  };
  
  

  // **Remove item from cart**
  const removeFromCart = (productId, productName) => {
  
    const index = cartItems.value.findIndex(
      (item) => item.product_id === productId && item.name === productName 
    );
  
    if (index !== -1) {
      console.log("Found item to remove at index:", index, cartItems.value[index]);
      cartItems.value.splice(index, 1); 
    } 
    saveCartToLocalStorage();

  };
  
  
  

  // **Update item quantity**
  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      saveCartToLocalStorage();
    }
  };

  // **Clear cart**
  const clearCart = () => {
    cartItems.value = [];
    saveCartToLocalStorage();
  };

  // **Save cart to localStorage**
  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  };

  // **Computed: Total Cart Count**
  const cartCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));

  // **Computed: Total Cart Price**
  const cartTotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity * item.price, 0));

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
