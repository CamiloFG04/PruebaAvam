<script setup lang="ts">
import { ref, watch } from 'vue';
import { Client } from '../interfaces/client';
import { Product } from '../interfaces/product';
import { useQuoteStore } from 'src/stores/useQuote';
import useQuote from '../composables/useQuote';
import { useRouter } from 'vue-router';

interface ClientSelect {
  cliente_id: number;
  nombre: string;
}
interface ProductSelect {
  producto_id: number;
  nombre: string;
}

interface Props {
  clientesProps: ClientSelect[];
  productosProps: ProductSelect[];
}

const props = defineProps<Props>();
const quoteStore = useQuoteStore();
const { addQuote } = useQuote();
const router = useRouter();
const valor = ref<number | undefined>(0);
const fecha = ref<string | undefined>('');
const cliente_id = ref<number | undefined>();
const producto = ref<number>();
const cantidad = ref<number | undefined>();
const valorUnit = ref<number | undefined>(0);
const valorTotal = ref<number | undefined>(0);
const onSubmit = () => {
  const productoJson = [{ id: producto.value, cantidad: cantidad.value }];
  const data = {
    cliente_id: cliente_id.value,
    valor: valor.value,
    fecha: fecha.value,
    productos: productoJson,
  };
  addQuote(data);
};

watch(producto, () => {
  const product = quoteStore.products?.find(
    (pro) => pro.producto_id === producto.value
  );
  console.log(valorUnit.value);

  valorUnit.value = product?.precio;
});

watch(cantidad, () => {
  const product = quoteStore.products?.find(
    (pro) => pro.producto_id === producto.value
  );
  if (product && cantidad.value) {
    valorTotal.value = product.precio * cantidad.value;
  }
  valor.value = valorTotal.value;
});
</script>

<template>
  <div class="q-pa-md" style="max-width: 100%">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row justify-center">
        <div class="col-md-4 q-ma-md">
          <q-select
            v-model="cliente_id"
            :options="props.clientesProps"
            option-value="cliente_id"
            option-label="nombre"
            emit-value
            map-options
            use-input
            label="Cliente"
            use-chips
            filled
            dense
            stack-label
            class="q-mb-sm"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col-md-4 q-ma-md">
          <q-input
            filled
            v-model="fecha"
            mask="date"
            :rules="['date']"
            use-chips
            dense
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="fecha">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-12">
          <q-card class="my-card">
            <q-card-section>
              <div class="row justify-center">
                <div class="col-md-2 q-ma-md">
                  <q-select
                    v-model="producto"
                    :options="props.productosProps"
                    option-value="producto_id"
                    option-label="nombre"
                    emit-value
                    map-options
                    use-input
                    label="Producto"
                    use-chips
                    filled
                    dense
                    stack-label
                    class="q-mb-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
                <div class="col-md-2 q-ma-md">
                  <q-input
                    type="number"
                    filled
                    dense
                    v-model="cantidad"
                    label="Cantidad"
                    placeholder="Cantidad"
                    class="q-mb-sm"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                </div>
                <div class="col-md-2 q-ma-md">
                  <q-input
                    disable
                    filled
                    dense
                    v-model="valorUnit"
                    label="Valor Unit"
                    placeholder="Valor Unit"
                    class="q-mb-sm"
                  />
                </div>
                <div class="col-md-2 q-ma-md">
                  <q-input
                    disable
                    filled
                    dense
                    v-model="valorTotal"
                    label="Valor Total"
                    placeholder="Valor Total"
                    class="q-mb-sm"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <p class="text-h5 text-right">Total: {{ valor }}</p>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="q-mt-sm">
          <q-btn
            class="q-ma-sm"
            label="Cotizar"
            type="button"
            color="primary"
            @click="onSubmit"
          />
          <q-btn
            label="Volver"
            type="button"
            color="info"
            @click="router.push({ name: 'cotizaciones' })"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<style scoped></style>
