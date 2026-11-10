<template>
  <div v-if="event">
    <h6 class="q-mb-lg">Registration</h6>

    <RegistrationStatus :event="event" />
    <FeeTable :fees="event.fees" />
    <MarkedDiv :text="content?.value" />

    <p class="text-caption text-grey-7 q-mt-lg">Registration is handled by Evan.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import FeeTable from '@/components/FeeTable.vue';
import RegistrationStatus from '@/components/RegistrationStatus.vue';
import { useSchoolStore } from '@/stores/school';

const schoolStore = useSchoolStore();
const event = computed(() => schoolStore.event);
const content = computed(() => schoolStore.contentsDict['registration']);

useMeta({ title: 'Doctoral School registration' });
</script>
