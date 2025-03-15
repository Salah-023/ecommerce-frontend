<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Category Management</h2>
  
      <button @click="openModal()" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Category</button>
  
      <CategoryList :categories="categories" @edit="openModal" @delete="deleteCategory" />
  
      <CategoryModal v-if="showModal" :category="selectedCategory" @save="fetchCategories" @close="showModal = false" />
    </div>
  </template>
  
  <script>
  import axios from "@/api/axios-authenticated";
  import CategoryList from "@/components/admin/CategoryList.vue";
  import CategoryModal from "@/components/admin/CategoryModal.vue";
  
  export default {
    components: { CategoryList, CategoryModal },
    data() {
      return {
        categories: [],
        showModal: false,
        selectedCategory: null,
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get("/categories");
          this.categories = response.data;
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
      openModal(category = null) {
        this.selectedCategory = category;
        this.showModal = true;
      },
      async deleteCategory(categoryId) {
        if (confirm("Are you sure you want to delete this category?")) {
          try {
            await axios.delete(`/categories/${categoryId}`);
            this.fetchCategories();
          } catch (error) {
            console.error("Error deleting category:", error);
          }
        }
      }
    }
  };
  </script>
  