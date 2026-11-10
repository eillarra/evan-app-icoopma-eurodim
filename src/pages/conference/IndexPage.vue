<template>
  <div v-if="event">
    <h6 class="q-mb-lg">{{ event.full_name }}</h6>

    <q-banner rounded :inline-actions="$q.screen.gt.sm" class="bg-light-blue-1 text-dark q-my-lg">
      <template #avatar>
        <app-icon name="photo" />
      </template>
      Check the photos of the conference
      <template #action>
        <q-btn
          flat
          color="light-blue-8"
          label="View album"
          type="a"
          target="_blank"
          rel="noopener noreferrer"
          :href="PHOTO_ALBUM_URL"
        />
      </template>
    </q-banner>

    <div
      class="row q-my-lg"
      :class="{
        'q-col-gutter-y-md q-col-gutter-x-xl': $q.screen.gt.sm,
        'q-col-gutter-md': $q.screen.lt.md,
      }"
    >
      <div class="col-12 col-md-7">
        <MarkedDiv :text="event.presentation" />
        <ImportantDates :dates="importantDates" />
      </div>
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-pa-md">
          <div class="text-subtitle1 text-weight-medium q-mb-sm">Follow the conference</div>
          <p class="text-body2 q-mb-md">Updates and photos are also shared on Twitter.</p>
          <q-btn
            unelevated
            color="orange-8"
            type="a"
            :href="TWITTER_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <app-icon name="launch" size="sm" class="q-mr-sm" />
            Follow @icoopmaeurodim
          </q-btn>
        </q-card>
      </div>
    </div>

    <q-responsive :ratio="$q.screen.lt.md ? 1 : 2">
      <q-img src="/canoeing.jpg" class="rounded-borders" />
    </q-responsive>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import { useEventStore } from '@evan/stores/event';

import ImportantDates from '@/components/ImportantDates.vue';
import { PHOTO_ALBUM_URL, TWITTER_URL } from '@/constants';

const eventStore = useEventStore();
const event = computed(() => eventStore.event);
const importantDates = computed(() => event.value?.extra_data?.important_dates ?? []);

useMeta({ title: 'Home' });
</script>
