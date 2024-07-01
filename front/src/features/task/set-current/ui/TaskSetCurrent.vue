<template>
  <button
    type="button"
    class="btn w-100"
    :class="{ 'btn-dark': is_current, 'btn-outline-dark': !is_current }"
    @click="setCurrentTask"
  >
    <i class="bi bi-hand-index"></i>
  </button>
</template>

<script setup lang="ts">
import { type Ref, ref, onBeforeMount } from 'vue';
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useTaskModel, type TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
const is_current: Ref<boolean> = ref(false)

const { t } = useI18n();
const toast = useToast();
const task_model = useTaskModel()

onBeforeMount(() => {
  if (task_model.current_task_id) {
    is_current.value = task_model.current_task_id === props.task.id;
  }
})

task_model.$subscribe(({ events }, state) => {
  let key: string;

  if (Array.isArray(events)) {
    key = events[0].key
  } else {
    key = events.key
  }

  if (key === 'current_task') {
    if (state.current_task_id) {
      is_current.value = state.current_task_id === props.task.id;
    }
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
    toast.success(t('features.task.set_current.change'), {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
