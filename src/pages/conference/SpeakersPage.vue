<template>
  <div v-if="plenary || invited">
    <div
      class="row reverse q-mb-xl q-mt-none"
      :class="{ 'q-col-gutter-x-xl': $q.screen.gt.sm }"
    >
      <div class="col-12 col-md-6">
        <h6 class="q-mb-lg">Plenary speakers</h6>
        <MarkedDiv :text="plenary?.value" class="people-marked" />
      </div>
      <div class="col-12 col-md-6">
        <h6 class="q-mb-lg">Invited speakers</h6>
        <MarkedDiv :text="invited?.value" class="people-marked" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

const eventStore = useEventStore();
const plenary = computed(() => eventStore.contentsDict['speakers.plenary']);
const invited = computed(() => eventStore.contentsDict['speakers']);

useMeta({ title: 'Invited speakers' });
</script>
