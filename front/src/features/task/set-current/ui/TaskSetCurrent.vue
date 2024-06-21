<template>
  <button
    type="button"
    class="btn"
    :class="{ 'btn-dark': is_current, 'btn-outline-dark': !is_current }"
    @click="setCurrentTask"
  >
    <i class="bi bi-hand-index"></i>
  </button>
</template>

<script setup lang="ts">
import { type Ref, ref, onBeforeMount } from 'vue';
import { useToast } from "vue-toastification";
import { useTaskModel, type TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
const is_current: Ref<boolean> = ref(false)

const toast = useToast();
const task_model = useTaskModel()

onBeforeMount(() => {
  if (task_model.current_task_id) {
    is_current.value = task_model.current_task_id === props.task.id;
  }
})

task_model.$subscribe((_mutation, state) => {
  if (state.current_task_id) {
    is_current.value = state.current_task_id === props.task.id;
  }
})

async function setCurrentTask() {
  if (is_current.value) {
    return;
  }

  await task_model.setCurrent({ id: props.task.id })

  if (task_model.loading_error) {
    toast.error(task_model.loading_error, {
      timeout: 2500,
    });
  } else {
    toast.success("Текущая задача заменена!", {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
