<template>
  <div class="card text-center mb-3" style="width: 120px;">
    <div class="card-body">
      <h1>{{ selected_point }}</h1>
    </div>
    <div
      class="card-footer cursor-help"
      data-bs-toggle="tooltip"
      data-bs-placement="top" 
      :title="room_user.user.name"
    >
      <p class="text-nowrap text-truncate">
        {{ room_user.user.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomUsersQuery, EVotingStatusId } from '@/entities';
import { useTaskModel, useVoteModel } from '@/entities';
import { Ref, ref, onBeforeMount } from 'vue';

const props = defineProps<{ room_user: RoomUsersQuery['roomUsers'][0] }>();

const vote_model = useVoteModel();
const task_model = useTaskModel();

const selected_point: Ref<string | number> = ref('...');

onBeforeMount(() => {
  calcSelectedValue();
})

vote_model.$subscribe((_mutation, _state) => {
  calcSelectedValue();
})

function calcSelectedValue() {
  selected_point.value = '...';

  if (task_model.current_task && vote_model.votes.has(props.room_user.user.id)) {
    if (task_model.current_task.voting_status_id === EVotingStatusId.Completed) {
      const value = vote_model.votes.get(props.room_user.user.id);

      selected_point.value = value ? value : '?';
    } else {
      selected_point.value = '!';
    }
  }
}
</script>

<style scoped lang="scss">
.cursor-help {
  cursor: help !important;
}
</style>
