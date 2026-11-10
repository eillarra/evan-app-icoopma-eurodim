import { defineBoot } from '#q-app';

import MarkedDiv from '@evan/components/MarkedDiv.vue';

import AppIcon from '@/components/AppIcon.vue';

export default defineBoot(({ app }) => {
  app.component('MarkedDiv', MarkedDiv);
  app.component('AppIcon', AppIcon);
});
