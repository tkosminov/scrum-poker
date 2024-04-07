<template>
  <VDropdown>
    <button type="button" class="btn btn-primary">
      <i class="bi bi-share"></i>
    </button>

    <template #popper>
      <div class="card p-5">
        <img :src="qr_code" class="card-img-top" loading="lazy" :alt="room_url">

        <div class="card-body">
          <button class="btn btn-primary" @click="copyRoomUrl">Копировать ссылку</button>
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

const chart_url = import.meta.env.VITE_APP_CHART_GOOGLEAPIS;
const room_url = `${window.location.origin}/${props.room.id}`
const qr_code = `${chart_url}${encodeURIComponent(room_url)}`

function copyRoomUrl() {
  navigator.clipboard.writeText(room_url)

  toast.success("Скопировано!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
