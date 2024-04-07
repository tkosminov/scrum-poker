<template>
  <button type="button" class="btn btn-primary mtb-5" @click="openCreateRoomModal">
    Создать
  </button>

  <div class="modal fade" id="createRoomModal" tabindex="-1" aria-labelledby="createRoomModalLabel" aria-hidden="true" ref="create_room_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createRoomModalLabel">Новая комната</h1>
        </div>

        <div class="modal-body">
          <div class="form-floating">
            <input type="text" class="form-control" id="roomTitle" placeholder="Введите название..." v-model="title" />
            <label for="roomTitle">Название</label>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="createRoom">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, type Ref, onMounted } from "vue";
import { useRoomModel } from '@/entities';

const create_room_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let create_room_modal_value: Modal | null = null;

const room_model = useRoomModel()
const title: Ref<string> = ref("")

onMounted(() => {
  if (create_room_modal_ref.value instanceof HTMLDivElement) {
    create_room_modal_value = new Modal(create_room_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openCreateRoomModal(event: Event) {
  event.preventDefault();

  if (create_room_modal_value) {
    create_room_modal_value.show();
  }
}

function closeCreateRoomModal() {
  if (create_room_modal_value) {
    create_room_modal_value.hide();
  }

  title.value = ""
}

async function createRoom() {
  await room_model.createRoom({ title: title.value })

  closeCreateRoomModal()
}
</script>

<style scoped lang="scss"></style>
