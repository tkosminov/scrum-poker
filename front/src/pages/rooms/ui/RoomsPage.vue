<template>
  <div class="row">
    <div class="col-12">
      <template v-if="room_model.loading">
        <CPreloader />
      </template>

      <div class="row">
        <div class="col-4"></div>

        <div class="col-4">
          <RoomsListWidget />
        </div>

        <div class="col-4">
          <RoomCreateFeature />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue';
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

    await room_model.fetchRooms();
  })
</script>

<style scoped lang="scss"></style>
