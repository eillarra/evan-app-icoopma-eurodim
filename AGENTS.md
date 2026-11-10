# Agent guidance - ICOOPMA-EuroDIM 2022 archive

Canonical source of truth for AI coding agents in this repo. `CLAUDE.md` and
`.github/copilot-instructions.md` symlink here.

## Core philosophy

- Challenge ambiguous, complex, or risky requests; suggest better alternatives.
- Maintainability first; KISS & YAGNI; consistency over novelty; self-documenting code,
  type hints everywhere, comments only for non-obvious _why_.

## Stack

- **Backend**: none. Content and programme data are fetched from the Evan API
  (`evan.ugent.be`) at runtime.
- **Frontend**: Vue 3 + Quasar 2 (Vite) SPA/PWA, TypeScript, Pinia. Builds to `dist/pwa`.
- **Shared code**: `evan-kit`, vendored under `evan-kit/` and consumed as a
  `file:./evan-kit` dependency; `@evan/*` import alias to `evan-kit/src`.
- **Events**: conference `icoopma-eurodim`; Doctoral School `icoopma-eurodim-school`.
  Never share a global event code between them.

## Commands

Node 24; yarn 4 via corepack. `yarn <script>` from `package.json`
(`postinstall` runs `quasar prepare`).

- `yarn dev` - live Evan API.
- `yarn build` - PWA build in `dist/pwa`.
- `yarn lint` / `yarn type-check` / `yarn format`.

There is no unit-test runner in this repo; logic worth testing belongs in the upstream
`evan-kit` repository, which has its own vitest suite.

## Commit conventions

Conventional Commits: `type(scope): description` - imperative, lowercase, no trailing
period, one line, no attribution trailers. Types: `feat` / `fix` / `docs` / `refactor` /
`test` / `chore` / `perf`. Breaking: `feat!:` / `BREAKING CHANGE:` footer. Never vague
(`wip`, `update`).

## TypeScript

- TS mandatory, no plain JS. No `any` without justification comment; `unknown` + type
  guards for untrusted input.
- `strict` in `tsconfig.json`; never relax flags to silence errors - fix the code.
- `interface` for extensible object shapes, `type` for unions / mapped types.
- ESLint flat config + Prettier; `yarn lint && yarn format` before commit.

## Vue

- Composition API; `<script setup lang="ts">` mandatory. No Options API.
- Pinia only for state. Quasar components + utility classes over native HTML / custom CSS.
- No API-calling logic in components - Pinia store or composable.
- Complex logic out of `<script setup>`: pure functions in `src/utils/`, stateful logic in
  composables.
- `MarkedDiv` takes `:text` (markdown), not `:content`.

## Content rules

- Content is managed in Evan, never hardcoded in pages.
- Do not add abstracts, papers, or an abstract search: the events have none.
- Registration forms stay in Evan; this app only shows fees and the closed state.
- Preserve the legacy URL paths and trailing slashes.
- Never commit personal data.
