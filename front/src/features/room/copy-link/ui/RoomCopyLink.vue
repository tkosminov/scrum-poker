<template>
  <button
    type="button"
    class="btn"
    :class="{ 'btn-dark': !copied, 'btn-outline-dark': copied }"
    @click="copyRoomUrl"
    :disabled="clipboard_unavailable"
  >
    <i class="bi bi-check2" v-if="copied"></i>
    <i class="bi bi-share" v-else></i>
  </button>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { CurrentRoomQuery } from '@/entities';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
const toast = useToast();
const { t } = useI18n();

const copied: Ref<boolean> = ref(false)

const room_url = `${window.location.origin}/${props.room.id}`
const clipboard_unavailable = navigator.clipboard == null;

function copyRoomUrl() {
  if (clipboard_unavailable) {
    return
  }

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2500)

  navigator.clipboard.writeText(room_url)

  toast.success(t('features.room.copy_link.copied'), {
    timeout: 2500,
  });
}
</script>

<style scoped lang="scss"></style>
