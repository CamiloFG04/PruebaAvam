<script setup lang="ts">
import CreateQuote from '../components/CreateQuote.vue';
import useQuote from '../composables/useQuote';
import { useQuoteStore } from 'src/stores/useQuote';
const { getData } = useQuote();
const quoteStore = useQuoteStore();
getData();
</script>

<template>
  <CreateQuote
    :clientes-props="
      quoteStore.clients?.map((cliente) => ({
        cliente_id: cliente.cliente_id,
        nombre: `${cliente.nombre} ${cliente.apellido}`,
      })) || []
    "
    :productos-props="
      quoteStore.products?.map((producto) => ({
        producto_id: producto.producto_id,
        nombre: producto.nombre,
      })) || []
    "
  />
</template>

<style scoped></style>
