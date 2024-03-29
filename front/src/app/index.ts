import { createApp } from 'vue';

import App from './App.vue';
export const app = createApp(App);

import {
  router,
  store,
  apollo_client,
  DefaultApolloClient,
  provideApolloClients,
  FloatingVue,
  toast,
} from './providers';

provideApolloClients({ default: apollo_client });
app.provide(DefaultApolloClient, apollo_client);
app.use(router);
app.use(store);
app.use(FloatingVue);
app.use(toast.plugin, toast.settings);
