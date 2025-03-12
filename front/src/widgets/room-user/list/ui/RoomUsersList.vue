<template>
  <v-row :class="[md_and_up ? '' : 'scroll--horizontal']">
    <v-col
      v-for="room_user in room_users"
      :key="room_user.id"
      sm="auto"
      class="d-flex child-flex justify-center"
    >
      <RoomUserCardWidget :room_user="room_user" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import { useDisplay } from 'vuetify'
import { RoomUserCardWidget } from '@/widgets'
import { useRoomUserModel, RoomUsersQuery } from '@/entities';

const display = useDisplay()
const room_user_model = useRoomUserModel()
const room_users: Ref<RoomUsersQuery['roomUsers'] | undefined> = ref(undefined);

const md_and_up: Ref<boolean> = ref(false);

watch(
  () => display.mdAndUp,
  (curr_value, _prev_value) => {
    if (curr_value) {
      md_and_up.value = curr_value.value;
    }
  },
  { deep: true, immediate: true }
)

room_user_model.$subscribe((_mutation, state) => {
  room_users.value = state.room_users;
});
</script>

<style scoped lang="scss">
.scroll--horizontal {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  flex-wrap: nowrap;
}
</style>
