import 'vue-toastification/dist/index.css';
import Toast, { POSITION } from 'vue-toastification';

export const toast = {
  plugin: Toast,
  settings: {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 5,
    newestOnTop: true,
    position: POSITION.BOTTOM_RIGHT,
  },
};
