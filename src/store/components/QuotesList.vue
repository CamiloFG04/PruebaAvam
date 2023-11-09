<script setup lang="ts">
import { Cliente, Quote } from 'src/auth/interfaces/quotes';
import { useAuthStore } from 'src/stores/useAuth';

const authStore = useAuthStore();

const columns = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'left',
    field: (row: Quote) => row.cotizacion_id,
    // format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'fecha',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row: Quote) => row.fecha,
    sortable: true,
  },
  {
    name: 'cliente',
    align: 'center',
    label: 'Cliente',
    field: (row: Quote) => row.cliente,
    format: (val: Cliente) => `${val.nombre} ${val.apellido}`,
    sortable: true,
  },
  {
    name: 'valor',
    label: 'Valor ($)',
    field: 'valor',
    format: (val: number) => `$${val}`,
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Acciones',
    field: '',

    sortable: true,
  },
];
const editRow = (props) => {
  console.log(props.row.cliente_id);
};

const deleteRow = (props) => {
  console.log(props);
};
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="authStore.quotes"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            class="q-mr-sm"
            round
            color="primary"
            icon="visibility"
            @click="editRow(props)"
          />
          <q-btn
            round
            color="secondary"
            icon="description"
            @click="deleteRow(props)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped></style>
