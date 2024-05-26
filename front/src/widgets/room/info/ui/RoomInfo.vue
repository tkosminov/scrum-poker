<template>
  <div class="row">
    <template v-if="room">
      <div class="col-2 d-none d-sm-none d-md-block"></div>

      <div class="col-8 col-sm-8 col-md-7">
        <RoomCardDetail :room="room" />
      </div>

      <div class="col-4 col-sm-4 col-md-3">
        <div class="btn-toolbar" role="toolbar" aria-label="room actions">
          <div class="btn-group" role="group" aria-label="copy">
            <RoomCardCopy :room="room" />
          </div>
          <div class="btn-group" role="group" aria-label="update">
            <RoomUpdateFeature :room="room" />
          </div>
          <div class="btn-group" role="group" aria-label="delete">
            <RoomDeleteFeature :room="room" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoomModel, CurrentRoomQuery, RoomCardDetail, RoomCardCopy } from '@/entities';
import { RoomDeleteFeature, RoomUpdateFeature } from '@/features';

import { Ref, ref } from 'vue';

const room_model = useRoomModel()
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

room_model.$subscribe((_mutation, state) => {
  room.value = state.current_room;
});
</script>

<style scoped lang="scss"></style>
