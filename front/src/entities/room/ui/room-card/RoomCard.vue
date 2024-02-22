<template>
  <div class="card mtb-5">
    <div class="card-body">
      <h4 class="card-title">
        <router-link
          :to="{ name: 'room', params: { id: props.room.id } }"
        >
          {{ props.room.title }}
        </router-link>
      </h4>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ props.room.id }}</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomsQuery } from '../../api';

const props = defineProps<{ room: RoomsQuery['rooms'][0] }>();
</script>

<style scoped lang="scss">
.mtb-5 {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
