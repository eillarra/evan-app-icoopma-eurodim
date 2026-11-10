<template>
  <div v-if="about">
    <h6 class="q-mb-lg">{{ title }}</h6>

    <q-tabs v-model="tab" no-caps dense align="left" class="text-orange-8">
      <q-tab name="about" label="About" />
      <q-tab name="topics" label="Topics" />
      <q-tab name="committees" label="Committees" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" class="q-mt-lg">
      <q-tab-panel name="about" class="q-pa-none">
        <MarkedDiv :text="about.value" />
      </q-tab-panel>
      <q-tab-panel name="topics" class="q-pa-none">
        <MarkedDiv :text="topics?.value" />
      </q-tab-panel>
      <q-tab-panel name="committees" class="q-pa-none">
        <MarkedDiv :text="committees?.value" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { EvanContent } from '@evan/types';

defineProps<{
  title: string;
  about?: EvanContent;
  topics?: EvanContent;
  committees?: EvanContent;
}>();

const tab = ref('about');
</script>
