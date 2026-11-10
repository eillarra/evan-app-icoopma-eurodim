<template>
  <span class="app-icon" :class="`app-icon--${size}`" aria-hidden="true" v-html="svg" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { icons, type IconName } from '@/assets/icons';

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }>(),
  { size: 'md' },
);

const svg = computed(() => icons[props.name]);
</script>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  vertical-align: middle;
}

.app-icon :deep(svg) {
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.app-icon--xs {
  font-size: 16px;
}

.app-icon--sm {
  font-size: 20px;
}

.app-icon--md {
  font-size: 24px;
}

.app-icon--lg {
  font-size: 28px;
}
</style>
