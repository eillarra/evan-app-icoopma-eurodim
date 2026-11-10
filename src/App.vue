<template>
  <router-view />
</template>

<script setup lang="ts">
import { Loading, useMeta } from 'quasar';
import { ref, watchEffect } from 'vue';

import { useEventStore } from '@evan/stores/event';
import { setupDates } from '@evan/utils/dates';

import { CONFERENCE_EVENT_CODE, EVENT_TIMEZONE } from '@/constants';
import { useSchoolStore } from '@/stores/school';

setupDates(EVENT_TIMEZONE, false);

Loading.show({ delay: 0 });

const conferenceStore = useEventStore();
const schoolStore = useSchoolStore();

const conferenceSettled = ref(false);
const schoolSettled = ref(false);

async function loadConference(): Promise<void> {
  try {
    await conferenceStore.init(CONFERENCE_EVENT_CODE);
    await conferenceStore.fetchProgramData();
  } catch (err) {
    console.error('Error loading the conference:', err);
  } finally {
    conferenceSettled.value = true;
  }
}

async function loadSchool(): Promise<void> {
  try {
    await schoolStore.init();
  } catch (err) {
    console.error('Error loading the Doctoral School:', err);
  } finally {
    schoolSettled.value = true;
  }
}

void loadConference();
void loadSchool();

watchEffect(() => {
  if (conferenceSettled.value && schoolSettled.value) {
    Loading.hide();
  }
});

useMeta({
  title: 'ICOOPMA-EuroDIM 2022',
  titleTemplate: (title) => (title === 'ICOOPMA-EuroDIM 2022' ? title : `${title} - ICOOPMA-EuroDIM 2022`),
});
</script>
