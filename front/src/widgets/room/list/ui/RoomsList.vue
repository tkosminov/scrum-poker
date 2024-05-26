<template>
  <div
    class="row"
    v-for="room in rooms"
    :key="room.id"
  >
    <div class="col-12 mb-2">
      <RoomCard :room="room" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoomModel } from '@/entities';
import { RoomsQuery, RoomCard } from '@/entities/room';

import { Ref, ref } from 'vue';

const room_model = useRoomModel()
const rooms: Ref<RoomsQuery['rooms'] | undefined> = ref(undefined);

room_model.$subscribe((_mutation, state) => {
  rooms.value = state.rooms;
});
</script>

<style scoped lang="scss"></style>
