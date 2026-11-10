# ICOOPMA-EuroDIM 2022 archive

Static PWA archive of the 9th ICOOPMA and 14th EuroDIM conference (Ghent, 4-8 July
2022) and its Doctoral School (2-3 July 2022). Content and programme data are read
from the Evan API; nothing is edited here.

The legacy Flask/Vue 2 site was at `/` for the conference and `/doctoral-school/` for
the school. Those paths, and their trailing slashes, are preserved.

## Stack

Vue 3 + TypeScript + Pinia + Quasar 2 (Vite), built as a PWA. `evan-kit` provides the
conference event store and shared markdown/date helpers; the Doctoral School uses an
app-level store so the two events never share a global event code.

## Commands

Node 24 and yarn 4 via corepack.

```bash
yarn install
yarn dev          # live Evan API
yarn lint
yarn type-check
yarn build        # dist/pwa
```

## Data

- Conference: `icoopma-eurodim`.
- Doctoral School: `icoopma-eurodim-school`.
- Live API: `https://evan.ugent.be/api/v1/`.
- Registration is handled by Evan; this app only shows fees and the open/closed state.
- Programme sessions come from `sessions/`. The conference programme PDF is the
  `program` content file. There is no abstract search.

## Deployment

`Dockerfile` builds `dist/pwa` and serves it with nginx, including the history-mode
fallback. Set the domain to this container after the DNS switch.

## Privacy

Never commit personal data. The public conference content (speakers, committees,
chairs) is read from Evan at runtime, not stored in this repository.
