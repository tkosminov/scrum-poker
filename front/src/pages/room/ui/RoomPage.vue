<template>
  <div class="row">
    <div class="col-12">
      <template v-if="room_model.loading">
        <CPreloader />
      </template>
    
      <RoomInfoWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRoomModel } from '@/entities';
import { CPreloader } from '@/shared'
import { RoomInfoWidget } from '@/widgets'

const room_model = useRoomModel()
const props = defineProps<{ id: string }>();

onBeforeMount(async () => {
  await room_model.fetchCurrentRoom({ id: props.id });
})
</script>

<style scoped lang="scss"></style>
