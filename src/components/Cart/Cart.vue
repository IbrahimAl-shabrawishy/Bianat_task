<template>
    <div v-if="loading">
        <Loading />
    </div>
    <div v-else-if="error">
        {{ error.message }}
    </div>
    <div v-else>
        <div class="bg-gray-100 h-screen py-8">
            <div class="container mx-auto px-4">
                <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <button @click="cartStore.mainPage()"
                    class="text-white bg-gray-700 m-3 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Main Page
                </button>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="md:w-3/4">
                        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
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
                                    <tr v-for="item in cart" :key="item.id">
                                        <td class="py-4">
                                            <div class="flex items-center">
                                                <img class="h-16 w-16 mr-4" :src="item.image" alt="Product image">
                                                <span class="font-semibold">{{ item.title }}</span>
                                            </div>
                                        </td>
                                        <td class="py-4">${{ item.price }}</td>
                                        <td class="py-4">
                                            <div class="flex items-center">
                                                <button @click="decreaseQuantity(item.id)"
                                                    class="border rounded-md py-2 px-4 mr-2">-</button>
                                                <span class="text-center w-8">{{ item.quantity }}</span>
                                                <button @click="increaseQuantity(item.id)"
                                                    class="border rounded-md py-2 px-4 ml-2">+</button>
                                            </div>
                                        </td>
                                        <td class="py-4">${{ item.price * item.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="md:w-1/4">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-lg font-semibold mb-4">Summary</h2>
                            <div class="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${{ cartTotal }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>${{ tax }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$5.00</span>
                            </div>
                            <hr class="my-2">
                            <div class="flex justify-between mb-2">
                                <span class="font-semibold">Total</span>
                                <span class="font-semibold">${{ finalTotal }}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "../../Stores/CartStore";
import Loading from "../../components/Loading/Loading.vue";
export default {
    components: { Loading },
    setup() {
        const cartStore = useCartStore();


        function increaseQuantity(productId) {
            const product = cartStore.cart.find(item => item.id === productId);
            if (product) product.quantity++;
        }


        function decreaseQuantity(productId) {
            const productIndex = cartStore.cart.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                if (cartStore.cart[productIndex].quantity > 1) {
                    cartStore.cart[productIndex].quantity--;
                } else {
                    cartStore.cart.splice(productIndex, 1);
                }
            }
        }

        const cartTotal = computed(() =>
            cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );


        const tax = computed(() => (cartTotal.value * 0.1).toFixed(2));


        const finalTotal = computed(() => (parseFloat(cartTotal.value) + parseFloat(tax.value) + 5).toFixed(2));

        return {
            cart: cartStore.cart,
            increaseQuantity,
            decreaseQuantity,
            cartTotal,
            tax,
            finalTotal,
            cartStore,
            Loading,


        };
    }
};
</script>

<style></style>
