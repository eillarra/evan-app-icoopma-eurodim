<template>
  <TrackTabsPage
    title="EuroDIM: 14th Europhysical Conference on Defects in Insulating Materials"
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

const about = computed(() => contents.value['eurodim.about']);
const topics = computed(() => contents.value['eurodim.topics']);
const committees = computed(() => contents.value['eurodim.committees']);

useMeta({ title: 'EuroDIM' });
</script>
