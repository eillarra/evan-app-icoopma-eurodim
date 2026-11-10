<template>
  <TrackTabsPage
    title="ICOOPMA: 9th International Conference on Optical, Optoelectronic and Photonic Materials"
    :about="about"
    :topics="topics"
    :committees="committees"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

import TrackTabsPage from '@/components/TrackTabsPage.vue';

const eventStore = useEventStore();
const contents = computed(() => eventStore.contentsDict);

const about = computed(() => contents.value['icoopma.about']);
const topics = computed(() => contents.value['icoopma.topics']);
const committees = computed(() => contents.value['icoopma.committees']);

useMeta({ title: 'ICOOPMA' });
</script>
