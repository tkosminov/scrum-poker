import { createApp } from 'vue';

import App from './App.vue';
export const app = createApp(App);

import {
  router,
  store,
  apollo_client,
  DefaultApolloClient,
  provideApolloClients,
  toast,
  i18n,
  vuetify,
} from './providers';

provideApolloClients({ default: apollo_client });
app.provide(DefaultApolloClient, apollo_client);
app.use(router);
app.use(store);
app.use(toast.plugin, toast.settings);
app.use(i18n);
app.use(vuetify);
