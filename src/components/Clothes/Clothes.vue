/** ============================================
table of contents
================================================

1. Display Single Product from Category Api
2. Apollo Client to Display Category
3.Scss Code


*

/* *=======================================
1. Display Single Product from Category Api
*========================================== */


<template>
    <div v-if="loading">
        <loading />
    </div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else class="flex flex-wrap justify-center">
        <div v-if="category">
            <div
                class="relative card m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <div v-if="category.image">
                        <img loading="lazy" class="object-cover w-full" :src="category.image"
                            :alt="(category.name || '').split(' ').slice(0, 2).join(' ')" @error="handleImageError" />
                    </div>
                    <div v-else>
                        <img loading="lazy" class="object-cover imgDefault w-full" :src="imgDefault"
                            alt="Default Image" />
                    </div>
                </a>
                <div class="mt-4 px-5 pb-5">
                    <h5 class="text-xl tracking-tight text-slate-900">
                        {{ (category.name || '').split(' ').slice(0, 3).join(' ') }}
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>
/* *=======================================
2. Apollo Client to Display Category
*========================================== */
<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from "@apollo/client/core";
import { ref, watchEffect } from 'vue';
import imgDefault from '../../assets/istockphoto-1409329028-612x612.jpg';
import Loading from '../../components/Loading/Loading.vue';

export default {
    components: {
        Loading,
    },
    setup() {

        const GET_CATEGORY = gql`
            query {
                category(id: 1) {
                    id
                    name
                    image
                }
            }
        `;

        const { result, loading, error } = useQuery(GET_CATEGORY);


        const category = ref([]);

        const handleImageError = (event: Event) => {
            const img = event.target as HTMLImageElement;
            if (img.src !== imgDefault) {
                img.src = imgDefault;
            }
        };


        watchEffect(() => {
            if (result.value && result.value.category) {
                category.value = result.value.category;
            }
        });

        return {
            category,
            loading,
            error,
            handleImageError,
            imgDefault,
        };
    },
};
</script>

/* *=======================================
3.Scss Code
*========================================== */

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
