<script setup>
import FloatingButtons from 'src/shared/components/FloatingButtons.vue';
import QuotesList from '../components/QuotesList.vue';
import { Size } from 'src/shared/interfaces/button';
import { useRouter } from 'vue-router';
const router = useRouter();
const createQuote = () => {
  router.push({ name: 'crear-cotizacion' });
};
</script>

<template>
  <QuotesList />
  <FloatingButtons
    :buttons="[
      {
        icon: 'add',
        color: 'primary',
        size: Size.lg,
        action: createQuote,
      },
    ]"
  />
</template>

<style lang="scss" scoped></style>
