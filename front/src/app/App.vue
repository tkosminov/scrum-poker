<template>
  <div class="container">11</div>
  <div v-for="room in rooms" :key="room.id">{{ room.title }}</div>
</template>

<script setup lang="ts">
import { useRoomModel } from '@/entities';
import { RoomsQuery } from '@/entities/room/api';
import { Ref, onBeforeMount, ref } from 'vue';

const room_model = useRoomModel()
const rooms: Ref<RoomsQuery['rooms'] | undefined> = ref(undefined);

onBeforeMount(async () => {
  await room_model.fetchRooms();
})

room_model.$subscribe((_mutation, state) => {
  rooms.value = state.rooms;
});
</script>

<style scoped lang="scss">
@import "@/app/style.scss";
</style>
