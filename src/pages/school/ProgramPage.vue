<template>
  <div>
    <h6 class="q-mb-lg">Program</h6>
    <ProgramSessions :sessions="sessions" :tracks="tracks" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import ProgramSessions from '@/components/ProgramSessions.vue';
import { useSchoolStore } from '@/stores/school';

const schoolStore = useSchoolStore();
const sessions = computed(() => schoolStore.sessions);
const tracks = computed(() => schoolStore.event?.tracks ?? []);

useMeta({ title: 'Doctoral School program' });
</script>
