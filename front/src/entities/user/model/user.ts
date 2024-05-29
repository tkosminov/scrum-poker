import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { AxiosError } from 'axios';

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
  CurrentUserQuery,
  refreshToken,
  signIn,
  userUpdate,
  UserUpdateMutationVariables,
  type ISignInResponse,
} from '../api';

interface IState {
  current_user: CurrentUserQuery['currentUser'] | undefined;
  loading: boolean;
  loading_error: string | undefined;
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
    loading_error: undefined,
  }),
  actions: {
    async signIn(name: string) {
      this.loading = true;
      this.loading_error = undefined;

      try {
        const { data: res } = await signIn(name);

        setTokens(res);

        await this.fetchCurrentUser();
      } catch (error: any) {
        clearTokens();

        this.loading_error = error.message;
        this.loading = false;
      }
    },
    async refreshToken() {
      this.loading = true;
      this.loading_error = undefined;

      try {
        const token = getRefreshToken();
        const { data: res } = await refreshToken(token);

        setTokens(res);

        await this.fetchCurrentUser();
      } catch (error: any) {
        clearTokens();

        this.loading_error = error.message;
        this.loading = false;
      }
    },
    async fetchCurrentUser() {
      this.loading = true;
      this.loading_error = undefined;

      const { loading, result, error } = await currentUser({});

      const response = computed(() => result.value?.currentUser ?? undefined);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.current_user = response.value;
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async update(variables: UserUpdateMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await userUpdate(variables);

      const response = await mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            if (response?.data?.userUpdate && this.current_user) {
              this.current_user.name = response.data.userUpdate.name;
            }

            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );

      return response?.data?.userUpdate;
    },
  },
});
