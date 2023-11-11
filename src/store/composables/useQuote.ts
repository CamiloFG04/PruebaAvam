import { ref, toRef, watch } from 'vue';
import { storeAPI } from '../../api/storeAPI';
import { useQuoteStore } from 'src/stores/useQuote';
import { Client, Clients } from '../interfaces/client';
import { Product, Products } from '../interfaces/product';
import { useAuthStore } from 'src/stores/useAuth';
import { Quote, Quotes } from 'src/auth/interfaces/quotes';
import { Form, Producto } from '../interfaces/formQuotes';
import Swal from 'sweetalert2';

const useQuote = () => {
  const store = useQuoteStore();
  const authStore = useAuthStore();
  const valor = ref<number>(0);
  const fecha = ref<string>('');
  const cliente_id = ref<number | null>();
  const dataProduct = ref([
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
  ]);
  const data = ref<Form>();
  const isOpen = ref<boolean>(false);
  const areData = ref<boolean>(false);

  watch(dataProduct.value, () => {
    valor.value = 0;
    let valorTotal = 0;
    for (let i = 0; i < dataProduct.value.length; i++) {
      const item = dataProduct.value[i];
      if (item.producto !== null) {
        const product = store.products?.find(
          (pro) => pro.producto_id === item.producto
        );
        if (product) {
          item.valorU = product?.precio || 0;
          if (item.cantidad !== 0) {
            const total = product.precio * item.cantidad;
            item.valorT = +total.toFixed(2);
          }
        }
        valorTotal += +item.valorT;
      }
    }
    valor.value = +valorTotal.toFixed(2);
  });

  const getData = async () => {
    const clients = await getClients();
    const products = await getProducts();
    store.setData(clients, products);
  };
  const accessToken = authStore.accessToken;

  const getProducts = async (): Promise<Product[]> => {
    const { data } = await storeAPI.get<Products>('/store/productos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  };

  const getClients = async (): Promise<Client[]> => {
    const { data } = await storeAPI.get<Clients>('/store/clientes', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  };

  const onDialog = () => {
    const productoJson = dataProduct.value
      .map((pro) => {
        if (pro && pro.producto !== null && pro.cantidad > 0) {
          return {
            producto: pro.producto,
            cantidad: pro.cantidad,
            valorU: pro.valorU, // Asigna el valor deseado a valorU
            ValorT: pro.valorT, // Asigna el valor deseado a ValorT
          };
        }
        return null;
      })
      .filter((item) => item !== null) as Producto[];

    data.value = {
      cliente_id: cliente_id.value || 0,
      valor: valor.value,
      fecha: fecha.value,
      productos: productoJson,
    };
    if (data.value.cliente_id === 0) {
      Swal.fire('Error', 'Es necesario agregar el cliente', 'error');
    } else if (data.value.fecha === '') {
      Swal.fire('Error', 'Es necesario una fecha', 'error');
    } else if (data.value.productos.length === 0) {
      Swal.fire('Error', 'Es necesario por lo menos un producto', 'error');
    } else {
      areData.value = true;
      isOpen.value = true;
    }
  };

  const addQuote = async (form: Form): Promise<Quotes> => {
    console.log(form);

    const { data } = await storeAPI.post<Quotes>(
      '/store/cotizacion/create',
      form,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  };

  return {
    // methods
    getData,
    addQuote,
    valor,
    fecha,
    cliente_id,
    dataProduct,
    data,
    isOpen,
    areData,
    onDialog,
  };
};

export default useQuote;
