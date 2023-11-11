<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Form, ProductoDialog } from '../interfaces/formQuotes';
import { useQuoteStore } from '../../stores/useQuote';
interface Props {
  data: Form;
  isOpen: boolean;
  action: () => void;
}
interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const quoteStore = useQuoteStore();
const open = ref<boolean>();
watch(props, () => {
  open.value = props.isOpen;
});
const productsData = quoteStore.products?.map((producto) => ({
  producto_id: producto.producto_id,
  nombre: producto.nombre,
  img: producto.imagen,
}));
const clienteData = quoteStore.clients?.find(
  (client) => client.cliente_id === props.data.cliente_id
);
const dataFinal = props.data.productos.map((item) => {
  const productoInfo = productsData?.find(
    (producto) => producto.producto_id === item.producto
  );
  if (productoInfo) {
    return {
      producto_id: item.producto,
      nombre: productoInfo.nombre,
      cantidad: item.cantidad,
      valorU: item.valorU,
      ValorT: item.ValorT,
      img: productoInfo.img,
    };
  } else {
    return item;
  }
}) as ProductoDialog[];
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog full-width v-model="open">
      <q-card>
        <q-card-section
          class="row items-center q-pb-sm bg-primary"
          style="color: white"
        >
          <div class="text-h6">Cotización Final</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="emits('onClose')" />
        </q-card-section>
        <q-card-section class="q-pt-md">
          <div class="row">
            <div class="col-md-6">
              <span class="text-h4">
                Cliente: {{ clienteData?.nombre }} {{ clienteData?.apellido }}
              </span>
            </div>
            <div class="col-md-6">
              <p class="text-center">Total</p>
              <div class="borderDiv">
                <p class="text-h4 text-center">{{ props.data.valor }}</p>
              </div>
            </div>
            <div class="col-md-12">
              <q-card-section>
                <div
                  class="row justify-center"
                  v-for="(item, index) in props.data.productos"
                  :key="item.producto"
                >
                  <div class="col-md-3 q-ma-sm">
                    <q-input
                      type="text"
                      filled
                      dense
                      disable
                      v-model="dataFinal[index].nombre"
                      label="Producto"
                      placeholder="Producto"
                      class="q-mb-sm"
                    >
                      <template v-slot:before>
                        <q-avatar>
                          <img
                            :src="
                              dataFinal[index].img !== ''
                                ? dataFinal[index].img
                                : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'
                            "
                          />
                        </q-avatar>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-2 q-ma-sm">
                    <q-input
                      type="number"
                      filled
                      dense
                      disable
                      v-model="dataFinal[index].cantidad"
                      label="Cantidad"
                      placeholder="Cantidad"
                      class="q-mb-sm"
                    />
                  </div>
                  <div class="col-md-1 q-ma-sm">
                    <q-input
                      disable
                      filled
                      dense
                      v-model="dataFinal[index].valorU"
                      label="Valor Unit"
                      placeholder="Valor Unit"
                      class="q-mb-sm"
                    />
                  </div>
                  <div class="col-md-2 q-ma-sm">
                    <q-input
                      disable
                      filled
                      dense
                      v-model="dataFinal[index].ValorT"
                      label="Valor Total"
                      placeholder="Valor Total"
                      class="q-mb-sm"
                    />
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn color="primary" label="Guardar" @click="action()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
