import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import {
  rooms,
  RoomsQuery,
  CurrentRoomQuery,
  currentRoom,
  CurrentRoomQueryVariables,
  RoomCreateMutationVariables,
  roomCreate,
  roomUpdate,
  RoomUpdateMutationVariables,
  RoomDeleteMutationVariables,
  roomDelete,
  roomCreateEvent,
} from '../api';

interface IState {
  current_room: CurrentRoomQuery['rooms'][0] | undefined;
  rooms: RoomsQuery['rooms'] | undefined;
  loading: boolean;
  loading_error: string | undefined;
  stoppers: Array<() => void>;
}

export const useRoomModel = defineStore({
  id: 'roomModel',
  state: (): IState => ({
    rooms: undefined,
    current_room: undefined,
    loading: false,
    loading_error: undefined,
    stoppers: [],
  }),
  actions: {
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
    async createRoom(variables: RoomCreateMutationVariables) {
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
    async deleteRoom(variables: RoomDeleteMutationVariables) {
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
    async updateRoom(variables: RoomUpdateMutationVariables) {
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
    unsubscribe() {
      this.stoppers.forEach((stop) => {
        stop();
      });

      this.stoppers = [];
    },
    async roomCreateSubscribe() {
      const { onResult, onError, stop } = await roomCreateEvent({});

      this.stoppers.push(stop);

      onResult(({ data }) => {
        this.rooms?.unshift(data?.roomCreateEvent as RoomsQuery['rooms'][0]);
      });

      onError((error) => {
        console.error(error);
      });
    },
  },
});
