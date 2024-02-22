<template>
  <div class="row">
    <div class="col-4">1</div>
    <div class="col-4">
      <template v-if="room">
        <RoomCardDetail :room="room" />
      </template>
    </div>
    <div class="col-4">3</div>
  </div>
</template>

<script setup lang="ts">
import { useRoomModel } from '@/entities';
import { CurrentRoomQuery, RoomCardDetail } from '@/entities/room';

import { Ref, ref } from 'vue';

const room_model = useRoomModel()
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

room_model.$subscribe((_mutation, state) => {
  room.value = state.current_room;
});
</script>

<style scoped lang="scss"></style>
