<template>
  <div class="card text-center mb-3" style="width: 120px;">
    <div class="card-body">
      <h1>...</h1>
    </div>
    <div
      class="card-footer"
      data-bs-toggle="tooltip"
      data-bs-placement="top" 
      :title="room_user.user.name"
    >
      <p class="text-nowrap text-truncate">
        {{ room_user.user.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomUsersQuery } from '@/entities';

// ... - не выбрано
// ! - выбрано
// [0-9?] - выбор

const props = defineProps<{ room_user: RoomUsersQuery['roomUsers'][0] }>();
</script>

<style scoped lang="scss"></style>
