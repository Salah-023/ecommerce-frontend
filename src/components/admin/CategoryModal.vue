<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">{{ category ? 'Edit Category' : 'Add Category' }}</h2>
        
        <form @submit.prevent="saveCategory">
          <label class="block mb-2">Name</label>
          <input v-model="formData.name" type="text" class="w-full p-2 border rounded mb-3" required />
  
          <div class="flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "@/api/axios-authenticated";
  
  export default {
    props: {
      category: Object
    },
    data() {
      return {
        formData: {
          name: ''
        }
      };
    },
    watch: {
      category: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.formData = { ...newVal };
          }
        }
      }
    },
    methods: {
      async saveCategory() {
        try {
          if (this.category) {
            await axios.put(`/categories/${this.category.id}`, this.formData);
          } else {
            await axios.post("/categories", this.formData);
          }
          this.$emit("save");
          this.$emit("close");
        } catch (error) {
          console.error("Error saving category:", error);
        }
      }
    }
  };
  </script>
  