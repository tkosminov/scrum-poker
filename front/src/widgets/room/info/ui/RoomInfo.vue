<template>
  <div class="row">
    <template v-if="room">
      <div class="col-4 d-none d-sm-none d-md-none d-lg-block"></div>

      <div class="col-12 col-sm-8 col-md-8 col-lg-4">
        <h1>{{ room.title }}</h1>
      </div>

      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <div class="d-flex justify-content-center gap-1">
          <RoomCopyLinkFeature :room="room" />
          <RoomUpdateFeature :room="room" />
          <RoomDeleteFeature :room="room" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoomModel, CurrentRoomQuery } from '@/entities';
import { RoomDeleteFeature, RoomUpdateFeature, RoomCopyLinkFeature } from '@/features';

import { Ref, ref } from 'vue';

const room_model = useRoomModel()
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

room_model.$subscribe(({ events }, state) => {
  let key: string;
  let type: string;

  if (Array.isArray(events)) {
    key = events[0].key
    type = events[0].type
  } else {
    key = events.key
    type = events.type
  }

  if (key === 'current_room') {
    room.value = state.current_room;
  }
});
</script>

<style scoped lang="scss"></style>
