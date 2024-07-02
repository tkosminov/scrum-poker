<template>
  <button type="button" class="btn btn-dark" @click="openUpdateRoomModal">
    <i class="bi bi-pencil"></i>
  </button>

  <div
    class="modal fade"
    id="updateRoomModal"
    tabindex="-1"
    aria-labelledby="updateRoomModalLabel"
    aria-hidden="true"
    ref="update_room_modal_ref"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateRoomModalLabel">
            {{ $t('features.room.update.update_room') }}
          </h1>
        </div>

        <div class="modal-body">
          <div class="form-floating" :class="{ 'was-validated': !form_valid }">
            <input
              type="text"
              class="form-control"
              id="roomTitle"
              :placeholder="$t('features.room.update.enter_title')"
              v-model="title"
              required
            />
            <label for="roomTitle">
              {{ $t('features.room.update.title') }}
            </label>
            <div class="invalid-feedback">
              {{ $t('features.room.update.enter_title') }}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">
            {{ $t('features.room.update.cancel') }}
          </button>
          <button type="button" class="btn btn-dark" @click="updateRoom">
            <i class="bi bi-pencil"></i>
            {{ $t('features.room.update.update') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { Modal } from "bootstrap";
import { CurrentRoomQuery, useRoomModel } from '@/entities';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();
const { t } = useI18n();

const update_room_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let update_room_modal_value: Modal | null = null;

const room_model = useRoomModel()
const title: Ref<string | null> = ref(props.room.title)
const form_valid: Ref<boolean> = ref(true)

onMounted(() => {
  if (update_room_modal_ref.value instanceof HTMLDivElement) {
    update_room_modal_value = new Modal(update_room_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openUpdateRoomModal(event: Event) {
  form_valid.value = true;
  title.value = props.room.title;

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
  if (!title.value?.length) {
    form_valid.value = false;

    return;
  }

  try {
    await room_model.update({ id: props.room.id, title: title.value })

    closeUpdateRoomModal()

    toast.success(t('features.room.update.updated'), {
      timeout: 2500,
    });
  } catch (error) {
    toast.error(room_model.mutation_error!, {
      timeout: 2500,
    });
  }
}
</script>

<style scoped lang="scss"></style>
