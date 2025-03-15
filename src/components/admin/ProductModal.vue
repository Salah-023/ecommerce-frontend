<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">{{ product ? 'Edit Product' : 'Add Product' }}</h2>
        
        <form @submit.prevent="saveProduct">
          <label class="block mb-2">Name</label>
          <input v-model="formData.name" type="text" class="w-full p-2 border rounded mb-3" required />
          
          <label class="block mb-2">Description</label>
          <input v-model="formData.description" type="text" class="w-full p-2 border rounded mb-3" required />

          <label class="block mb-2">Price</label>
          <input v-model="formData.price" type="number" step="0.01" class="w-full p-2 border rounded mb-3" required />
          
          <label class="block mb-2">Category</label>
          <select v-model="formData.category" class="w-full p-2 border rounded mb-3">
          <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
          </option>
          </select>

          
          <label class="block mb-2">Stock</label>
          <input v-model="formData.stock" type="number" class="w-full p-2 border rounded mb-3" required />
          
          <label class="block mb-2">Product Image</label>
          <input type="file" @change="handleImageUpload" class="w-full p-2 border rounded mb-3" accept="image/*" />

          <!-- Show image preview -->
          <img v-if="imagePreview" :src="imagePreview" class="w-32 h-32 object-cover rounded mt-2" />

  
          <div class="flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "../../api/axios-authenticated";
  
  export default {
    props: {
      product: Object
    },
    data() {
      return {
        formData: {
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image_url: ''
        },
        imageFile: null, // Store the selected file
        imagePreview: null,
        categories: []
      };
    },
    watch: {
      product: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.formData = { ...newVal,
                category: newVal.category.id };
          }
        }
      }
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
  async handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    this.imageFile = file;

  // Upload the file to the local server
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      this.formData.image_url = data.filename; // ✅ Store only filename
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
},  
      async fetchCategories() {
        try {
          const response = await axios.get('categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async saveProduct() {
  try {
    // Send only the filename in `image_url`
    const payload = { ...this.formData };

    if (this.product) {
      await axios.put(`products/${this.product.product_id}`, payload);
    } else {
      await axios.post("products", payload);
    }

    this.$emit("save");
  } catch (error) {
    console.error("Error saving product:", error);
  }
}
    }
  };
  </script>
  
  <style scoped>
  input, select {
    border: 1px solid #ccc;
  }
  button:hover {
    opacity: 0.8;
  }
  </style>