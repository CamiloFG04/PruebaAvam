<script setup lang="ts">
import useQuote from '../composables/useQuote';
import { useRouter } from 'vue-router';
import DialogQuote from './DialogQuote.vue';
import Swal from 'sweetalert2';
import useAuth from 'src/auth/composables/useAuth';

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
const {
  valor,
  fecha,
  cliente_id,
  dataProduct,
  data,
  isOpen,
  areData,
  onDialog,
  addQuote,
} = useQuote();
const router = useRouter();
const { getNewQuotes } = useAuth();

const onSubmit = async () => {
  isOpen.value = false;
  if (data.value) {
    const resp = await addQuote(data.value);
    if (resp.success) {
      valor.value = 0;
      fecha.value = '';
      cliente_id.value = null;
      dataProduct.value = [
        {
          producto: null,
          cantidad: 0,
          valorU: 0,
          valorT: 0,
        },
        {
          producto: null,
          cantidad: 0,
          valorU: 0,
          valorT: 0,
        },
        {
          producto: null,
          cantidad: 0,
          valorU: 0,
          valorT: 0,
        },
        {
          producto: null,
          cantidad: 0,
          valorU: 0,
          valorT: 0,
        },
        {
          producto: null,
          cantidad: 0,
          valorU: 0,
          valorT: 0,
        },
      ];
      Swal.fire('OK!', 'Cotización guardada correctamente', 'success');
    } else {
      Swal.fire('Error', 'Error interno', 'error');
    }
  } else {
    Swal.fire('Error', 'Error interno', 'error');
  }
};

const goBack = () => {
  getNewQuotes();
  router.push({ name: 'cotizaciones' });
};
</script>

<template>
  <div class="q-pa-md" style="max-width: 100%">
    <q-form class="q-gutter-md">
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
          />
        </div>
        <div class="col-md-4 q-ma-md">
          <q-input filled v-model="fecha" mask="date" use-chips dense>
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
              <div
                class="row justify-center"
                v-for="(item, index) in props.productosProps"
                :key="item.producto_id"
              >
                <div class="col-md-3 q-ma-sm">
                  <q-select
                    v-model="dataProduct[index].producto"
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
                  />
                </div>
                <div class="col-md-2 q-ma-sm">
                  <q-input
                    type="number"
                    filled
                    dense
                    v-model="dataProduct[index].cantidad"
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
                    v-model="dataProduct[index].valorU"
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
                    v-model="dataProduct[index].valorT"
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
            @click="onDialog"
          />
          <q-btn label="Volver" type="button" color="info" @click="goBack" />
        </div>
      </div>
    </q-form>
  </div>
  <dialog-quote
    v-if="areData"
    :data="data!"
    :action="onSubmit"
    :is-open="isOpen"
    @on-close="isOpen = false"
  />
</template>

<style scoped></style>
