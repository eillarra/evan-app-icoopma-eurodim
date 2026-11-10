import type { EvanContent, EvanEvent, EvanSession } from '@evan/types';
import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';

import { EVAN_SITE, SCHOOL_EVENT_CODE } from '@/constants';

const EVENT_URL = `${EVAN_SITE}/api/v1/events/${SCHOOL_EVENT_CODE}/`;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Evan API request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

async function fetchList<T>(url: string): Promise<T[]> {
  const data = await fetchJson<{ results?: T[] } | T[]>(url);
  return Array.isArray(data) ? data : (data.results ?? []);
}

export const useSchoolStore = defineStore('icoodimSchoolEvent', () => {
  const event = shallowRef<EvanEvent | undefined>(undefined);
  const contents = shallowRef<EvanContent[] | undefined>(undefined);
  const sessions = shallowRef<EvanSession[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const _loaded = computed<boolean>(() => !!(event.value && contents.value));

  const contentsDict = computed<Record<string, EvanContent>>(() => {
    const dict: Record<string, EvanContent> = {};
    contents.value?.forEach((content) => {
      dict[content.key] = content;
    });
    return dict;
  });

  const mainVenue = computed(() => event.value?.venues?.find((venue) => venue.is_main));

  const sponsors = computed(() => event.value?.sponsors ?? []);

  async function init(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const [eventPayload, contentPayload, sessionPayload] = await Promise.all([
        fetchJson<EvanEvent>(EVENT_URL),
        fetchList<EvanContent>(`${EVENT_URL}contents/`),
        fetchList<EvanSession>(`${EVENT_URL}sessions/`),
      ]);
      event.value = eventPayload;
      contents.value = contentPayload;
      sessions.value = sessionPayload;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load the Doctoral School.';
      console.error('Error loading the Doctoral School:', err);
    } finally {
      loading.value = false;
    }
  }

  return {
    event,
    contents,
    sessions,
    loading,
    error,
    _loaded,
    contentsDict,
    mainVenue,
    sponsors,
    init,
  };
});
