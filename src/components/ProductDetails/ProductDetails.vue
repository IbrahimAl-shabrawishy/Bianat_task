<template>

    <div v-if="loading">

        <Loading />
    </div>
    <div v-else-if="error"> {{ error.message }}</div>
    <div v-else>

        <div v-if="productStore.product">
            <div class="bg-gray-100">
                <div class="container mx-auto px-4 py-8">
                    <div class="flex flex-wrap -mx-4">
                        <!-- Product Images -->
                        <div class="w-full md:w-1/2 px-4 mb-8">
                            <img loading="lazy" :src="productStore.product.images[0]" :alt="productStore.product.title"
                                class=" rounded-lg shadow-md mb-4" id="mainImage">
                            <div class="flex gap-4 py-4 justify-center overflow-x-auto">
                                <img loading="lazy" :src="productStore.product.images[1]"
                                    :alt="productStore.product.title"
                                    class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    @click="changeImage(this.src)">
                                <img loading="lazy" :src="productStore.product.images[2]"
                                    :alt="productStore.product.title"
                                    class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    @click="changeImage(this.src)">
                                <img loading="lazy" :src="productStore.product.images[0]"
                                    :alt="productStore.product.title"
                                    class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    @click="changeImage(this.src)">
                                <img loading="lazy" :src="productStore.product.images[1]"
                                    :alt="productStore.product.title"
                                    class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    @click="changeImage(this.src)">
                            </div>
                        </div>

                        <!-- Product Details -->
                        <div class="w-full md:w-1/2 px-4 py-11">
                            <h2 class="text-3xl font-bold mb-2">{{ productStore.product.title }}</h2>
                            <div class="mb-4">
                                <span class="text-2xl font-bold mr-2">{{ productStore.product.price }}</span>
                                <span class="text-gray-500 line-through">$100.99</span>
                            </div>
                            <div class="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6 text-yellow-500">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-2 text-gray-600">4.5 (120 reviews)</span>
                            </div>
                            <p class="text-gray-700 mb-6">{{ productStore.product.description }}</p>

                            <div class="flex space-x-4 mb-6">
                                <button @click="productStore.addToCart()"
                                    class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                                    Add to Cart
                                </button>


                                <button @click="productStore.mainPage()"
                                    class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                                    Main Page
                                </button>


                            </div>



                        </div>
                    </div>
                </div>


            </div>


        </div>

    </div>
</template>

<script>


import Loading from '../../components/Loading/Loading.vue';
import { useProductStore } from '../../Stores/product';
export default {
    components: {
        Loading,

    },
    setup() {
        const productStore = useProductStore();


        return {
            productStore,
        }

    }
};
</script>

<style lang="scss" scoped>
#mainImage {
    width: 100%;
    height: 500px;
}
</style>