<template>
  <button type="button" class="btn btn-dark" @click="openDeleteTaskModal">
    <i class="bi bi-trash"></i>
  </button>

  <div class="modal fade" id="deleteTaskModal" tabindex="-1" aria-labelledby="deleteTaskModalLabel" aria-hidden="true" ref="delete_task_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteTaskModalLabel">Удалить задачу?</h1>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-dark" @click="deleteTask">
            <i class="bi bi-trash"></i> Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, type Ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useTaskModel, TasksQuery } from '@/entities';

const props = defineProps<{ task: TasksQuery['tasks'][0] }>();
const toast = useToast();

const delete_task_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let delete_task_modal_value: Modal | null = null;

const task_model = useTaskModel()

onMounted(() => {
  if (delete_task_modal_ref.value instanceof HTMLDivElement) {
    delete_task_modal_value = new Modal(delete_task_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openDeleteTaskModal(event: Event) {
  event.preventDefault();

  if (delete_task_modal_value) {
    delete_task_modal_value.show();
  }
}

function closeDeleteTaskModal() {
  if (delete_task_modal_value) {
    delete_task_modal_value.hide();
  }
}

async function deleteTask() {
  await task_model.delete({ id: props.task.id })

  closeDeleteTaskModal()

  toast.success("Задача удалена!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
