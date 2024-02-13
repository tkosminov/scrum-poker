import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import { currentUser, CurrentUserQuery, userUpdate, UserUpdateMutationVariables } from '../api';

interface IState {
  current_user: CurrentUserQuery['currentUser'] | undefined;
  loading: boolean;
  loading_error: string | undefined;
}

export const useUserModel = defineStore({
  id: 'userModel',
  state: (): IState => ({
    current_user: undefined,
    loading: false,
    loading_error: undefined,
  }),
  actions: {
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
