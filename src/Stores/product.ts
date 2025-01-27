import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watch, onMounted, watchEffect } from 'vue';

export const useProductStore = defineStore('product', () => {
  const route = useRoute();
  const router = useRouter();
  const productId = ref(route.params.id); // المعرف من الرابط

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

  const { result, refetch, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    id: productId.value || '',
    skip: !productId.value,
  });

  console.log('productId++', productId);

  const product = ref(null);

  // مراقبة تغيير المعرف في الرابط
  watch(
    () => route.params.id, // المراقبة للـ id
    (newId) => {
      // عند التغيير في الـ id
      productId.value = newId; // تحديث الـ productId
      console.log('Product ID updated:', newId);
      // إعادة تنفيذ الاستعلام مع الـ id الجديد
      refetch({
        id: newId,
        skip: !newId, // إذا كان المعرف فارغًا، يتم تخطي الاستعلام
      });
    }
  );

  // مراقبة نتائج الاستعلام وتحديث المنتج
  watchEffect(() => {
    if (result.value) {
      console.log('Query result:', result.value);
      if (result.value.product) {
        product.value = result.value.product;
        console.log('Product data:', product.value);
      } else {
        console.log('No product data available');
      }
    } else {
      console.log('Result is empty or loading...');
    }
  });

  const cart = ref([]);

  // عند تحميل الصفحة لأول مرة
  onMounted(() => {
    const routeId = route.params.id;
    if (routeId) {
      productId.value = routeId; // تعيين قيمة المعرف إذا كان موجودًا
      console.log('Product ID on mounted:', productId.value);
    } else {
      console.log('No product ID found in the route');
    }

    // استرجاع السلة من localStorage عند تحميل الصفحة
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart.value = JSON.parse(storedCart);
      console.log('Loaded cart from localStorage:', cart.value);
    } else {
      console.log('No cart found in localStorage');
    }
  });

  function addToCart() {
    // إضافة المنتج إلى السلة
    cart.value.push(product?.value);
    console.log('Product added to cart:', product?.value);

    // تخزين السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart.value));
    console.log('Cart saved to localStorage');

    router.push('/cart');
  }

  // دالة للعودة إلى الصفحة الرئيسية
  function mainPage() {
    const main = '/';

    // التأكد من وجود معرّف صالح للمنتج قبل إعادة التوجيه
    if (productId.value) {
      router.push(main);
    } else {
      console.log('No product ID found. Redirecting to home.');
      router.push(main);
    }
  }

  if (error.value) {
    console.log('GraphQL Error:', error.value.message);
  }

  return {
    product,
    cart,
    addToCart,
    mainPage,
    loading,
    error,
  };
});
