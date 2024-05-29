import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: 'sign-in',
    path: '/sign-in',
    props: true,
    component: () => import('@/pages/sign-in'),
  },
  {
    name: 'rooms',
    path: '/',
    component: () => import('@/pages/rooms'),
  },
  {
    name: 'room',
    path: '/:id',
    props: true,
    component: () => import('@/pages/room'),
  },
];
