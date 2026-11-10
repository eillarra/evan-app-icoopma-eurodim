import { register } from 'register-service-worker';

register(import.meta.env.QUASAR_SERVICE_WORKER_FILE, {
  offline() {
    console.info('The ICOOPMA-EuroDIM archive is running offline.');
  },
  error(err) {
    console.error('Service worker registration failed:', err);
  },
});
