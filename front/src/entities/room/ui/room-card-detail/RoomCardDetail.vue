<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ props.room.title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CurrentRoomQuery } from '../../api';

const props = defineProps<{ room: CurrentRoomQuery['rooms'][0] }>();
</script>

<style scoped lang="scss"></style>
