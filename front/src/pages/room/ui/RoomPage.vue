<template>
  <template v-if="room_model.loading">
    <CPreloader />
  </template>

  <v-container>
    <RoomCardWidget />

    <v-row>
      <v-col cols="12" md="4">
        <RoomUsersListWidget />
      </v-col>

      <v-col cols="12" md="4">
        <TaskCurrentWidget />
      </v-col>

      <v-col cols="12" md="4" class="hidden-sm-and-down">
        <TasksListWidget />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Ref, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { router } from '@/app/providers';
import { RoomCardWidget, TasksListWidget, TaskCurrentWidget, RoomUsersListWidget } from '@/widgets'
import { useRoomModel, useTaskModel, useRoomUserModel, useUserModel, useVoteModel } from '@/entities';
import { CPreloader, useBreadcrumbModel } from '@/shared'

const props = defineProps<{ id: string }>();
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
        name: 'pages.rooms.title',
        use_i18n: true,
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
