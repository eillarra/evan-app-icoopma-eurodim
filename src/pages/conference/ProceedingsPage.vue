<template>
  <div v-if="content">
    <h6 class="q-mb-lg">Journal of Materials Science: Materials in Electronics</h6>
    <img src="/springer.png" class="springer float-right q-ml-lg q-mb-lg" alt="Springer" />
    <MarkedDiv :text="content.value" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

const eventStore = useEventStore();
const content = computed(() => eventStore.contentsDict['proceedings']);

useMeta({ title: 'Proceedings' });
</script>
