<template>
  <div v-if="content">
    <div
      class="row q-mb-xl q-mt-none"
      :class="{ 'q-col-gutter-x-xl': $q.screen.gt.sm }"
    >
      <div class="col-12 col-md-6">
        <h6 class="q-mb-lg">Invited teachers</h6>
        <MarkedDiv :text="content.value" class="people-marked" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useSchoolStore } from '@/stores/school';

const schoolStore = useSchoolStore();
const content = computed(() => schoolStore.contentsDict['teachers']);

useMeta({ title: 'Invited teachers' });
</script>
