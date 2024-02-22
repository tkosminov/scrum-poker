import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
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
