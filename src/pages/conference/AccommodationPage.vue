<template>
  <div v-if="content">
    <h6 class="q-mb-lg">Accommodation</h6>

    <div
      class="row justify-between q-mb-xl"
      :class="{
        'q-col-gutter-xl': $q.screen.gt.sm,
        'q-col-gutter-md': $q.screen.lt.md,
      }"
    >
      <div class="col-12 col-md-6">
        <MarkedDiv :text="content.value" />
      </div>
      <div class="col-12 col-md-5">
        <q-btn
          unelevated
          type="a"
          :href="VISIT_GHENT_ACCOMMODATION_URL"
          target="_blank"
          rel="noopener noreferrer"
          color="orange-8"
          label="More info at visit.gent"
          class="full-width"
        />
      </div>
    </div>

    <q-responsive :ratio="2">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1vwYDe9SWobnWHuF4lhEU0fFkyyqYSojs"
        title="Accommodation map"
        loading="lazy"
        class="no-border rounded-borders full-width full-height"
      />
    </q-responsive>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

import { VISIT_GHENT_ACCOMMODATION_URL } from '@/constants';

const eventStore = useEventStore();
const content = computed(() => eventStore.contentsDict['venue.accommodation']);

useMeta({ title: 'Accommodation' });
</script>
