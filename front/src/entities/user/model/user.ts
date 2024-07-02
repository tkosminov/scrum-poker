import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import {
  setAccessToken,
  setAccessTokenExpiresIn,
  setRefreshToken,
  setRefreshTokenExpiresIn,
  getRefreshToken,
  clearTokens,
} from '@/shared';

import {
  currentUser,
  type CurrentUserQuery,
  userUpdate,
  type UserUpdateMutationVariables,
  signIn,
  refreshToken,
  type ISignInResponse,
} from '../api';

interface IState {
  current_user: CurrentUserQuery['currentUser'] | undefined;
  loading: boolean;
  rest_error: string | undefined;
  query_error: string | undefined;
  mutation_error: string | undefined;
  subscription_error: string | undefined;
}

function setTokens(data: ISignInResponse) {
  setAccessToken(data.access_token);
  setAccessTokenExpiresIn(data.access_token_expires_at);
  setRefreshToken(data.refresh_token);
  setRefreshTokenExpiresIn(data.refresh_token_expires_at);
}

export const useUserModel = defineStore({
  id: 'userModel',
  state: (): IState => ({
    current_user: undefined,
    loading: false,
    rest_error: undefined,
    query_error: undefined,
    mutation_error: undefined,
    subscription_error: undefined,
  }),
  actions: {
    async signIn(name: string) {
      this.loading = true;
      this.rest_error = undefined;

      try {
        const { data: res } = await signIn(name);

        setTokens(res);

        await this.fetchCurrentUser();
      } catch (error: any) {
        clearTokens();

        this.rest_error = error.message;
        this.loading = false;
      }
    },
    async refreshToken() {
      this.loading = true;
      this.rest_error = undefined;

      try {
        const token = getRefreshToken();
        const { data: res } = await refreshToken(token);

        setTokens(res);

        await this.fetchCurrentUser();
      } catch (error: any) {
        clearTokens();

        this.rest_error = error.message;
        this.loading = false;
      }
    },
    async fetchCurrentUser() {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await currentUser({});

      const response = computed(() => result.value?.currentUser ?? undefined);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.current_user = response.value;
            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async update(variables: UserUpdateMutationVariables) {
      const { mutate, onDone, onError } = await userUpdate(variables);

      mutate();

      return new Promise((resolve, reject) => {
        onDone(() => {
          this.mutation_error = undefined;

          resolve(null);
        });

        onError((error) => {
          let message: string = '';

          error.graphQLErrors.forEach((gql_err) => {
            message += (gql_err.extensions.originalError as { message: string[] }).message.join('; ');
          });

          this.mutation_error = message;

          reject(new Error(this.mutation_error));
        });
      });
    },
  },
});
