import { RouteRecordRaw } from 'vue-router';
import authRouter from 'src/auth/router';
import isAuthenticatedGuard from 'src/auth/router/auth-guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    ...authRouter,
  },
  {
    path: '/store',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'cotizaciones',
        component: () => import('src/store/pages/QuotePage.vue'),
      },
      {
        path: 'create',
        name: 'crear-cotizacion',
        component: () => import('src/store/pages/CreateQuotePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/shared/pages/ErrorNotFound.vue'),
  },
];

export default routes;
