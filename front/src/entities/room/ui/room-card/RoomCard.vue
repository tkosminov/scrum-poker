<template>
  <v-card variant="tonal">
    <v-card-title>
      <router-link
        :to="{ name: 'room', params: { id: props.room.id } }"
      >
        {{ props.room.title }}
      </router-link>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { RoomsQuery } from '../../api';

const props = defineProps<{ room: RoomsQuery['rooms'][0] }>();
</script>

<style scoped lang="scss"></style>
