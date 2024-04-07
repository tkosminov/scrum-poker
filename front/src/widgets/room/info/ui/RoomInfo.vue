<template>
  <div class="row">
    <template v-if="room">
      <div class="col-4 d-flex align-items-center"></div>
      <div class="col-4 d-flex align-items-center">
        <RoomCardDetail :room="room" />
      </div>

      <div class="col-4 d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="features">
          <RoomCardQr :room="room" />
          <RoomUpdateFeature :room="room" />
          <RoomDeleteFeature :room="room" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoomModel } from '@/entities';
import { CurrentRoomQuery, RoomCardDetail, RoomCardQr } from '@/entities/room';
import { RoomDeleteFeature, RoomUpdateFeature } from '@/features';

import { Ref, ref } from 'vue';

const room_model = useRoomModel()
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

room_model.$subscribe((_mutation, state) => {
  room.value = state.current_room;
});
</script>

<style scoped lang="scss"></style>
