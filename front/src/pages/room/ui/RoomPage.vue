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
  import { RoomInfoWidget } from '@/widgets'
  import { CPreloader, useBreadcrumbModel } from '@/shared'

  const props = defineProps<{ id: string }>();
  const room_model = useRoomModel()
  const breadcrumb_model = useBreadcrumbModel()

  onBeforeMount(async () => {
    await room_model.fetchCurrentRoom({ id: props.id });
  })

  room_model.$subscribe((_mutation, state) => {
    if (state.current_room) {
      breadcrumb_model.set([
        {
          name: 'Комнаты',
          is_current: false,
          to: 'rooms'
        },
        {
          name: state.current_room.title || state.current_room.id,
          is_current: true,
        }
      ]);
    }
  });
</script>

<style scoped lang="scss"></style>
