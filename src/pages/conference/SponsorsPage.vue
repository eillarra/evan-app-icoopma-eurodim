<template>
  <div v-if="content">
    <h6 class="q-mb-lg">Call for sponsors</h6>
    <MarkedDiv :text="content.value" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

const eventStore = useEventStore();
const content = computed(() => eventStore.contentsDict['sponsors.call']);

useMeta({ title: 'Call for sponsors' });
</script>
