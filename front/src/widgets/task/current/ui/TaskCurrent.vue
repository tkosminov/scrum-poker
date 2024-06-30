<template>
  <template v-if="task_model.current_task">
    <div class="row">
      <div class="col-12">
        <h4>{{ task_model.current_task.title }}</h4>
      </div>
    </div>
  
    <div class="row">
      <div class="col-12">
        <TaskChangeStatusFeature :task="task_model.current_task" />
      </div>
    </div>

    <template v-if="task_model.current_task.voting_status_id === EVotingStatusId.InProgress">
      <CHr :title="$t('widgets.task.current.voting')" />

      <VotesListWidget :task="task_model.current_task" />
    </template>
  
    <template v-if="task_model.current_task.voting_status_id === EVotingStatusId.Completed">
      <CHr :title="$t('widgets.task.current.voting_result')" />
    
      <div class="row">
        <div class="col-6 border-end">
          <h4
            class="text-center cursor-help"
            data-bs-toggle="tooltip"
            data-bs-placement="top" 
            :title="$t('widgets.task.current.average_value')"
          >
            <i class="bi bi-align-middle"></i>  <br />
            <span class="badge text-bg-secondary">{{ task_model.current_task.avg_point }}</span>
          </h4>
        </div>
        <div class="col-6">
          <h4
            class="text-center cursor-help"
            data-bs-toggle="tooltip"
            data-bs-placement="top" 
            :title="$t('widgets.task.current.rounded_value')"
          >
            <i class="bi bi-wrench-adjustable-circle"></i> <br />
            <span class="badge text-bg-secondary">{{ task_model.current_task.closest_point }}</span>
          </h4>
        </div>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useTaskModel, EVotingStatusId, useRoomModel, useVoteModel } from '@/entities';
import { TaskChangeStatusFeature } from '@/features';
import { CHr } from '@/shared'
import { VotesListWidget } from '@/widgets/vote';

const room_model = useRoomModel()
const task_model = useTaskModel()
const vote_model = useVoteModel()

task_model.$subscribe(async ({ events }, state) => {
  let key: string;
  let type: string;

  if (Array.isArray(events)) {
    key = events[0].key
    type = events[0].type
  } else {
    key = events.key
    type = events.type
  }

  if (!state.current_task) {
    vote_model.clearState();
  }

  if (key === 'current_task') {
    room_model.changeCurrentTaskId(state.current_task_id);
   
    if (state.current_task != null) {
      switch(state.current_task.voting_status_id) {
        case EVotingStatusId.InProgress:
          vote_model.clearState();
          await vote_model.fetchVotes({ task_id: state.current_task.id })
          await vote_model.fetchVoteCurrent({ task_id: state.current_task.id });
  
          break;
        case EVotingStatusId.Completed:
        await vote_model.fetchVotesFull({ task_id: state.current_task.id })
  
          break;
        default:
          vote_model.clearState();
  
          break;
      }
    }
  }
})
</script>

<style scoped lang="scss">
.cursor-help {
  cursor: help;
}
</style>
