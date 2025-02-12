import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRouter } from 'vue-router';

export const useCartStore = defineStore("cart", () => {
  interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number;

  }
  
  const cart = ref<Product[]>([]);
  const router = useRouter();
  
  try {
    const storedCart = localStorage.getItem("cart");
    cart.value = storedCart ? (JSON.parse(storedCart) as Product[]) : [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
    cart.value = [];
  }
  function addToCart(product: Product) {
    const item = cart.value.find((p: Product) => p.id === product.id);
    if (item) {
      item.quantity = (item.quantity || 0) + 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    saveCart();  
  }

  
  function removeFromCart(productId: number) {
    cart.value = cart.value.filter((p: Product) => p.id !== productId);
  }

  function updateQuantity(productId: number, amount: number) {
    if (isNaN(amount)) return;
    const item = cart.value.find((p: Product) => p.id === productId);
    if (item) {
      item.quantity = Math.max(0, (item.quantity || 0) + amount);
      if (item.quantity === 0) removeFromCart(productId);
    }
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((total: number, item: Product) => {
      return total + (item.price || 0) * (item.quantity || 0);
    }, 0);
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  
  function mainPage() {
    router.push('/');
  }
  
  watch(cart, saveCart, { deep: true });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    saveCart,
    mainPage
  };
});
