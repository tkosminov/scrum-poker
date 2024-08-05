<template>
  <v-card min-width="100px" max-width="200px">
    <v-card-item class="d-flex align-center justify-space-around">
      <v-avatar variant="tonal">
        <v-icon icon="mdi-account-circle" v-if="selected_point === '...'"></v-icon>
        <v-icon icon="mdi-check" v-else-if="selected_point === '!'"></v-icon>
        <template v-else>
          {{ selected_point }}
        </template>
      </v-avatar>
    </v-card-item>

    <v-card-subtitle class="cursor-default">
      {{ room_user.user.name }}

      <v-tooltip
        activator="parent"
        location="top"
      >
        {{ room_user.user.name }}
      </v-tooltip>
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from 'vue';
import { useTaskModel, useVoteModel, RoomUsersQuery, EVotingStatusId } from '@/entities';

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
