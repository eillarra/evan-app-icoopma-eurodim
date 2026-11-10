<template>
  <div v-if="content">
    <h6 class="q-mb-lg">Organizing committee</h6>
    <div
      class="row justify-between q-mb-xl"
      :class="{
        'q-col-gutter-xl': $q.screen.gt.sm,
        'q-col-gutter-md': $q.screen.lt.md,
      }"
    >
      <div class="col-12 col-md-9">
        <MarkedDiv :text="content.value" class="people-marked" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

const eventStore = useEventStore();
const content = computed(() => eventStore.contentsDict['committee']);

useMeta({ title: 'Organizing committee' });
</script>
