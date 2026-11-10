<template>
  <div v-if="event">
    <h6 class="q-mb-lg">{{ event.full_name }}</h6>

    <q-tabs v-model="tab" no-caps dense align="left" class="text-orange-8">
      <q-tab name="about" label="About" />
      <q-tab name="topics" label="Topics" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" class="q-mt-lg">
      <q-tab-panel name="about" class="q-pa-none">
        <div
          class="row"
          :class="{
            'q-col-gutter-y-md q-col-gutter-x-xl': $q.screen.gt.sm,
            'q-col-gutter-md': $q.screen.lt.md,
          }"
        >
          <div class="col-12 col-md-7">
            <MarkedDiv :text="event.presentation" />
          </div>
          <div class="col-12 col-md-5">
            <ImportantDates :dates="importantDates" />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="topics" class="q-pa-none">
        <MarkedDiv :text="topics?.value" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMeta } from 'quasar';

import ImportantDates from '@/components/ImportantDates.vue';
import { useSchoolStore } from '@/stores/school';

const schoolStore = useSchoolStore();
const event = computed(() => schoolStore.event);
const topics = computed(() => schoolStore.contentsDict['topics']);
const importantDates = computed(() => event.value?.extra_data?.important_dates ?? []);

const tab = ref('about');

useMeta({ title: 'Doctoral School' });
</script>
