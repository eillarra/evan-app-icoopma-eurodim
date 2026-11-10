<template>
  <div>
    <h6 class="q-mb-lg">Program</h6>

    <q-banner v-if="programFile" rounded :inline-actions="$q.screen.gt.sm" class="bg-yellow-2 text-dark q-my-lg">
      <template #avatar>
        <app-icon name="picture_as_pdf" />
      </template>
      Download the complete program in a PDF file.
      <template #action>
        <q-btn
          flat
          color="orange-8"
          label="Download program"
          type="a"
          target="_blank"
          rel="noopener noreferrer"
          :href="programFile"
        />
      </template>
    </q-banner>

    <ProgramSessions :sessions="sessions" :rooms="rooms" :tracks="tracks" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

import ProgramSessions from '@/components/ProgramSessions.vue';
import { firstContentFile } from '@/utils/content';

const eventStore = useEventStore();
const event = computed(() => eventStore.event);
const sessions = computed(() => eventStore.sessions);
const rooms = computed(() => event.value?.venues?.flatMap((venue) => venue.rooms ?? []) ?? []);
const tracks = computed(() => event.value?.tracks ?? []);
const programFile = computed(() => firstContentFile(eventStore.contentsDict['program']));

useMeta({ title: 'Program' });
</script>
