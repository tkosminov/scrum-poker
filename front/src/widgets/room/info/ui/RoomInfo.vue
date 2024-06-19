<template>
  <div class="row">
    <template v-if="room">
      <div class="col-4 d-none d-sm-none d-md-none d-lg-block"></div>

      <div class="col-12 col-sm-8 col-md-8 col-lg-4">
        <RoomCardDetail :room="room" />
      </div>

      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <div class="d-flex justify-content-center gap-1">
          <RoomCardLink :room="room" />
          <RoomUpdateFeature :room="room" />
          <RoomDeleteFeature :room="room" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoomModel, CurrentRoomQuery, RoomCardDetail, RoomCardLink } from '@/entities';
import { RoomDeleteFeature, RoomUpdateFeature } from '@/features';

import { Ref, ref } from 'vue';

const room_model = useRoomModel()
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

room_model.$subscribe((_mutation, state) => {
  room.value = state.current_room;
});
</script>

<style scoped lang="scss"></style>
