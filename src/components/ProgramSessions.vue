<template>
  <div>
    <p v-if="groups.length === 0" class="text-grey-7">The programme will be announced.</p>

    <div v-for="group in groups" :key="group.key">
      <h6 class="text-body1 text-weight-bold q-mt-lg q-mb-sm">{{ group.label }}</h6>
      <q-list separator>
        <q-item v-for="session in group.sessions" :key="session.id" class="td">
          <q-item-section>
            <q-item-label>
              {{ formatSessionTimeRange(session.start_at, session.end_at) }}: {{ session.title }}
            </q-item-label>
            <q-item-label v-if="showMeta" class="program-session-meta">
              <span v-if="sessionRoom(session)">
                <app-icon name="meeting_room" size="xs" class="q-mr-xs" />{{ sessionRoom(session) }}
              </span>
              <span v-if="sessionTrack(session)" class="q-ml-md">
                <app-icon name="label" size="xs" class="q-mr-xs" />{{ sessionTrack(session) }}
              </span>
              <span v-if="sessionChair(session)" class="q-ml-md">
                <app-icon name="chair" size="xs" class="q-mr-xs" />{{ sessionChair(session) }}
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { EvanRoom, EvanSession, EvanTrack } from '@evan/types';
import { getRoomName, getTrackName } from '@evan/utils/program';

import { formatSessionTimeRange, groupSessionsByDay } from '@/utils/dates';

const props = withDefaults(
  defineProps<{
    sessions: EvanSession[];
    rooms?: EvanRoom[];
    tracks?: EvanTrack[];
    showMeta?: boolean;
  }>(),
  {
    rooms: () => [],
    tracks: () => [],
    showMeta: true,
  },
);

const groups = computed(() => groupSessionsByDay(props.sessions));

function sessionRoom(session: EvanSession): string {
  return session.room ? getRoomName(props.rooms, session.room, '') : '';
}

function sessionTrack(session: EvanSession): string {
  return session.track ? getTrackName(props.tracks, session.track, '') : '';
}

function sessionChair(session: EvanSession): string {
  const extraData = session.extra_data as { chair?: string | null } | undefined;
  return extraData?.chair ?? '';
}
</script>
