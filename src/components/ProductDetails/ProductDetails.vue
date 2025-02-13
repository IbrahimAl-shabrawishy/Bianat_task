<template>
    <div v-if="loading">
        loading....
    </div>
    <div v-else-if="error">
        {{ error.message }}
    </div>

    <div v-else>
        <div v-if="result.product">
            <div class="bg-gray-100">
                <div class="container mx-auto px-4 py-8">
                    <div class="flex flex-wrap -mx-4">
                        <!-- Product Images -->
                        <div v-if="result.product.images && result.product.images.length > 0"
                            class="w-full md:w-1/2 px-4 mb-8">
                            <img :src="result.product.images[0]" :alt="result.product.title"
                                class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" @error="handleImage">
                            <div class="flex gap-4 py-4 justify-center overflow-x-auto">
                                <img v-for="(image, index) in result.product.images" :key="index" :src="image"
                                    :alt="result.product.title"
                                    class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    @click="changeImage(image)" @error="handleImage">
                            </div>
                        </div>

                        <!-- Product Details -->
                        <div class="w-full md:w-1/2 py-11 px-4">
                            <h2 class="text-3xl font-bold mb-2">{{ result.product.title }}</h2>
                            <p class="text-gray-400 mb-4">{{ result.product.title }}</p>
                            <div class="mb-4">
                                <span class="text-2xl font-bold mr-2">${{ result.product.price }}</span>
                                <span class="text-gray-500 line-through">$10</span>
                            </div>

                            <p class="text-gray-400 mb-6">{{ result.product.description }}</p>
                            <div class="flex space-x-4 mb-6">
                                <button @click="addProductToCart"
                                    class="bg-gray-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Add to Cart
                                </button>

                                <button @click="CartStore.mainPage()"
                                    class="bg-gray-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                                    Main Page
                                </button>
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold mb-2">Details:</h3>
                                <ul class="list-disc list-inside text-gray-700">
                                    <li>Title : {{ result.product.title }}</li>
                                    <li>Price : ${{ result.product.price }}</li>
                                    <li>Description : {{ result.product.description.split(' ').splice(0, 3).join(' ') }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { ref } from "vue";
import imgDefault from '../../assets/qNOjJje.jpeg';
import { useCartStore } from '../../Stores/CartStore';
export default {
    setup() {
        const router = useRouter();
        const CartStore = useCartStore();
        const get_product_Details = gql`
        query ($id: ID!) {
          product(id: $id) {
            title
            description
            price
            images
          }
        }
      `;

        const imageDefault = ref(imgDefault);
        const route = useRoute();
        const productId = ref(route.params.id);
        const { result, error, loading } = useQuery(get_product_Details, {
            id: productId.value,
        });

        function handleImage(e) {
            const img = e.target;
            if (!img.complete || img.naturalWidth === 0) {
                img.src = imageDefault.value;
            }
        }

        function changeImage(newImage) {
            document.getElementById("mainImage").src = newImage;
        }


        function addProductToCart() {
            if (result.value?.product) {
                CartStore.addToCart({
                    id: productId.value,
                    title: result.value.product.title,
                    price: result.value.product.price,
                    image: result.value.product.images[0],
                });
                alert("Add Product Successfully 🛒");
                router.push('/cart');
            }
        }

        return {
            result,
            error,
            loading,
            productId,
            imageDefault,
            handleImage,
            changeImage,
            CartStore,
            addProductToCart
        };
    },
};
</script>

<style lang="scss" scoped>
#mainImage {
    width: 100%;
    height: 500px;
}
</style>