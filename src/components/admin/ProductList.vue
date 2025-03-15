<template>
    <div class="overflow-x-auto">
      <table class="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2 px-4">Image</th>
            <th class="py-2 px-4">Name</th>
            <th class="py-2 px-4">Price</th>
            <th class="py-2 px-4">Category</th>
            <th class="py-2 px-4">Stock</th>
            <th class="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem v-for="product in products" :key="product.product_id" :product="product" @edit="$emit('edit', product)" @delete="$emit('delete', product.product_id)" />
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import ProductItem from '@/components/admin/ProductItem.vue';
  
  export default {
    components: { ProductItem },
    props: {
      products: Array
    }
  };
  </script>
  
  <style scoped>
  th, td {
    padding: 12px 16px; /* Ensure both have same padding */
    text-align: left; /* Align text properly */
    vertical-align: middle; /* Align elements in the middle */
  }
  
  th {
    background-color: #f3f4f6; /* Light gray background */
    font-weight: bold;
  }
  
  img {
    width: 50px; /* Keep a fixed width */
    height: 50px;
    object-fit: cover; /* Ensure image stays contained */
    border-radius: 5px;
  }
  </style>
  
  