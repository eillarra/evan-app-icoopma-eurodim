<template>
  <div v-if="event">
    <h6 class="q-mb-lg">Abstract submission</h6>

    <q-banner
      v-if="abstractOpen"
      rounded
      :inline-actions="$q.screen.gt.sm"
      class="bg-yellow-2 text-dark q-mt-lg q-mb-xl"
    >
      <template #avatar>
        <app-icon name="schedule_send" />
      </template>
      <template v-if="deadline">Submission deadline: <strong>{{ deadline }}</strong></template>
      <template v-else>Abstract submission is open.</template>
      <template #action>
        <q-btn
          flat
          color="orange-8"
          label="Submit abstract"
          type="a"
          target="_blank"
          rel="noopener noreferrer"
          :href="submitUrl"
        />
      </template>
    </q-banner>

    <q-banner v-else rounded :inline-actions="$q.screen.gt.sm" class="bg-red-1 text-dark q-mt-lg q-mb-xl">
      <template #avatar>
        <app-icon name="close" />
      </template>
      Abstract submission is closed.
    </q-banner>

    <MarkedDiv :text="content?.value" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from 'quasar';

import type { EvanEvent } from '@evan/types';
import { useEventStore } from '@evan/stores/event';

import { EVAN_SITE } from '@/constants';
import { formatImportantDateLabel } from '@/utils/dates';

type EventWithUrl = EvanEvent & { url?: string };

interface EventWithAbstracts extends EvanEvent {
  readonly is_open_for_abstract_submission?: boolean;
}

function hasAbstractFlag(value: EvanEvent | undefined): value is EventWithAbstracts {
  return value !== undefined;
}

const eventStore = useEventStore();
const event = computed(() => eventStore.event);
const content = computed(() => eventStore.contentsDict['abstract_submission']);

const abstractOpen = computed(() => {
  if (!hasAbstractFlag(event.value)) return false;
  return Boolean(event.value.is_open_for_abstract_submission);
});

const deadline = computed(() => {
  const date = event.value?.extra_data?.important_dates?.find((item) => /abstract/i.test(item.label));
  return date ? formatImportantDateLabel(date) : null;
});

const submitUrl = computed(() => {
  if (!event.value) return EVAN_SITE;
  const eventWithUrl = event.value as EventWithUrl;
  return `${EVAN_SITE}${eventWithUrl.url ?? `/e/${event.value.code}/`}`;
});

useMeta({ title: 'Abstract submission' });
</script>
