import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { BehaviorSubject } from 'rxjs';

import {
  rooms,
  type RoomsQuery,
  currentRoom,
  type CurrentRoomQuery,
  type CurrentRoomQueryVariables,
  roomCreate,
  type RoomCreateMutationVariables,
  roomUpdate,
  type RoomUpdateMutationVariables,
  roomDelete,
  type RoomDeleteMutationVariables,
  roomCreateEvent,
  roomDeleteEvent,
  type RoomDeleteEventSubscriptionVariables,
  roomUpdateEvent,
  type RoomUpdateEventSubscriptionVariables,
} from '../api';

interface IState {
  loading: boolean;
  query_error: string | undefined;
  mutation_error: string | undefined;
  subscription_error: string | undefined;
  stoppers: Array<() => void>;
  rooms: RoomsQuery['rooms'];
  current_room: CurrentRoomQuery['rooms'][0] | undefined;
  deleted_id$: BehaviorSubject<string>;
}

export const useRoomModel = defineStore({
  id: 'roomModel',
  state: (): IState => ({
    stoppers: [],
    loading: false,
    query_error: undefined,
    mutation_error: undefined,
    subscription_error: undefined,
    rooms: [],
    current_room: undefined,
    deleted_id$: new BehaviorSubject(''),
  }),
  actions: {
    clearState() {
      this.loading = false;
      this.query_error = undefined;
      this.mutation_error = undefined;
      this.subscription_error = undefined;
      this.rooms = [];
      this.current_room = undefined;
      this.deleted_id$.next('');
    },
    changeCurrentTaskId(task_id: string | null) {
      if (this.current_room) {
        this.current_room.current_task_id = task_id;
      }
    },
    async fetchRooms() {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await rooms({});

      const response = computed(() => result.value?.rooms ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.rooms = response.value;
            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async fetchCurrentRoom(variables: CurrentRoomQueryVariables) {
      this.loading = true;
      this.query_error = undefined;

      const { loading, result, error } = await currentRoom(variables);

      const response = computed(() => result.value?.rooms ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.current_room = response.value?.[0];
            this.query_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async create(variables: RoomCreateMutationVariables) {
      const { mutate, onDone, onError } = await roomCreate(variables);

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
    async update(variables: RoomUpdateMutationVariables) {
      const { mutate, onDone, onError } = await roomUpdate(variables);

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
    async delete(variables: RoomDeleteMutationVariables) {
      const { mutate, onDone, onError } = await roomDelete(variables);

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
    async createSubscribe() {
      const { onResult, onError, stop } = await roomCreateEvent({});

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.rooms.unshift(data!.roomCreateEvent as RoomsQuery['rooms'][0]);
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
    async updateSubscribe(variables: RoomUpdateEventSubscriptionVariables) {
      const { onResult, onError, stop } = await roomUpdateEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const idx = this.rooms.findIndex((r) => r.id === data!.roomUpdateEvent.id);

        if (idx !== -1) {
          this.rooms[idx].title = data!.roomUpdateEvent.title;
        }

        if (this.current_room?.id === data!.roomUpdateEvent.id) {
          this.current_room.title = data!.roomUpdateEvent.title;
        }
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
    async deleteSubscribe(variables: RoomDeleteEventSubscriptionVariables) {
      const { onResult, onError, stop } = await roomDeleteEvent(variables);

      this.stoppers.push(stop);

      onResult(({ data }) => {
        const idx = this.rooms.findIndex((r) => r.id === data!.roomDeleteEvent.id);

        if (idx !== -1) {
          this.rooms.splice(idx, 1);
        }

        this.deleted_id$.next(data!.roomDeleteEvent.id);
        this.deleted_id$.next('');
      });

      onError((error) => {
        this.subscription_error = error.message;

        console.error(error);
      });
    },
  },
});
