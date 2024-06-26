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
  loading_error: string | undefined;
  stoppers: Array<() => void>;
  room_users: RoomUsersQuery['roomUsers'];
  deleted_id$: BehaviorSubject<string>;
}

export const useRoomUserModel = defineStore({
  id: 'roomUserModel',
  state: (): IState => ({
    stoppers: [],
    loading: false,
    loading_error: undefined,
    room_users: [],
    deleted_id$: new BehaviorSubject(''),
  }),
  actions: {
    clearState() {
      this.loading = false;
      this.loading_error = undefined;
      this.room_users = [];
    },
    async fetchRoomUsers(variables: RoomUsersQueryVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { loading, result, error } = await roomUsers(variables);

      const response = computed(() => result.value?.roomUsers ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.room_users = response.value;
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async roomUserJoin(variables: RoomUserJoinMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await roomUserJoin(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async roomUserLeave(variables: RoomUserLeaveMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await roomUserLeave(variables);

      mutate();

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
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
          this.room_users.unshift(data!.roomUserJoinEvent as RoomUsersQuery['roomUsers'][0]);
        }
      });

      onError((error) => {
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
      });

      onError((error) => {
        console.error(error);
      });
    },
  },
});
