<template>
    <template v-if="room_model.loading">
      <CPreloader />
    </template>

    <div class="row mb-2">
      <div class="col-4 d-none d-sm-none d-md-none d-lg-block"></div>

      <div class="col-12 col-sm-8 col-md-8 col-lg-4">
        <CHr :title="$t('pages.rooms.title')" />
      </div>

      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <div class="d-flex justify-content-center gap-1">
          <RoomCreateFeature />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-4 d-none d-sm-none d-md-none d-lg-block"></div>

      <div class="col-12 col-sm-8 col-md-8 col-lg-4">
        <RoomsListWidget />
      </div>

      <div class="col-4 d-none d-sm-none d-md-none d-lg-block">
      </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { RoomsListWidget } from '@/widgets'
import { RoomCreateFeature } from '@/features'
import { useRoomModel } from '@/entities';
import { CPreloader, useBreadcrumbModel, CHr } from '@/shared'

const room_model = useRoomModel()
const breadcrumb_model = useBreadcrumbModel()

onBeforeMount(async () => {
  breadcrumb_model.set([{
    name: 'pages.rooms.title',
    use_i18n: true,
    is_current: true
  }]);

  room_model.clearState()

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
