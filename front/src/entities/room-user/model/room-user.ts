import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { BehaviorSubject } from 'rxjs';

import {
  roomUsers,
  type RoomUsersQuery,
  type RoomUsersQueryVariables,
  roomUserJoin,
  type RoomUserJoinMutationVariables,
  roomUserLeave,
  type RoomUserLeaveMutationVariables,
  roomUserJoinEvent,
  type RoomUserJoinEventSubscriptionVariables,
  roomUserLeaveEvent,
  type RoomUserLeaveEventSubscriptionVariables,
} from '../api';

interface IState {
  loading: boolean;
  query_error: string | undefined;
  mutation_error: string | undefined;
  subscription_error: string | undefined;
  stoppers: Array<() => void>;
  room_users: RoomUsersQuery['roomUsers'];
  deleted_id$: BehaviorSubject<string>;
}

export const useRoomUserModel = defineStore({
  id: 'roomUserModel',
  state: (): IState => ({
    stoppers: [],
    loading: false,
    query_error: undefined,
    mutation_error: undefined,
    subscription_error: undefined,
    room_users: [],
    deleted_id$: new BehaviorSubject(''),
  }),
  actions: {
    clearState() {
      this.loading = false;
      this.query_error = undefined;
      this.mutation_error = undefined;
      this.subscription_error = undefined;
      this.room_users = [];
      this.deleted_id$.next('');
    },
    async fetchRoomUsers(variables: RoomUsersQueryVariables) {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await roomUsers(variables);

      const response = computed(() => result.value?.roomUsers ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.room_users = response.value;
            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async roomUserJoin(variables: RoomUserJoinMutationVariables) {
      const { mutate, onDone, onError } = await roomUserJoin(variables);

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
    async roomUserLeave(variables: RoomUserLeaveMutationVariables) {
      const { mutate, onDone, onError } = await roomUserLeave(variables);

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
    unsubscribe() {
      this.stoppers.forEach((stop) => {
        stop();
      });

      this.stoppers = [];
    },
    async roomUserJoinSubscribe(variables: RoomUserJoinEventSubscriptionVariables) {
      const { onResult, onError, stop } = await roomUserJoinEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const not_exists = this.room_users.findIndex((ru) => ru.id === data!.roomUserJoinEvent.id) === -1;

        if (not_exists) {
          this.room_users.push(data!.roomUserJoinEvent as RoomUsersQuery['roomUsers'][0]);
        }
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
    async roomUserLeaveSubscribe(variables: RoomUserLeaveEventSubscriptionVariables) {
      const { onResult, onError, stop } = await roomUserLeaveEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const idx = this.room_users.findIndex((ru) => ru.id === data!.roomUserLeaveEvent.id);

        if (idx !== -1) {
          this.room_users.splice(idx, 1);
        }

        this.deleted_id$.next(data!.roomUserLeaveEvent.user_id);
        this.deleted_id$.next('');
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
  },
});
