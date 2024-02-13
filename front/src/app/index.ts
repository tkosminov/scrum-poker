import { createApp } from 'vue';

import 'bootstrap';

import App from './App.vue';
export const app = createApp(App);

export { DefaultApolloClient } from '@vue/apollo-composable';

import { router, store, apollo_client, DefaultApolloClient } from './providers';
// app.use(router);
app.use(store);
app.provide(DefaultApolloClient, apollo_client);
