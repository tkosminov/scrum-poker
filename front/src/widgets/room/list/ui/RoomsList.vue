<template>
  <div
    class="row"
    v-for="room in rooms"
    :key="`${room.id}_${room.title}`"
  >
    <div class="col-12 mb-2">
      <RoomCard :room="room" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoomModel, RoomsQuery, RoomCard } from '@/entities';

const room_model = useRoomModel()
const rooms: Ref<RoomsQuery['rooms'] | undefined> = ref(undefined);

room_model.$subscribe((_mutation, state) => {
  rooms.value = state.rooms;
});
</script>

<style scoped lang="scss"></style>
