<template>
  <button type="button" class="btn btn-dark w-100" @click="openUpdateTaskModal">
    <i class="bi bi-pencil"></i>
  </button>

  <div class="modal fade" id="updateTaskModal" tabindex="-1" aria-labelledby="updateTaskModalLabel" aria-hidden="true" ref="update_task_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateTaskModalLabel">Редактировать задачу</h1>
        </div>

        <div class="modal-body">
          <div class="form-floating" :class="{ 'was-validated': !form_valid }">
            <input type="text" class="form-control" id="taskTitle" placeholder="Введите название..." v-model="title" required />
            <label for="taskTitle">Название</label>
            <div class="invalid-feedback">
              Введите название задачи
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-dark" @click="updateTask">Сохранить</button>
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

const update_task_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let update_task_modal_value: Modal | null = null;

const task_model = useTaskModel()
const title: Ref<string> = ref(props.task.title)
const form_valid: Ref<boolean> = ref(true)

onMounted(() => {
  if (update_task_modal_ref.value instanceof HTMLDivElement) {
    update_task_modal_value = new Modal(update_task_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openUpdateTaskModal(event: Event) {
  form_valid.value = true;
  title.value = props.task.title;

  event.preventDefault();

  if (update_task_modal_value) {
    update_task_modal_value.show();
  }
}

function closeUpdateTaskModal() {
  if (update_task_modal_value) {
    update_task_modal_value.hide();
  }
}

async function updateTask() {
  if (!title.value.length) {
    form_valid.value = false;

    return;
  }

  await task_model.update({ id: props.task.id, title: title.value })

  if (task_model.loading_error) {
    toast.error(task_model.loading_error, {
      timeout: 2500,
    });
  } else {
    closeUpdateTaskModal()

    toast.success("Задача обновлена!", {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
