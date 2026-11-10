<template>
  <div v-if="venue">
    <h6 class="q-mb-lg">Venue: {{ venue.name }}</h6>

    <q-btn
      unelevated
      type="a"
      :href="mapUrl"
      target="_blank"
      rel="noopener noreferrer"
      color="orange-8"
      label="View on Google Maps"
      class="float-right q-ml-lg q-mb-lg"
    />

    <MarkedDiv :text="venue.presentation" class="q-mb-xl" />

    <q-responsive :ratio="$q.screen.lt.md ? 1 : 2">
      <q-img src="/het-pand--patio.jpg" class="rounded-borders" />
    </q-responsive>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

import { venueMapUrl } from '@/utils/venue';

const eventStore = useEventStore();
const venue = computed(() => eventStore.mainVenue);
const mapUrl = computed(() => (venue.value ? venueMapUrl(venue.value) : 'https://www.google.com/maps'));

useMeta({ title: 'Venue' });
</script>
