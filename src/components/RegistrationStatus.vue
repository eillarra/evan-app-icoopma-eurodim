<template>
  <q-banner
    v-if="event.is_open_for_registration"
    rounded
    :inline-actions="$q.screen.gt.sm"
    class="bg-yellow-2 text-dark q-my-lg"
  >
    <template #avatar>
      <app-icon name="pending_actions" />
    </template>
    <template v-if="deadline">
      Early registration deadline: <strong>{{ deadline }}</strong>
    </template>
    <template v-else>Registration is open.</template>
    <template #action>
      <q-btn
        flat
        color="orange-8"
        label="Register"
        type="a"
        target="_blank"
        rel="noopener noreferrer"
        :href="registerUrl"
      />
    </template>
  </q-banner>

  <q-banner v-else rounded :inline-actions="$q.screen.gt.sm" class="bg-red-1 text-dark q-my-lg">
    <template #avatar>
      <app-icon name="close" />
    </template>
    Registration is closed.
  </q-banner>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { EvanEvent } from '@evan/types';

import { EVAN_SITE } from '@/constants';
import { formatDeadline } from '@/utils/dates';

type EventWithUrl = EvanEvent & { url?: string };

const props = defineProps<{ event: EvanEvent }>();

const deadline = computed(() => formatDeadline(props.event.registration_early_deadline));

const registerUrl = computed(() => {
  if (props.event.registration_url) return props.event.registration_url;
  const eventWithUrl = props.event as EventWithUrl;
  return `${EVAN_SITE}${eventWithUrl.url ?? `/e/${props.event.code}/`}`;
});
</script>
