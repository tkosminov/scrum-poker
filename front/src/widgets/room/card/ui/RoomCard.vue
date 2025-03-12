<template>
  <v-row>
    <template v-if="room">
      <v-col cols="12" md="4" class="hidden-sm-and-down"></v-col>

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

                <v-divider vertical class="ml-2 mr-2 d-xxl-none d-xl-none d-lg-none d-md-none"></v-divider>

                <v-btn
                  class="d-xxl-none d-xl-none d-lg-none d-md-none"
                  icon="mdi-wrench"
                  variant="tonal"
                  size="small"
                  @click="drawer = !drawer"
                ></v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="4" class="hidden-sm-and-down"></v-col>

      <v-navigation-drawer
        v-model="drawer"
        :location="'bottom'"
        temporary
      >
        <TasksListWidget />
      </v-navigation-drawer>
    </template>
  </v-row>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { TasksListWidget } from '@/widgets'
import { RoomDeleteFeature, RoomUpdateFeature, RoomCopyLinkFeature } from '@/features';
import { useRoomModel, CurrentRoomQuery } from '@/entities';

const display = useDisplay()
const room_model = useRoomModel()
const { current_room } = storeToRefs(room_model)
const room: Ref<CurrentRoomQuery['rooms'][0] | undefined> = ref(undefined);

const drawer: Ref<boolean> = ref(false);

watch(
  () => display.mdAndUp,
  (curr_value, _prev_value) => {
    if (curr_value.value) {
      drawer.value = false;
    }
  },
  { deep: true, immediate: true }
)

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
