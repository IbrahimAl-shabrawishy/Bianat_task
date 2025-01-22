<template>
    <div v-if="loading">
        <Loading />
    </div>
    <div v-else-if="error">
        <h3>{{ error.message }}</h3>
    </div>

    <div v-if="product">
        <h1>{{ product.title }}</h1>
        <p>Price: {{ product.price }}</p>
        <p>Description: {{ product.description }}</p>
        <div v-if="product.images && product.images.length > 0">
            <h3>Images</h3>
            <div v-for="(image, index) in product.images" :key="index">
                <img :src="image" alt="Product image" />
            </div>
        </div>
    </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watchEffect } from 'vue';
import Loading from '../../components/Loading/Loading.vue';

export default {
    props: ['id'],
    components: {
        Loading,
    },
    setup(props) {

        const GET_PRODUCTDETAILS = gql`
            query($id: ID!) {
                product(id: $id) {
                    title
                    price
                    description
                    images
                }
            }
        `;

        const { result, loading, error } = useQuery(GET_PRODUCTDETAILS, {
            variables: { id: props.id }
        });

        const product = ref();

        watchEffect(() => {
            if (result.value) {
                product.value = result.value.product;
            }
        });

        return {
            product,
            loading,
            error,
            result
        }
    }
}
</script>

<style>
/* يمكن إضافة تنسيقات هنا */
</style>
