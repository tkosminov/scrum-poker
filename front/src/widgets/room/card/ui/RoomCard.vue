<template>
  <v-row>
    <template v-if="room">
      <v-col cols="12" md="4"></v-col>

      <v-col cols="12" md="4">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              {{ room.title }}
            </v-list-item-title>

            <template v-slot:append>
              <v-list-item-action end>
                <RoomCopyLinkFeature :room="room" />

                <v-divider vertical class="ml-2 mr-2"></v-divider>
                
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props" size="small" variant="tonal"></v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <RoomUpdateFeature :room="room" />
                    </v-list-item>
                    <v-list-item>
                      <RoomDeleteFeature :room="room" />
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="4"></v-col>
    </template>
  </v-row>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { RoomDeleteFeature, RoomUpdateFeature, RoomCopyLinkFeature } from '@/features';
import { useRoomModel, CurrentRoomQuery } from '@/entities';

const room_model = useRoomModel()
const { current_room } = storeToRefs(room_model)
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

watch(
  () => current_room.value,
  (curr_current_room, _prev_current_room) => {
    room.value = curr_current_room;
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss"></style>
