<template>
  <button type="button" class="btn btn-info" @click="openUpdateRoomModal">
    <i class="bi bi-pencil"></i>
  </button>

  <div class="modal fade" id="UpdateRoomModal" tabindex="-1" aria-labelledby="UpdateRoomModalLabel" aria-hidden="true" ref="update_room_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="UpdateRoomModalLabel">Редактировать комнату</h1>
        </div>

        <div class="modal-body">
          <div class="form-floating">
            <input type="text" class="form-control" id="roomTitle" placeholder="Введите название..." v-model="title" />
            <label for="roomTitle">Название</label>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-info" @click="updateRoom">
            <i class="bi bi-pencil"></i> Сохранить
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
import { CurrentRoomQuery, useRoomModel } from '@/entities';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();

const update_room_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let update_room_modal_value: Modal | null = null;

const room_model = useRoomModel()
const title: Ref<string | null> = ref(props.room.title)

onMounted(() => {
  if (update_room_modal_ref.value instanceof HTMLDivElement) {
    update_room_modal_value = new Modal(update_room_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openUpdateRoomModal(event: Event) {
  event.preventDefault();

  if (update_room_modal_value) {
    update_room_modal_value.show();
  }
}

function closeUpdateRoomModal() {
  if (update_room_modal_value) {
    update_room_modal_value.hide();
  }
}

async function updateRoom() {
  await room_model.update({ id: props.room.id, title: title.value! })

  closeUpdateRoomModal()

  toast.success("Комната сохранена!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
