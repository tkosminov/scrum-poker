<template>
  <template v-if="task_model.current_task">
    <v-card variant="tonal">
      <v-card-text>
        {{ task_model.current_task.title }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <TaskChangeStatusFeature :task="task_model.current_task" />
      </v-card-actions>
    </v-card>

    <template v-if="task_model.current_task.voting_status_id === EVotingStatusId.InProgress">
      <v-card variant="tonal" class="mt-2">
        <v-card-title>
          {{ $t('widgets.task.current.voting') }}
        </v-card-title>

        <v-card-actions>
          <VotesListWidget :task="task_model.current_task" />
        </v-card-actions>
      </v-card>
    </template>

    <template v-if="task_model.current_task.voting_status_id === EVotingStatusId.Completed">
      <v-card variant="tonal" class="mt-2">
        <v-card-title>
          {{ $t('widgets.task.current.voting_result') }}
        </v-card-title>

        <v-card-item>
          <VotesResultWidget />
        </v-card-item>
      </v-card>
    </template>
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { VotesListWidget, VotesResultWidget } from '@/widgets';
import { TaskChangeStatusFeature } from '@/features';
import { useTaskModel, EVotingStatusId, useRoomModel, useVoteModel } from '@/entities';

const toast = useToast();
const { t } = useI18n();

const room_model = useRoomModel()
const task_model = useTaskModel()
const vote_model = useVoteModel()

const { current_task } = storeToRefs(task_model)

watch(
  () => current_task.value,
  async (curr_current_task, _prev_current_task) => {
    room_model.changeCurrentTaskId(curr_current_task?.id || null);
   
    if (curr_current_task != null) {
      switch(curr_current_task.voting_status_id) {
        case EVotingStatusId.InProgress:
          toast.warning(t('widgets.task.current.voting_in_progress'), {
            timeout: 2500,
          });

          vote_model.clearState();
          await vote_model.fetchVotes({ task_id: curr_current_task.id })
          await vote_model.fetchVoteCurrent({ task_id: curr_current_task.id });
  
          break;
        case EVotingStatusId.Completed:
          await vote_model.fetchVotesFull({ task_id: curr_current_task.id })
  
          break;
        default:
          vote_model.clearState();
  
          break;
      }
    } else {
      vote_model.clearState();
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss">
.cursor-help {
  cursor: help;
}
</style>
