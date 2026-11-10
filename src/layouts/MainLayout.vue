<template>
  <q-layout view="lHh LpR lff">
    <q-drawer
      v-model="drawerOpen"
      show-if-above
      side="left"
      :width="250"
      :breakpoint="1023"
      class="bg-blue-grey-1 q-pt-lg q-pl-sm text-weight-medium"
    >
      <q-scroll-area class="fit">
        <p>
          <img src="/logo.svg" class="q-ma-sm icoodim" alt="ICOOPMA-EuroDIM" />
        </p>
        <q-list dense @click="closeDrawerOnMobile">
          <template v-for="item in navItems" :key="item.label">
            <q-separator v-if="item.separator" class="q-my-md" />

            <q-item
              v-if="item.to"
              clickable
              :to="item.to"
              exact
              active-class="text-orange-8"
              :class="item.className"
            >
              <q-item-section avatar><app-icon :name="item.icon" /></q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
              <q-item-section v-if="item.sideIcon" side>
                <app-icon :name="item.sideIcon" size="xs" class="text-grey-5" />
              </q-item-section>
            </q-item>

            <q-item
              v-else
              clickable
              tag="a"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <q-item-section avatar><app-icon :name="item.icon" /></q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
              <q-item-section v-if="item.sideIcon" side>
                <app-icon :name="item.sideIcon" size="xs" class="text-grey-5" />
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page :class="pagePadding">
        <div class="app-container row">
          <div class="col-12 col-md-10 col-lg-9">
            <h5 v-if="$q.screen.lt.md" class="q-mt-md q-mb-none">
              <q-btn flat round dense class="menu-icon" @click="drawerOpen = !drawerOpen">
                <app-icon name="menu" />
              </q-btn>
              <span class="q-ml-sm">{{ eventName }}</span>
            </h5>
            <h4 v-else class="q-mt-sm q-mb-none">{{ eventName }}</h4>

            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer class="bg-transparent text-dark app-footer" :class="footerPadding">
      <div class="app-container">
        <p class="text-caption q-mt-lg">Sponsors</p>
        <div class="row items-center q-col-gutter-y-lg q-col-gutter-x-xl q-mb-xl">
          <div
            v-for="sponsor in sponsorsWithLogo"
            :key="sponsor.id"
            class="col-4 col-sm-3 col-md-2 text-center"
          >
            <a :href="sponsor.website" target="_blank" rel="noopener noreferrer">
              <img :src="sponsor.logo" :title="sponsor.name" :alt="sponsor.name" class="logo" />
            </a>
          </div>
        </div>

        <div class="row justify-between text-caption">
          <div class="col-12 col-md-8">
            <p>
              &copy; 2021 Ghent University. The images on this web site are reproduced with the
              permission of the copyright owner,
              <a
                href="https://stad.gent/ghent-international"
                target="_blank"
                rel="noopener noreferrer"
                class="inherit"
                >Stad Gent</a
              >.
            </p>
          </div>
          <div class="col-12 col-md-4" :class="{ 'text-right': $q.screen.gt.sm }">
            <div class="q-gutter-x-md">
              <a href="https://evan.ugent.be/privacy/" target="_blank" rel="noopener noreferrer" class="inherit"
                >Privacy</a
              >
              <a :href="`mailto:${SPONSORS_EMAIL}`" class="inherit">
                <app-icon name="email" size="xs" class="q-mr-xs" />Contact</a
              >
            </div>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';

import type { EvanSponsor } from '@evan/types';
import { useEventStore } from '@evan/stores/event';

import type { IconName } from '@/assets/icons';
import {
  SPONSORS_EMAIL,
  VISIT_GHENT_URL,
} from '@/constants';
import { useSchoolStore } from '@/stores/school';

interface NavItem {
  label: string;
  icon: IconName;
  to?: RouteLocationRaw;
  href?: string;
  sideIcon?: IconName;
  separator?: boolean;
  className?: string;
}

type SponsorWithLogo = EvanSponsor & { logo: string };

const $q = useQuasar();
const route = useRoute();
const conferenceStore = useEventStore();
const schoolStore = useSchoolStore();

const drawerOpen = ref(false);

const isSchool = computed<boolean>(() => route.meta.event === 'school');
const activeEvent = computed(() => (isSchool.value ? schoolStore.event : conferenceStore.event));
const eventName = computed(() => activeEvent.value?.name ?? 'ICOOPMA-EuroDIM');

const pagePadding = computed(() => ($q.screen.gt.sm ? 'q-py-lg q-px-xl' : 'q-pa-md'));
const footerPadding = computed(() => ($q.screen.gt.sm ? 'q-py-lg q-px-xl' : 'q-pa-md'));

const sponsorsWithLogo = computed<SponsorWithLogo[]>(() =>
  (activeEvent.value?.sponsors ?? [])
    .map((sponsor) => ({ ...sponsor, logo: sponsor.files?.[0]?.file }))
    .filter((sponsor): sponsor is SponsorWithLogo => Boolean(sponsor.logo)),
);

const conferenceNav: NavItem[] = [
  { label: 'Home', icon: 'home', to: { name: 'conference-home' } },
  { label: 'ICOOPMA', icon: 'graphic_eq', to: { name: 'icoopma' } },
  { label: 'EuroDIM', icon: 'grid_3x3', to: { name: 'eurodim' } },
  { label: 'Invited speakers', icon: 'record_voice_over', to: { name: 'speakers' } },
  { label: 'Program', icon: 'view_week', to: { name: 'program' } },
  {
    label: 'Doctoral School',
    icon: 'school',
    to: { name: 'school-home' },
    sideIcon: 'arrow_forward',
    separator: true,
  },
  { label: 'Registration', icon: 'drive_file_rename_outline', to: { name: 'registration' }, separator: true },
  { label: 'Abstract submission', icon: 'send', to: { name: 'abstracts' } },
  { label: 'Proceedings', icon: 'feed', to: { name: 'proceedings' } },
  { label: 'Venue', icon: 'place', to: { name: 'venue' }, separator: true },
  { label: 'Accommodation', icon: 'hotel', to: { name: 'accommodation' } },
  { label: 'Transportation', icon: 'tram', to: { name: 'transportation' } },
  {
    label: 'About Ghent',
    icon: 'holiday_village',
    href: VISIT_GHENT_URL,
    sideIcon: 'launch',
  },
  { label: 'Call for sponsors', icon: 'shield', to: { name: 'sponsors-call' }, separator: true },
  { label: 'Committee', icon: 'groups', to: { name: 'committee' } },
];

const schoolNav: NavItem[] = [
  { label: 'Conference', icon: 'arrow_back', to: { name: 'conference-home' } },
  { label: 'Doctoral School', icon: 'school', to: { name: 'school-home' }, separator: true },
  { label: 'Invited teachers', icon: 'record_voice_over', to: { name: 'school-teachers' } },
  { label: 'Program', icon: 'view_week', to: { name: 'school-program' } },
  { label: 'Registration', icon: 'drive_file_rename_outline', to: { name: 'school-registration' }, separator: true },
  { label: 'Venue', icon: 'place', to: { name: 'school-venue' }, separator: true },
];

const navItems = computed<NavItem[]>(() => (isSchool.value ? schoolNav : conferenceNav));

function closeDrawerOnMobile(): void {
  if ($q.screen.lt.md) {
    drawerOpen.value = false;
  }
}
</script>
