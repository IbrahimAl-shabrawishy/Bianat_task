import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watch, onMounted ,watchEffect} from 'vue';

export const useProductStore = defineStore('product', () => {
  const route = useRoute();
  const productId = ref(route.params.id);  // المعرف من الرابط

  // استعلام GraphQL لجلب تفاصيل المنتج
  const GET_PRODUCT_DETAILS = gql`
    query($id: ID!) {
      product(id: $id) {
        title
        price
        images
        description
      }
    }
  `;

  // استخدام useQuery لجلب البيانات
  const { result, refetch } = useQuery(GET_PRODUCT_DETAILS, {
    id: productId.value,
  });

  const product = ref(null);

  // مراقبة التغييرات في المعرف وتحديث الاستعلام
  watch(
    () => route.params.id,  // المراقبة للـ id
    (newId) => {             // عند التغيير في الـ id
      refetch({ id: newId }); // إعادة تنفيذ الاستعلام مع الـ id الجديد
    }
  );
  
  // مراقبة نتائج الاستعلام وتحديث المنتج
  watchEffect(() => {
    if (result.value && result.value.product) {
      product.value = result.value.product;
    } else {
      console.log('No product data available');
    }
  });

  // عند تحميل الصفحة لأول مرة
  onMounted(() => {
    console.log('Product ID on mounted:', productId.value);
  });

  return {
    product,
    
  };
});
