<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Product Management</h1>
    
    <!-- ✅ Category Filter -->
    <div class="mb-4">
      <label class="font-bold">Filter by Category:</label>
      <select v-model="selectedCategory" @change="fetchProducts" class="p-2 border rounded">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Add Product Button -->
    <button @click="openAddProductModal" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Product</button>

    <!-- Product List Component -->
    <ProductList :products="products" @edit="editProduct" @delete="deleteProduct" />

    <!-- Modals -->
    <ProductModal v-if="showModal" :product="selectedProduct" @close="showModal = false" @save="handleSaveProduct" />
  </div>
</template>

<script>
import axios from "../../api/axios-auth";
import ProductList from '@/components/admin/ProductList.vue';
import ProductModal from '@/components/admin/ProductModal.vue';
import axiosAuthenticated from "../../api/axios-authenticated";

export default {
  components: { ProductList, ProductModal },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: "", // ✅ Holds the selected category ID
      showModal: false,
      selectedProduct: null
    };
  },
  mounted() {
    this.fetchCategories(); // ✅ Fetch categories on mount
    this.fetchProducts();
  },
  methods: {
    // ✅ Fetch Products with Optional Category Filtering
    async fetchProducts() {
      try {
        let url = "products";
        if (this.selectedCategory) {
          url += `?category_id=${this.selectedCategory}`;
        }

        const response = await axios.get(url);
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    
    // ✅ Fetch All Categories
    async fetchCategories() {
      try {
        const response = await axios.get("categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    openAddProductModal() {
      this.selectedProduct = null;
      this.showModal = true;
    },

    editProduct(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },

    async deleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await axiosAuthenticated.delete(`products/${productId}`);
          this.fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    },

    handleSaveProduct() {
      this.showModal = false;
      this.fetchProducts();
    }
  }
};
</script>
