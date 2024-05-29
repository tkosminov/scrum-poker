import { useQuery, useMutation, useSubscription } from '@vue/apollo-composable';
import { DocumentNode } from '@apollo/client';

import { getAccessToken } from './jwt';

export async function query<T>(
  query: DocumentNode,
  variables: Record<string, unknown>,
  headers: Record<string, unknown> = {}
) {
  return useQuery<T>(query, variables, {
    context: { headers: { authorization: getAccessToken(), ...headers } },
  });
}

export async function mutation<T>(
  query: DocumentNode,
  variables: Record<string, unknown>,
  headers: Record<string, unknown> = {}
) {
  return useMutation<T>(query, {
    variables,
    context: { headers: { authorization: getAccessToken(), ...headers } },
  });
}

export async function subscription<T>(
  query: DocumentNode,
  variables: Record<string, unknown>,
  headers: Record<string, unknown> = {}
) {
  return useSubscription<T>(query, variables, {
    context: { headers: { authorization: getAccessToken(), ...headers } },
  });
}
