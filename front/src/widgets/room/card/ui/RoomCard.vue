<template>
  <div class="row">
    <template v-if="room">
      <div class="col-4 d-none d-sm-none d-md-none d-lg-block"></div>

      <div class="col-12 col-sm-8 col-md-8 col-lg-4">
        <CHr :title="room.title" />
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
import { Ref, ref } from 'vue';
import { RoomDeleteFeature, RoomUpdateFeature, RoomCopyLinkFeature } from '@/features';
import { useRoomModel, CurrentRoomQuery } from '@/entities';
import { CHr } from '@/shared'

const room_model = useRoomModel()
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

room_model.$subscribe(({ events }, state) => {
  let key: string;

  if (Array.isArray(events)) {
    key = events[0].key
  } else {
    key = events.key
  }

  if (key === 'current_room') {
    room.value = state.current_room;
  }
});
</script>

<style scoped lang="scss"></style>
