<template>
  <template v-if="room_model.loading">
    <CPreloader />
  </template>

  <RoomInfoWidget />

  <div class="row">
    <div class="col-xs-12 col-sm-4">
      <CHr title="Пользователи" />
    </div>

    <div class="col-xs-12 col-sm-4">
      <CHr title="Текущая задача" />

      <TaskCurrentWidget />
    </div>

    <div class="col-xs-12 col-sm-4">
      <CHr title="Список задач" />

      <div class="row mb-2">
        <div class="col-12">
          <TaskCreateFeature />
        </div>
      </div>

      <TasksListWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { router } from '@/app/providers';
import { useRoomModel, useTaskModel } from '@/entities';
import { RoomInfoWidget, TasksListWidget, TaskCurrentWidget } from '@/widgets'
import { CPreloader, useBreadcrumbModel, CHr } from '@/shared'
import { TaskCreateFeature } from '@/features'

const props = defineProps<{ id: string }>();
const room_model = useRoomModel()
const task_model = useTaskModel()
const breadcrumb_model = useBreadcrumbModel()

onBeforeMount(async () => {
  room_model.clearState();
  task_model.clearState();

  room_model.updateSubscribe({ channel_id: props.id });
  room_model.deleteSubscribe({ channel_id: props.id });

  task_model.createSubscribe({ channel_id: props.id });
  task_model.updateSubscribe({ channel_id: props.id });
  task_model.deleteSubscribe({ channel_id: props.id });
  task_model.setCurrentSubscribe({ channel_id: props.id });
  task_model.changeStatusSubscribe({ channel_id: props.id });

  await room_model.fetchCurrentRoom({ id: props.id });
  await task_model.fetchTasks({ room_id: props.id })
})

onBeforeUnmount(() => {
  room_model.unsubscribe()
  task_model.unsubscribe()
})

room_model.deleted_id$.subscribe((value) => {
  if (value === props.id) {
    router.push({ name: 'rooms' })
  }
})

room_model.$subscribe((_mutation, state) => {
  if (state.current_room) {
    task_model.initCurrentTask(state.current_room.current_task_id)

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
