export { DefaultApolloClient, provideApolloClients } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { getAccessToken } from '@/shared';

const http_link = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API}/${import.meta.env.VITE_APP_API_PATH}`,
});

const cache = new InMemoryCache();

const ws_link = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_APP_API_SOCKET}/${import.meta.env.VITE_APP_API_SOCKET_PATH}`,
    connectionParams: {
      authToken: getAccessToken(),
    },
    retryWait: () =>
      new Promise((resolve, _reject) => {
        setTimeout(resolve, 1000);
      }),
    shouldRetry: () => true,
    retryAttempts: Infinity,
    lazy: true,
    lazyCloseTimeout: 2500,
  })
);

const split_link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  ws_link,
  http_link
);

export const apollo_client = new ApolloClient({
  link: split_link,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
