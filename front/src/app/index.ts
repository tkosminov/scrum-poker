import { createApp } from 'vue';

import App from './App.vue';
export const app = createApp(App);

import { router, store, apollo_client, DefaultApolloClient } from './providers';
app.use(router);
app.use(store);
app.provide(DefaultApolloClient, apollo_client);
