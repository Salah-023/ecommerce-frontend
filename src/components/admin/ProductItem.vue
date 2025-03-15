<template>
    <tr class="border-t">
      <td class="py-2 px-4">
        <img :src="`/images/products/${product.image_url}`"  alt="Product" class="w-12 h-12 object-cover rounded" />
      </td>
      <td class="py-2 px-4">{{ product.name }}</td>
      <td class="py-2 px-4">${{ product.price }}</td>
      <td class="py-2 px-4">{{ product.category.name }}</td>
      <td class="py-2 px-4" :class="{'text-red-500': product.stock < 5}">{{ product.stock }}</td>
      <td class="py-2 px-4">
        <button @click="$emit('edit', product)" class="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
        <button @click="$emit('delete', product.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      product: Object
    }
  };
  </script>
  
  <style scoped>
  button:hover {
    opacity: 0.8;
  }
  </style>