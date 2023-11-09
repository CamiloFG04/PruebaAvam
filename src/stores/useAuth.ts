import { defineStore } from 'pinia';
import { Quote, Quotes } from 'src/auth/interfaces/quotes';
import { User } from 'src/auth/interfaces/user';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const status = ref<string>('authenticating');
  const user = ref<User>();
  const quotes = ref<Quote[]>();
  const accessToken = ref<string>();

  return {
    // state
    status,
    user,
    accessToken,
    quotes,

    // getters
    currentState: computed(() => status.value),
    currentUser: computed(() => user.value),

    // actions
    setData(newUser: User, access_token: string, newQuotes: Quote[]) {
      if (access_token) {
        localStorage.setItem('access_token', access_token);
        accessToken.value = access_token;
      }

      user.value = newUser;
      quotes.value = newQuotes;
      status.value = 'authenticated';
    },
    logout() {
      localStorage.removeItem('access_token');
      accessToken.value = undefined;
      user.value = undefined;
      quotes.value = undefined;
      status.value = 'not-authenticated';
    },
  };
});
