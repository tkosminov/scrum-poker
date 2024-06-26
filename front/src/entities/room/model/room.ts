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
  loading_error: string | undefined;
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
    loading_error: undefined,
    rooms: [],
    current_room: undefined,
    deleted_id$: new BehaviorSubject(''),
  }),
  actions: {
    clearState() {
      this.loading = false;
      this.loading_error = undefined;
      this.rooms = [];
      this.current_room = undefined;
    },
    async fetchRooms() {
      this.loading = true;
      this.loading_error = undefined;

      const { loading, result, error } = await rooms({});

      const response = computed(() => result.value?.rooms ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.rooms = response.value;
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async fetchCurrentRoom(variables: CurrentRoomQueryVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { loading, result, error } = await currentRoom(variables);

      const response = computed(() => result.value?.rooms ?? []);

      watch(
        loading,
        (value) => {
          this.loading = value;

          if (!value) {
            this.current_room = response.value?.[0];
            this.loading_error = error.value?.message;
          }
        },
        {
          immediate: true,
        }
      );
    },
    async create(variables: RoomCreateMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await roomCreate(variables);

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
    async update(variables: RoomUpdateMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await roomUpdate(variables);

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
    async delete(variables: RoomDeleteMutationVariables) {
      this.loading = true;
      this.loading_error = undefined;

      const { mutate, loading, error } = await roomDelete(variables);

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
    async createSubscribe() {
      const { onResult, onError, stop } = await roomCreateEvent({});

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.rooms.unshift(data!.roomCreateEvent as RoomsQuery['rooms'][0]);
      });

      onError((error) => {
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
      });

      onError((error) => {
        console.error(error);
      });
    },
  },
});
