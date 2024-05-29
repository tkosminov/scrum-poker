import { createRouter, createWebHistory } from 'vue-router';

import { existsRefreshToken } from '@/shared/api';

import { routes } from './routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ left: 0, top: 0 });
        }
      }, 250);
    });
  },
  routes,
});

router.beforeResolve((to, _from, next) => {
  if (to.name !== 'sign-in' && !existsRefreshToken()) {
    next({
      name: 'sign-in',
      query: { redirect_to: to.fullPath },
    });
  } else {
    next();
  }
});
