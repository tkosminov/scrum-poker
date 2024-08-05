<template>
  <template v-if="room_model.loading">
    <CPreloader />
  </template>

  <v-container> 
    <v-row>
      <v-col cols="12" md="4"></v-col>

      <v-col cols="12" md="4">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              {{ $t('pages.rooms.title') }}
            </v-list-item-title>

            <template v-slot:append>
              <v-list-item-action end>
                <RoomCreateFeature />
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>

        <RoomsListWidget />
      </v-col>

      <v-col cols="12" md="4"></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { RoomsListWidget } from '@/widgets'
import { RoomCreateFeature } from '@/features'
import { useRoomModel } from '@/entities';
import { CPreloader, useBreadcrumbModel } from '@/shared'

const room_model = useRoomModel()
const breadcrumb_model = useBreadcrumbModel()

onBeforeMount(async () => {
  breadcrumb_model.set([{
    name: 'pages.rooms.title',
    use_i18n: true,
    is_current: true
  }]);

  room_model.clearState()

  room_model.createSubscribe()
  room_model.updateSubscribe({ channel_id: null })
  room_model.deleteSubscribe({ channel_id: null })

  await room_model.fetchRooms();
})

onBeforeUnmount(() => {
  room_model.unsubscribe();
})
</script>

<style scoped lang="scss"></style>
