import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { gql } from "@apollo/client/core";
import { ref, watch, onMounted, watchEffect } from 'vue';

export const useProductStore = defineStore('product', () => {
  const route = useRoute();
  const router = useRouter();
  const productId = ref(route.params.id); 

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
  });

  const product = ref(null);

  
  watch(
    () => route.params.id, 
    (newId) => {
      productId.value = newId;
      refetch({ id: newId });
    }
  );

  
  watchEffect(() => {
    if (result.value && result.value.product) {
      product.value = result.value.product;
    }
  });

  const cart = ref([]);

  onMounted(() => {
    
    const routeId = route.params.id;
    if (routeId) {
      productId.value = routeId;
    }

    
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart.value = JSON.parse(storedCart);
    }
  });

  
  function addToCart() {
    if (product.value) {
      cart.value.push(product.value);
      localStorage.setItem('cart', JSON.stringify(cart.value));
      router.push('/cart');
    }
  }

  
  function mainPage() {
    router.push('/');
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
