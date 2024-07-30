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
import { type Ref, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { RoomDeleteFeature, RoomUpdateFeature, RoomCopyLinkFeature } from '@/features';
import { useRoomModel, CurrentRoomQuery } from '@/entities';
import { CHr } from '@/shared'

const room_model = useRoomModel()
const { current_room } = storeToRefs(room_model)
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

watch(
  () => current_room.value,
  (curr_current_room, _prev_current_room) => {
    room.value = curr_current_room;
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss"></style>
