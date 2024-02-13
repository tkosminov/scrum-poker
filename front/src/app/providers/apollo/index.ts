export { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const http_link = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API}/${import.meta.env.VITE_APP_API_PATH}`,
});

const cache = new InMemoryCache();

const ws_link = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_APP_API_SOCKET}/${import.meta.env.VITE_APP_API_SOCKET_PATH}`,
    retryWait: () =>
      new Promise((resolve, _reject) => {
        setTimeout(resolve, 2000);
      }),
    shouldRetry: () => true,
    retryAttempts: 5,
    lazy: true,
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
