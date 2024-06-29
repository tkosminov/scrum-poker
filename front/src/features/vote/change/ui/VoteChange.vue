<template>
  <div
    class="card text-center mb-3 cursor-pointer"
    style="width: 120px;"
    @click="changeVote"
    :class="{ 'bg-secondary': is_current }"
  >
    <div class="card-body">
      <h1>{{ point ? point : '?' }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVoteModel } from '@/entities';
import { Ref, ref } from 'vue';

const props = defineProps<{ task_id: string, point: number }>();

const vote_model = useVoteModel();
const is_current: Ref<boolean> = ref(false);

vote_model.$subscribe((_mutation, state) => {
  is_current.value = state.current_vote === props.point;
})

async function changeVote() {
  if (!is_current.value) {
    await vote_model.change({ task_id: props.task_id, point: props.point })
  }
}
</script>

<style scoped lang="scss">
.cursor-pointer {
  cursor: pointer !important;
}
</style>
