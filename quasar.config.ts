/* eslint-env node */

import path from 'path';

// Configuration for your app
// https://quasar.dev/quasar-cli-vite/quasar-config-js

import { defineConfig } from '#q-app';

export default defineConfig(() => {
  return {
    // https://quasar.dev/quasar-cli-vite/boot-files
    boot: ['components'],

    // https://quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: ['material-icons-outlined', 'roboto-font'],

    // https://quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: 'baseline-widely-available',
        node: 'node20',
      },

      vueRouterMode: 'history',

      // v3 dropped the v2 default aliases (boot/components/layouts/pages/assets/stores)
      alias: {
        src: path.resolve(__dirname, 'src'),
        boot: path.resolve(__dirname, 'src/boot'),
        layouts: path.resolve(__dirname, 'src/layouts'),
        pages: path.resolve(__dirname, 'src/pages'),
      },

      extendViteConf(viteConf) {
        // Add path aliases
        if (!viteConf.resolve) viteConf.resolve = {};
        if (!viteConf.resolve.alias) viteConf.resolve.alias = {};

        viteConf.resolve.alias = {
          ...viteConf.resolve.alias,
          '@': path.resolve(__dirname, 'src'),
          '@evan': path.resolve(__dirname, 'evan-kit/src'),
        };
      },

      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: {
              tsconfigPath: 'tsconfig.vue-tsc.json',
            },
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    // https://quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      open: false,
    },

    // https://quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      plugins: ['Loading', 'Meta'],
      iconSet: 'material-icons-outlined',
    },

    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli-vite/quasar-config-js#pwa
    pwa: {
      workboxMode: 'GenerateSW',
      extendPWAGenerateSWOptions(opts) {
        return {
          ...opts,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/evan\.ugent\.be\/api\/v1\//,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'evan-api',
                expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
            {
              urlPattern: /^https:\/\/evan\.ugent\.be\/media\//,
              handler: 'CacheFirst',
              options: {
                cacheName: 'evan-media',
                expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        };
      },
    },
  };
});
