<template>
  <VDropdown>
    <button type="button" class="btn btn-dark">
      <i class="bi bi-share"></i>
    </button>

    <template #popper>
      <div class="card">
        <div class="card-body">
          <button class="btn btn-dark" @click="copyRoomUrl">
            <i class="bi bi-share"></i>
            Копировать ссылку
          </button>
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { CurrentRoomQuery } from '../../api';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();

const room_url = `${window.location.origin}/${props.room.id}`

function copyRoomUrl() {
  navigator.clipboard.writeText(room_url)

  toast.success("Скопировано!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
