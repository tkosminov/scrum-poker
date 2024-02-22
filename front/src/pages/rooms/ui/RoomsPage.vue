<template>
  <div class="row">
    <div class="col-12">
      <template v-if="room_model.loading">
        <CPreloader />
      </template>

      <RoomsListWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { RoomsListWidget } from '@/widgets'
  import { useRoomModel } from '@/entities';
  import { CPreloader } from '@/shared'

  const room_model = useRoomModel()

  onBeforeMount(async () => {
    await room_model.fetchRooms();
  })
</script>

<style scoped lang="scss"></style>
