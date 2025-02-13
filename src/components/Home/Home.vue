<template>
    <div v-if="loading">
        <Loading />
    </div>
    <div v-else-if="error">
        Error: {{ error.message }}
    </div>
    <div v-else>
        <Slider />
        <ImagesStatic />
        <div class="py-5 px-5">
            <router-link to="/cart">
                <button class="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
                    🛒 Cart {{ cartStore.cart.length }}
                </button>
            </router-link>
        </div>

        <div v-if="paginatedProducts.length" class="flex flex-wrap justify-center">
            <div v-for="product in paginatedProducts" :key="product.id">
                <div
                    class="relative max-h-[400px] card m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                        <div class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                            <img loading="lazy" class="object-cover w-full" :src="product.images?.[0] || imgDefault"
                                :alt="(product.title || '').split(' ').slice(0, 2).join(' ')"
                                @error="handleImageError" />
                        </div>
                    </router-link>
                    <div class="mt-4 px-5 pb-5">
                        <h5 class="text-xl tracking-tight text-slate-900">
                            {{ (product.title || '').split(' ').slice(0, 3).join(' ') }}
                        </h5>
                        <p class="text-center text-gray-400">
                            {{ product.description.split(' ').slice(0, 7).join(' ') }}
                        </p>
                        <div class="mt-2 mb-5 flex items-center justify-between">
                            <p>
                                <span class="text-3xl font-bold text-slate-900">{{ product.price }}</span>
                                <span class="text-sm text-slate-900 line-through">$10</span>
                            </p>
                            <button @click="addProductToCart(product)"
                                class="bg-gray-600 flex gap-2 items-center p-5 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="text-center text-gray-500">No products available.</p>

        <nav class="flex items-center p-1 justify-center m-8 rounded bg-white space-x-2">
            <button
                class="p-2 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600"
                :disabled="currentPage === 1" @click="prevPage()">
                Previous
            </button>
            <span class="text-gray-500">Page {{ currentPage }}</span>
            <button
                class="p-2 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600"
                :disabled="currentPage === totalPages" @click="nextPage">
                Next
            </button>
        </nav>
    </div>
</template>

<script lang="ts">
import { gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from "../../Stores/CartStore";
import Loading from '../../components/Loading/Loading.vue';
import Slider from '../../components/Slider/Slider.vue';
import ImagesStatic from '../Slider/ImagesStatic.vue';
import imgDefault from '../../assets/qNOjJje.jpeg';

export default {
    components: { Loading, Slider, ImagesStatic },
    setup() {
        const router = useRouter();
        const cartStore = useCartStore();

        const itemsPerPage = 8;
        const currentPage = ref(1);
        const products = ref([]);

        const GET_PRODUCTS = gql`
            query getProducts($limit: Int, $offset: Int) {
                products(limit: $limit, offset: $offset) {
                    id
                    title
                    price
                    images
                    description
                }
            }
        `;

        const { result, error, loading, refetch } = useQuery(GET_PRODUCTS, {
            limit: itemsPerPage,
            offset: (currentPage.value - 1) * itemsPerPage,
        });



        const totalPages = computed(() => Math.ceil(result.value?.products?.length / itemsPerPage));
        const paginatedProducts = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return products.value.slice(start, end);
        });

        const handleImageError = (event: Event) => {
            (event.target as HTMLImageElement).src = imgDefault;
        };
        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                refetch({
                    limit: itemsPerPage,
                    offset: (currentPage.value - 1) * itemsPerPage,
                });
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                refetch({
                    limit: itemsPerPage,
                    offset: (currentPage.value - 1) * itemsPerPage,
                });
            }
        };
        interface Product {
            id: number;
            title: string;
            price: number;
            images: string[];
            description: string;
        }

        const addProductToCart = (product: Product) => {
            cartStore.addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                images: product.images,
            });
            alert("Product added to cart 🛒");
            router.push('/cart');
        };


        watchEffect(() => {
            if (result.value?.products) {
                products.value = result.value.products;
            }
        });

        return {
            products,
            paginatedProducts,
            error,
            loading,
            currentPage,
            totalPages,
            imgDefault,
            nextPage,
            prevPage,
            handleImageError,
            cartStore,
            addProductToCart
        };
    }
};
</script>

<style lang="scss" scoped>
@use "../../Variables.scss" as *;

.card {
    margin: $margin;
    transition: $transition;

    &:hover {
        border: black 1px solid;
    }

    img {
        transition: $transition;

        &:hover {
            transform: $transform;
            filter: $filter;
        }
    }
}
</style>