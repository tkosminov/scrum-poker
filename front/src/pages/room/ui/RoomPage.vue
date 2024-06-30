<template>
  <template v-if="room_model.loading">
    <CPreloader />
  </template>

  <RoomInfoWidget />

  <div class="row">
    <div class="col-xs-12 col-sm-4">
      <CHr :title="$t('pages.room.users_list')" />

      <RoomUsersListWidget />
    </div>

    <div class="col-xs-12 col-sm-4">
      <CHr :title="$t('pages.room.current_task')" />

      <TaskCurrentWidget />
    </div>

    <div class="col-xs-12 col-sm-4">
      <CHr :title="$t('pages.room.tasks_list')" />

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
import { Ref, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { router } from '@/app/providers';
import { useRoomModel, useTaskModel, useRoomUserModel, useUserModel, useVoteModel } from '@/entities';
import { RoomInfoWidget, TasksListWidget, TaskCurrentWidget, RoomUsersListWidget } from '@/widgets'
import { CPreloader, useBreadcrumbModel, CHr } from '@/shared'
import { TaskCreateFeature } from '@/features'

const props = defineProps<{ id: string }>();
const { t } = useI18n();
const user_model = useUserModel()
const room_model = useRoomModel()
const task_model = useTaskModel()
const room_user_model = useRoomUserModel()
const vote_model = useVoteModel()
const breadcrumb_model = useBreadcrumbModel()

const send_leave_event: Ref<boolean> = ref(true);

onBeforeMount(async () => {
  room_model.clearState();
  task_model.clearState();
  room_user_model.clearState();
  vote_model.clearState();

  await room_user_model.roomUserJoin({ room_id: props.id })

  await room_model.fetchCurrentRoom({ id: props.id });
  await task_model.fetchTasks({ room_id: props.id })
  await room_user_model.fetchRoomUsers({ room_id: props.id })

  room_model.updateSubscribe({ channel_id: props.id });
  room_model.deleteSubscribe({ channel_id: props.id });

  task_model.createSubscribe({ channel_id: props.id });
  task_model.updateSubscribe({ channel_id: props.id });
  task_model.deleteSubscribe({ channel_id: props.id });
  task_model.setCurrentSubscribe({ channel_id: props.id });
  task_model.changeStatusSubscribe({ channel_id: props.id });

  room_user_model.roomUserJoinSubscribe({ channel_id: props.id })
  room_user_model.roomUserLeaveSubscribe({ channel_id: props.id })

  vote_model.changeSubscribe({ channel_id: props.id })
  vote_model.getSubscribe({ channel_id: props.id })
})

onBeforeUnmount(async () => {
  room_model.unsubscribe()
  task_model.unsubscribe()
  room_user_model.unsubscribe()
  vote_model.unsubscribe()

  if (send_leave_event.value) {
    await room_user_model.roomUserLeave({ room_id: props.id })
  }
})

room_model.deleted_id$.subscribe((value) => {
  if (value === props.id) {
    send_leave_event.value = false;

    router.push({ name: 'rooms' })
  }
})

room_user_model.deleted_id$.subscribe((value) => {
  if (value === user_model.current_user?.id) {
    send_leave_event.value = false;

    router.push({ name: 'rooms' })
  }
})

room_model.$subscribe((_mutation, state) => {
  if (state.current_room) {
    task_model.initCurrentTask(state.current_room.current_task_id)

    breadcrumb_model.set([
      {
        name: t('pages.rooms.title'),
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
