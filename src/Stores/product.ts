import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
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
    skip: !productId.value,
  });

  console.log('productId++', productId);

  const product = ref(null);

  watch(
    () => route.params.id, 
    (newId) => {
      
      productId.value = newId;
      console.log('Product ID updated:', newId);
      
      refetch({
        id: newId,
        skip: !newId, 
      });
    }
  );

  
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

  
  onMounted(() => {
    const routeId = route.params.id;
    if (routeId) {
      productId.value = routeId; 
      console.log('Product ID on mounted:', productId.value);
    } else {
      console.log('No product ID found in the route');
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart.value = JSON.parse(storedCart);
      console.log('Loaded cart from localStorage:', cart.value);
    } else {
      console.log('No cart found in localStorage');
    }
  });

  function addToCart() {
    
    cart.value.push(product?.value);
    console.log('Product added to cart:', product?.value);

    
    localStorage.setItem('cart', JSON.stringify(cart.value));
    console.log('Cart saved to localStorage');

    router.push('/cart');
  }





















  
  function mainPage() {
    const main = '/';

    
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
