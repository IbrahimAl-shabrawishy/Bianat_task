<template>
    <div v-if="loading">جاري التحميل...</div>
    <div v-else-if="error">حدث خطأ أثناء تحميل البيانات: {{ error.message }}</div>
    <div v-else>
        <!-- تحقق إذا كانت البيانات موجودة قبل العرض -->
        <div v-if="product">
            <h1>{{ product.title }}</h1>
            <p>السعر: {{ product.price }}</p>
        </div>
        <div v-else>
            <p>المنتج غير موجود.</p>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watch } from 'vue';

export default {
    setup() {
        const route = useRoute();
        const productId = route.params.id;  // الحصول على الـ id من الرابط

        console.log('Product ID:', productId);  // التأكد من الـ ID المستخرج

        // استعلام GraphQL مع متغيرات
        const GET_PRODUCT_DETAILS = gql`
        query($id: ID!) {
          product(id: $id) {
            title
            price
            
          }
        }
      `;

        // استخدام المتغيرات في الاستعلام
        const { result, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
            id: productId
        });

        const product = ref(null);

        // تتبع الاستجابة وتحديث البيانات
        watch(() => result.value, () => {
            if (result.value && result.value.product) {
                product.value = result.value.product;
            } else {
                console.log('No product data available');
            }
        });

        return {
            product,
            loading,
            error
        };
    }
};
</script>

<style scoped></style>