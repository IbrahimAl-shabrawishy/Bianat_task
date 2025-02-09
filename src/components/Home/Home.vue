<template>
    <div v-if="loading">
        <loading />
    </div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
        <div>
            <Slider />
        </div>
        <div>
            <ImagesStatic />
        </div>
        <div class="py-5 px-5">
            <router-link to="/cart">
                <button class="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition">
                    🛒 Cart ({{ productStore.cart.length }})
                </button>
            </router-link>
        </div>
        <div class="flex flex-wrap justify-center">
            <div v-for="product in paginatedProducts" :key="product.id">
                <div
                    class="relative  max-h-[400px] card m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
                        <div class="relative  mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                            <div v-if="product.images?.[0]">
                                <img loading="lazy" class="object-cover w-full" :src="product.images[0]"
                                    :alt="(product.title || '').split(' ').slice(0, 2).join(' ')"
                                    @error="handleImageError" />
                            </div>
                            <div v-else>
                                <img loading="lazy" class="object-cover imgDefault w-full" :src="imgDefault"
                                    alt="Default Image" />
                            </div>
                        </div>
                    </router-link>

                    <div class="mt-4 px-5 pb-5">
                        <h5 class="text-xl tracking-tight text-slate-900">
                            {{ (product.title || '').split(' ').slice(0, 3).join(' ') }}
                        </h5>
                        <p class="text-center text-gray-400">{{ product.description.split(' ').slice(0, 7).join(' ') }}
                        </p>
                        <div class="mt-2 mb-5 flex items-center justify-between">
                            <p>
                                <span class="text-3xl font-bold text-slate-900">{{ product?.price }}</span>
                                <span class="text-sm text-slate-900 line-through">$10</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <nav class="flex items-center p-1 justify-center m-8 rounded bg-white space-x-2">
        <button class="p-2 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600"
            :disabled="currentPage === 1" @click="prevPage">
            Previous
        </button>
        <span class="text-gray-500">Page {{ currentPage }}</span>
        <button class="p-2 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600"
            :disabled="currentPage === totalPages" @click="nextPage">
            Next
        </button>
    </nav>
</template>

<script lang="ts">
import { gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import { ref, computed, onMounted, watchEffect } from 'vue';
import imgDefault from '../../assets/istockphoto-1409329028-612x612.jpg';
import Loading from '../../components/Loading/Loading.vue';
import { useProductStore } from '../../Stores/product';
import Slider from '../../components/Slider/Slider.vue';
import ImagesStatic from '../Slider/ImagesStatic.vue';

export default {
    components: {
        Loading,
        Slider,
        ImagesStatic
    },
    setup() {
        const GET_PRODUCTS = gql`
        query {
            products {
                id
                title
                price
                images
                description
            }
        }
        `;
        const productStore = useProductStore();
        const { result, error, loading } = useQuery(GET_PRODUCTS);
        const products = ref([]);
        const currentPage = ref(1);
        const itemsPerPage = 8;

        const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

        const paginatedProducts = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return products.value.slice(start, end);
        });

        const handleImageError = (event: Event) => {
            const img = event.target as HTMLImageElement;
            if (img.src !== imgDefault) {
                img.src = imgDefault;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                localStorage.setItem('currentPage', currentPage.value.toString());
            }
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                localStorage.setItem('currentPage', currentPage.value.toString());
            }
        };

        watchEffect(() => {
            if (result.value && result.value.products) {
                products.value = result.value.products;
                localStorage.setItem('products', JSON.stringify(products.value));
            }
        });

        onMounted(() => {
            const cachedPage = localStorage.getItem('currentPage');
            const cachedProducts = localStorage.getItem('products');
            if (cachedPage) {
                currentPage.value = parseInt(cachedPage, 10);
            }
            if (cachedProducts) {
                products.value = JSON.parse(cachedProducts);
            } else if (result.value?.products) {
                products.value = result.value.products;
                localStorage.setItem('products', JSON.stringify(products.value));
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
            productStore,
            Slider,
            ImagesStatic
        };
    },
};
</script>

<style lang="scss" scoped>
@use "../../Variables.scss" as *;

.card {
    margin: $margin;

    img {
        transition: $transition;

        &:hover {
            transform: $transform;
            filter: $filter;
        }
    }
}
</style>
