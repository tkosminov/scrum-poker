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
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { router } from '@/app/providers';
import { useRoomModel } from '@/entities';
import { RoomInfoWidget } from '@/widgets'
import { CPreloader, useBreadcrumbModel } from '@/shared'

const props = defineProps<{ id: string }>();
const room_model = useRoomModel()
const breadcrumb_model = useBreadcrumbModel()

onBeforeMount(async () => {
  room_model.updateSubscribe({ channel_id: props.id });
  room_model.deleteSubscribe({ channel_id: props.id });

  await room_model.fetchCurrentRoom({ id: props.id });
})

onBeforeUnmount(() => {
  room_model.unsubscribe()
})

room_model.deleted_id$.subscribe((value) => {
  if (value === props.id) {
    router.push({ name: 'rooms' })
  }
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
