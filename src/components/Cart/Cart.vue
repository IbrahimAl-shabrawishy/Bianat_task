<template>
    <div v-if="loading">
        <Loading />
    </div>

    <div v-if="productStore.cart.length > 0">
        <div class="bg-gray-100 h-screen py-8">
            <div class="container mx-auto px-4">
                <div class="flex justify-between py-2">
                    <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <button @click="productStore.mainPage()"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Main Page
                    </button>
                </div>
                <div class="flex flex-col gap-4">
                    <!-- تكرار المنتجات في السلة -->
                    <div v-for="(item, index) in productStore.cart" :key="index"
                        class="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th class="text-left font-semibold">Product</th>
                                    <th class="text-left font-semibold">Price</th>
                                    <th class="text-left font-semibold">Quantity</th>
                                    <th class="text-left font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <img class="h-16 w-16 mr-4" :src="item?.images?.[0]" :alt="item?.title">
                                            <span class="font-semibold">
                                                {{ item?.title.split(' ').slice(0, 1).join(' ') }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="py-4">${{ item?.price }}</td>
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <button class="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span class="text-center w-8">1</span>
                                            <button class="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                    </td>
                                    <td class="py-4">{{ item?.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductStore } from '../../Stores/product';
import Loading from '../../components/Loading/Loading.vue';

export default {
    components: {
        Loading
    },
    setup() {
        const productStore = useProductStore();




        return {
            productStore,

        };
    }
};
</script>

<style></style>