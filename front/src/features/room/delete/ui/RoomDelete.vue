<template>
  <button type="button" class="btn btn-danger" @click="openDeleteRoomModal">
    <i class="bi bi-trash"></i>
  </button>

  <div class="modal fade" id="deleteRoomModal" tabindex="-1" aria-labelledby="deleteRoomModalLabel" aria-hidden="true" ref="delete_room_modal_ref">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteRoomModalLabel">Удалить комнату?</h1>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-danger" @click="deleteRoom">
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
import { CurrentRoomQuery, useRoomModel } from '@/entities';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();

const delete_room_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let delete_room_modal_value: Modal | null = null;

const room_model = useRoomModel()

onMounted(() => {
  if (delete_room_modal_ref.value instanceof HTMLDivElement) {
    delete_room_modal_value = new Modal(delete_room_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openDeleteRoomModal(event: Event) {
  event.preventDefault();

  if (delete_room_modal_value) {
    delete_room_modal_value.show();
  }
}

function closeDeleteRoomModal() {
  if (delete_room_modal_value) {
    delete_room_modal_value.hide();
  }
}

async function deleteRoom() {
  await room_model.deleteRoom({ id: props.room.id })

  closeDeleteRoomModal()

  toast.success("Комната удалена!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
