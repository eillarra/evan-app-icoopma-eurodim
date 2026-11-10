<template>
  <q-markup-table flat class="q-my-lg">
    <thead>
      <tr>
        <th></th>
        <th v-if="hasEarly" class="text-center">Early registration</th>
        <th class="text-center">Late registration</th>
        <th v-if="hasOnsite" class="text-center">On-site registration</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="fee in fees" :key="fee.type">
        <td>{{ fee.notes }}</td>
        <td v-if="hasEarly" class="text-center">{{ formatFee(fee.early_value) }}</td>
        <td class="text-center">{{ formatFee(fee.value) }}</td>
        <td v-if="hasOnsite" class="text-center">{{ formatFee(fee.onsite_value) }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { EvanFee } from '@evan/types';

const props = defineProps<{ fees: EvanFee[] }>();

const hasEarly = computed(() => props.fees.some((fee) => fee.early_value !== null));
const hasOnsite = computed(() => props.fees.some((fee) => fee.onsite_value !== null));

function formatFee(value: number | null): string {
  if (value === null) return '—';
  if (value === 0) return 'Free';
  return `${value} EUR`;
}
</script>
