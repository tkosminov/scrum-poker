<template>
    <template v-if="room_model.loading">
      <CPreloader />
    </template>

    <div class="row">
      <div class="col-4 d-none d-sm-none d-md-none d-lg-block"></div>

      <div class="col-8 col-sm-8 col-md-8 col-lg-4">
        <h1>{{ $t('pages.rooms.title') }}</h1>
      </div>

      <div class="col-4 col-sm-4 col-md-4 col-lg-4">
        <div class="d-flex justify-content-center">
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
import { useI18n } from "vue-i18n";
import { RoomsListWidget } from '@/widgets'
import { RoomCreateFeature } from '@/features'
import { useRoomModel } from '@/entities';
import { CPreloader, useBreadcrumbModel } from '@/shared'

const { t } = useI18n();
const room_model = useRoomModel()
const breadcrumb_model = useBreadcrumbModel()

onBeforeMount(async () => {
  breadcrumb_model.set([{
    name: t('pages.rooms.title'),
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
