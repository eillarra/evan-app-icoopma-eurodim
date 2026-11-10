<template>
  <div class="fullscreen bg-blue-grey-1 text-dark flex flex-center">
    <q-card flat bordered class="q-pa-lg text-center" style="max-width: 420px">
      <div class="text-h5 q-mb-sm">Page not found</div>
      <p class="q-mb-lg">This page is not part of the ICOOPMA-EuroDIM archive.</p>
      <q-btn color="primary" no-caps :to="{ name: 'conference-home' }" label="Back to the conference" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({ title: 'Page not found' });
</script>
