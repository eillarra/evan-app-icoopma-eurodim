import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'conference-home',
        component: () => import('pages/conference/IndexPage.vue'),
      },
      {
        path: 'icoopma/',
        name: 'icoopma',
        component: () => import('pages/conference/IcoopmaPage.vue'),
      },
      {
        path: 'eurodim/',
        name: 'eurodim',
        component: () => import('pages/conference/EurodimPage.vue'),
      },
      {
        path: 'abstract-submission/',
        name: 'abstracts',
        component: () => import('pages/conference/AbstractsPage.vue'),
      },
      {
        path: 'organizing-committee/',
        name: 'committee',
        component: () => import('pages/conference/CommitteePage.vue'),
      },
      {
        path: 'proceedings/',
        name: 'proceedings',
        component: () => import('pages/conference/ProceedingsPage.vue'),
      },
      {
        path: 'program/',
        name: 'program',
        component: () => import('pages/conference/ProgramPage.vue'),
      },
      {
        path: 'registration/',
        name: 'registration',
        component: () => import('pages/conference/RegistrationPage.vue'),
      },
      {
        path: 'speakers/',
        name: 'speakers',
        component: () => import('pages/conference/SpeakersPage.vue'),
      },
      {
        path: 'call-for-sponsors/',
        name: 'sponsors-call',
        component: () => import('pages/conference/SponsorsPage.vue'),
      },
      {
        path: 'venue/',
        name: 'venue',
        component: () => import('pages/conference/VenuePage.vue'),
      },
      {
        path: 'accommodation/',
        name: 'accommodation',
        component: () => import('pages/conference/AccommodationPage.vue'),
      },
      {
        path: 'transportation/',
        name: 'transportation',
        component: () => import('pages/conference/TransportationPage.vue'),
      },
      {
        path: 'doctoral-school/',
        name: 'school-home',
        meta: { event: 'school' },
        component: () => import('pages/school/IndexPage.vue'),
      },
      {
        path: 'doctoral-school/teachers/',
        name: 'school-teachers',
        meta: { event: 'school' },
        component: () => import('pages/school/TeachersPage.vue'),
      },
      {
        path: 'doctoral-school/program/',
        name: 'school-program',
        meta: { event: 'school' },
        component: () => import('pages/school/ProgramPage.vue'),
      },
      {
        path: 'doctoral-school/registration/',
        name: 'school-registration',
        meta: { event: 'school' },
        component: () => import('pages/school/RegistrationPage.vue'),
      },
      {
        path: 'doctoral-school/venue/',
        name: 'school-venue',
        meta: { event: 'school' },
        component: () => import('pages/school/VenuePage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
