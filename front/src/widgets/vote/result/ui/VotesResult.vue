<template>
  <template v-if="task_model.current_task">
    <v-row>
      <v-col
        class="d-flex child-flex justify-center"
      >
        <v-chip>
          <v-icon icon="mdi-division"></v-icon>
          {{ task_model.current_task.avg_point }}
  
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ $t('widgets.vote.result.average_value') }}
          </v-tooltip>
        </v-chip>
      </v-col>
  
      <v-col
        class="d-flex child-flex justify-center"
      >
        <v-chip color="primary" variant="flat">
          <v-icon icon="mdi-wrench"></v-icon>
          {{ task_model.current_task.closest_point }}
  
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ $t('widgets.vote.result.rounded_value') }}
          </v-tooltip>
        </v-chip>
      </v-col>
    </v-row>
  
    <template v-if="points?.length">
      <v-row>
        <v-col>
          <table class="charts-css bar show-labels datasets-spacing-2">
            <tbody>
              <tr
                v-for="point of points"
                :key="`progress_${point}`"
              >
                <th scope="row" class="d-flex child-flex justify-center"> {{ Number(point) > 0 ? point : '?' }} </th>
                <td
                  :style="{ '--size': task_model.current_task.counts_point![point].percent }"
                >
                  <span class="data pr-1"> {{ task_model.current_task.counts_point![point].count }} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </template>
  </template>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useTaskModel } from '@/entities';

const task_model = useTaskModel()
const { current_task } = storeToRefs(task_model)

const points: Ref<string[] | null> = ref(null);

watch(
  () => current_task.value,
  async (curr_current_task, _prev_current_task) => {
    if (curr_current_task != null) {
      if (curr_current_task.counts_point != null) {
        points.value = Object.keys(curr_current_task.counts_point).sort((a, b) => {
          const a_key_value = Number(a);
          const b_key_value = Number(b);

          if (a_key_value === b_key_value) {
            return 0;
          }

          if (a_key_value < b_key_value) {
            return -1;
          }

          return 1;
        });;
      } else {
        points.value = null
      }
    } else {
      points.value = null
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss"></style>
