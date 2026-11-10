<template>
  <blockquote v-if="sortedDates.length" class="q-my-xl">
    <strong>Important dates</strong>
    <ul class="q-pl-md">
      <li v-for="date in sortedDates" :key="`${date.label}-${date.start_date}`">
        {{ formatImportantDateLabel(date) }}: {{ date.label }}
      </li>
    </ul>
  </blockquote>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ImportantDate } from '@evan/types';

import { formatImportantDateLabel, sortImportantDates } from '@/utils/dates';

const props = defineProps<{ dates: ImportantDate[] }>();

const sortedDates = computed(() => sortImportantDates(props.dates));
</script>
