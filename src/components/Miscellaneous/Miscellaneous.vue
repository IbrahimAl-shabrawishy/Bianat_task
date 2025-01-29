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

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watchEffect } from 'vue';
import imgDefault from '../../assets/istockphoto-1409329028-612x612.jpg';
import Loading from '../Loading/Loading.vue';

export default {
    components: {
        Loading,
    },
    setup() {
        // استعلام GraphQL لجلب فئة واحدة
        const GET_CATEGORY = gql`
            query {
                category(id: 5) {
                    id
                    name
                    image
                }
            }
        `;

        // استعلام GraphQL
        const { result, loading, error } = useQuery(GET_CATEGORY);

        // بيانات الفئة
        const category = ref([]);

        // وظيفة لمعالجة خطأ الصور
        const handleImageError = (event: Event) => {
            const img = event.target as HTMLImageElement;
            if (img.src !== imgDefault) {
                img.src = imgDefault;
            }
        };

        // مراقبة التغيرات في نتيجة الاستعلام
        watchEffect(() => {
            if (result.value && result.value.category) {
                category.value = result.value.category; // تحديث بيانات الفئة
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
