<template>
  <button
    type="button"
    class="btn"
    :class="{ 'btn-dark': !copied, 'btn-outline-dark': copied }"
    @click="copyRoomUrl"
  >
    <i class="bi bi-check2" v-if="copied"></i>
    <i class="bi bi-share" v-else></i>
  </button>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useToast } from "vue-toastification";

import { CurrentRoomQuery } from '@/entities';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();

const copied: Ref<boolean> = ref(false)

const room_url = `${window.location.origin}/${props.room.id}`

function copyRoomUrl() {
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2500)

  navigator.clipboard.writeText(room_url)

  toast.success("Скопировано!", {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
