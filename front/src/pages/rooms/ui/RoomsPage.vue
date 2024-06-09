<template>
    <template v-if="room_model.loading">
      <CPreloader />
    </template>

    <div class="row">
      <div class="col-4 d-none d-sm-none d-md-block"></div>

      <div class="col-8 col-sm-8 col-md-4">
        <h1>Комнаты</h1>
      </div>

      <div class="col-4 col-sm-4">
        <RoomCreateFeature />
      </div>
    </div>

    <div class="row">
      <div class="col-2 d-none d-sm-none d-md-block"></div>

      <div class="col-xs-12 col-sm-8">
        <RoomsListWidget />
      </div>

      <div class="col-2 d-none d-sm-none d-md-block">
      </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { RoomsListWidget } from '@/widgets'
import { RoomCreateFeature } from '@/features'
import { useRoomModel } from '@/entities';
import { CPreloader, useBreadcrumbModel } from '@/shared'

const room_model = useRoomModel()
const breadcrumb_model = useBreadcrumbModel()

onBeforeMount(async () => {
  breadcrumb_model.set([{
    name: 'Комнаты',
    is_current: true
  }]);

  room_model.createSubscribe()
  room_model.updateSubscribe({ channel_id: null })
  room_model.deleteSubscribe({ channel_id: null })

  await room_model.fetchRooms();
})

onBeforeUnmount(() => {
  room_model.unsubscribe();
})
</script>

<style scoped lang="scss"></style>
