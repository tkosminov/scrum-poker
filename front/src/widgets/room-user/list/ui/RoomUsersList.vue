<template>
  <div class="row row-cols-auto">
    <div
      class="col"
      v-for="room_user in room_users"
      :key="room_user.id"
    >
      <RoomUserCardWidget :room_user="room_user"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { RoomUserCardWidget } from '@/widgets'
import { useRoomUserModel, RoomUsersQuery } from '@/entities';

const room_user_model = useRoomUserModel()
const room_users: Ref<RoomUsersQuery['roomUsers'] | undefined> = ref(undefined);

room_user_model.$subscribe((_mutation, state) => {
  room_users.value = state.room_users;
});
</script>

<style scoped lang="scss"></style>
