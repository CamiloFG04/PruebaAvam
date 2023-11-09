import { storeAPI } from '../../api/storeAPI';
import { AxiosError } from 'axios';
import { useQuoteStore } from 'src/stores/useQuote';
import { Client, Clients } from '../interfaces/client';
import { Product, Products } from '../interfaces/product';
import { useAuthStore } from 'src/stores/useAuth';
import { Quote, Quotes } from 'src/auth/interfaces/quotes';

const useQuote = () => {
  const store = useQuoteStore();
  const authStore = useAuthStore();

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

  const addQuote = async (form): Promise<Quote> => {
    const { data } = await storeAPI.post<Quotes>(
      '/store/cotizacion/create',
      form,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(data);

    return data.data;
  };

  return {
    // methods
    getData,
    addQuote,
  };
};

export default useQuote;
