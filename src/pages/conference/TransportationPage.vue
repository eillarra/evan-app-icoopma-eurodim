<template>
  <div v-if="content">
    <h6 class="q-mb-lg">Transportation</h6>

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
          :href="VISIT_GHENT_TRANSPORT_URL"
          target="_blank"
          rel="noopener noreferrer"
          color="orange-8"
          label="More info at visit.gent"
          class="full-width"
        />
        <q-responsive :ratio="1" class="q-mt-xl">
          <q-img src="/transport.jpg" class="rounded-borders" />
        </q-responsive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

import { VISIT_GHENT_TRANSPORT_URL } from '@/constants';

const eventStore = useEventStore();
const content = computed(() => eventStore.contentsDict['venue.transportation']);

useMeta({ title: 'Transportation' });
</script>
