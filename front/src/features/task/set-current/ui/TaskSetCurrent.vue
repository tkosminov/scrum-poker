<template>
  <v-radio
    :key="`${props.task.id}_${is_current}`"
    v-model="is_current"
    @click="setCurrentTask"
    color="success"
  >
  </v-radio>
</template>

<script setup lang="ts">
import { type Ref, ref, onBeforeMount, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { storeToRefs } from 'pinia'
import { useTaskModel, type TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
const is_current: Ref<boolean> = ref(false)

const { t } = useI18n();
const toast = useToast();
const task_model = useTaskModel()
const { current_task_id } = storeToRefs(task_model)

onBeforeMount(() => {
  if (task_model.current_task_id) {
    is_current.value = task_model.current_task_id === props.task.id;
  }
})

watch(
  () => current_task_id.value,
  (curr_current_task_id, _prev_current_task_id) => {
    is_current.value = curr_current_task_id === props.task.id;
  },
  {
    immediate: true,
  }
)

async function setCurrentTask() {
  if (is_current.value) {
    return;
  }

  try {
    await task_model.setCurrent({ id: props.task.id })

    toast.success(t('features.task.set_current.change'), {
      timeout: 2500,
    });
  } catch (error) {
    toast.error(task_model.mutation_error!, {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
