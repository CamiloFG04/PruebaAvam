import { defineStore } from 'pinia';
import { Quote } from 'src/auth/interfaces/quotes';
import { Client } from 'src/store/interfaces/client';
import { Product } from 'src/store/interfaces/product';
import { computed, ref } from 'vue';

export const useQuoteStore = defineStore('quote', () => {
  const isLoading = ref<boolean>(true);
  const quote = ref<Quote>();
  const clients = ref<Client[]>();
  const products = ref<Product[]>();

  return {
    // state
    isLoading,
    quote,
    clients,
    products,

    // getters
    currentQuote: computed(() => quote.value),
    getClients: computed(() => clients.value),
    getProducts: computed(() => products.value),

    // actions
    setData(newClients: Client[], newProducts: Product[]) {
      clients.value = newClients;
      products.value = newProducts;
    },
  };
});
