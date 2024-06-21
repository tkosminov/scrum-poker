<template>
  <button type="button" class="btn btn-dark" @click="openCreateRoomModal">
    Создать
  </button>

  <div class="modal fade" id="createRoomModal" tabindex="-1" aria-labelledby="createRoomModalLabel" aria-hidden="true" ref="create_room_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createRoomModalLabel">Новая комната</h1>
        </div>

        <div class="modal-body">
          <div class="form-floating" :class="{ 'was-validated': !form_valid }">
            <input type="text" class="form-control" id="roomTitle" placeholder="Введите название..." v-model="title" required />
            <label for="roomTitle">Название</label>
            <div class="invalid-feedback">
              Введите название комнаты
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-dark" @click="createRoom">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, type Ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRoomModel } from '@/entities';

const toast = useToast();

const create_room_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let create_room_modal_value: Modal | null = null;

const room_model = useRoomModel()
const title: Ref<string> = ref("")
const form_valid: Ref<boolean> = ref(true)

onMounted(() => {
  if (create_room_modal_ref.value instanceof HTMLDivElement) {
    create_room_modal_value = new Modal(create_room_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openCreateRoomModal(event: Event) {
  form_valid.value = true;
  title.value = ""

  event.preventDefault();

  if (create_room_modal_value) {
    create_room_modal_value.show();
  }
}

function closeCreateRoomModal() {
  if (create_room_modal_value) {
    create_room_modal_value.hide();
  }
}

async function createRoom() {
  if (!title.value.length) {
    form_valid.value = false;

    return;
  }

  await room_model.create({ title: title.value })

  closeCreateRoomModal()

  toast.success("Комната создана!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
