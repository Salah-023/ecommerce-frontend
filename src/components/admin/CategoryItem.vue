<template>
    <tr class="border-t">
      <td class="py-2 px-4">{{ index + 1 }}</td>
      <td class="py-2 px-4">{{ category.name }}</td>
      <td class="py-2 px-4">
        <button @click="$emit('edit', category)" class="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
        <button @click="$emit('delete', category.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      category: Object,
      index: Number
    }
  };
  </script>
  