<template>
  <v-btn
    icon="mdi-share-variant"
    variant="tonal"
    size="small"
    @click="copyRoomUrl"
    :disabled="clipboard_unavailable"
  ></v-btn>
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
