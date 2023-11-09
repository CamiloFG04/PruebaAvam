import { useAuthStore } from 'src/stores/useAuth';

import { storeAPI } from '../../api/storeAPI';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { Quotes } from '../interfaces/quotes';

const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();

  const login = async (
    email: string,
    password: string
  ): Promise<Response | Error> => {
    try {
      const { data } = await storeAPI.post<Response>('/auth/login', {
        email,
        password,
      });

      if (data.access_token) {
        const response = await storeAPI.post<User>(
          '/auth/me',
          {},
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );

        const quotes = await getQuotes(data.access_token);
        console.log(quotes);

        store.setData(response.data, data.access_token, quotes.data);
      }

      return data;
    } catch (error) {
      return error as AxiosError;
    }
  };

  const getQuotes = async (access_token: string): Promise<Quotes> => {
    const { data } = await storeAPI.get<Quotes>('/store/cotizaciones', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  };

  const onSubmit = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response instanceof AxiosError) {
        Swal.fire('Error', response.response?.data.error, 'error');
      } else {
        router.push({ name: 'cotizaciones' });
      }
    } catch (error) {
      Swal.fire('Error', 'Error inesperado', 'error');
    }
  };

  const checkAuthentication = async () => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      store.logout();
      return { success: false, message: 'No estas autorizado' };
    }
    const { data } = await storeAPI.post<User>(
      '/auth/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const quotes = await getQuotes(access_token);
    store.setData(data, access_token, quotes.data);
    return { success: true, message: 'Usuario autenticado' };
  };

  return {
    // methods
    onSubmit,
    checkAuthentication,
  };
};

export default useAuth;
