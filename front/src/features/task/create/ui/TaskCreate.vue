<template>
  <button type="button" class="btn btn-dark" @click="openCreateTaskModal">
    Добавить задачу
  </button>

  <div class="modal fade" id="createTaskModal" tabindex="-1" aria-labelledby="createTaskModalLabel" aria-hidden="true" ref="create_task_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createTaskModalLabel">Новая задача</h1>
        </div>

        <div class="modal-body">
          <div class="form-floating">
            <input type="text" class="form-control" id="taskTitle" placeholder="Введите название..." v-model="title" />
            <label for="taskTitle">Название</label>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="createTask">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, type Ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useTaskModel, useRoomModel } from '@/entities';

const toast = useToast();

const create_task_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let create_task_modal_value: Modal | null = null;

const room_model = useRoomModel();
const task_model = useTaskModel()
const title: Ref<string> = ref("")

onMounted(() => {
  if (create_task_modal_ref.value instanceof HTMLDivElement) {
    create_task_modal_value = new Modal(create_task_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openCreateTaskModal(event: Event) {
  event.preventDefault();

  if (create_task_modal_value) {
    create_task_modal_value.show();
  }
}

function closeCreateTaskModal() {
  if (create_task_modal_value) {
    create_task_modal_value.hide();
  }

  title.value = ""
}

async function createTask() {
  await task_model.create({ title: title.value, room_id: room_model.current_room!.id })

  if (task_model.loading_error) {
    toast.error(task_model.loading_error, {
      timeout: 2500,
    });
  } else {
    closeCreateTaskModal()

    toast.success("Задача добавлена!", {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
