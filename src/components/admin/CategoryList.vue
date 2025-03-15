<template>
    <table class="w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr class="bg-gray-200">
                <th class="py-2 px-4">Id</th>
                <th class="py-2 px-4">Name</th>
                <th class="py-2 px-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            <CategoryItem v-for="(category, index) in categories" :key="category.id" :category="category" :index="index"
                @edit="$emit('edit', category)" @delete="$emit('delete', category.id)" />
        </tbody>
    </table>
</template>

<script>
import CategoryItem from "@/components/admin/CategoryItem.vue";

export default {
    components: { CategoryItem },
    props: {
        categories: Array
    }
};
</script>

<style scoped>
th,
td {
    text-align: left;
    padding: 12px 16px;
    /* Ensures same padding */
}

th {
    background-color: #e5e7eb;
    /* Light gray */
    font-weight: bold;
}

td {
    border-top: 1px solid #ddd;
    /* Consistent border */
}
</style>