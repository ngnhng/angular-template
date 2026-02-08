# Repository Guidelines

## Project Structure & Module Organization

This repository is a PNPM workspace for TypeScript packages.

- Root config: `package.json`, `pnpm-workspace.yaml`, `tsconfig.json`, `vitest.config.ts`, `.oxfmtrc.jsonc`, `.oxlintrc.jsonc`
- Packages: `packages/*` (currently `packages/pkg1`)
- Source code: `packages/<pkg>/src`
- Tests: `packages/<pkg>/tests`
- Build/test outputs: `dist/` (including Vitest reports under `dist/vitest/`)

Keep new packages under `packages/<name>` and expose public API from `src/index.ts`.

## Build, Test, and Development Commands

Run commands from repository root unless noted.

- `pnpm install`: install workspace dependencies
- `pnpm run build`: build all packages via recursive workspace scripts
- `pnpm run test`: run Vitest with coverage
- `pnpm run test-ci`: run tests once for CI
- `pnpm run test-ui`: open Vitest UI
- `pnpm run fmt` / `pnpm run fmt-ci`: format or check formatting
- `pnpm run lint` / `pnpm run fix`: lint or apply lint fixes
- `pnpm run docs`: generate TypeDoc output

For package-local iteration: `cd packages/pkg1 && pnpm run dev`.

## Coding Style & Naming Conventions

- Language: TypeScript (ESM, strict mode enabled)
- Formatting (Oxfmt): tabs, single quotes, no semicolons, trailing commas
- Linting (Oxlint): correctness-focused with TypeScript, promise, import, and vitest plugins
- Naming:
  - files: kebab-case where practical
  - exported functions/types: clear, descriptive camelCase/PascalCase
  - tests: `*.test.ts` in `tests/`

## Testing Guidelines

- Framework: Vitest with V8 coverage
- Coverage scope includes `packages/**/src`
- Place unit tests close to package boundaries in `packages/<pkg>/tests`
- Prefer behavior-focused test names, e.g. `test('greet returns a personalized message', ...)`

Run `pnpm run test` before opening a PR. Add tests for every behavioral change.

## Commit & Pull Request Guidelines

Current history only includes an initial commit, so use a clear conventional style going forward:

- Commit format: `type(scope): short summary` (e.g., `feat(pkg1): add parse utility`)
- Keep commits focused and buildable
- PRs should include:
  - concise description of what changed and why
  - linked issue (if available)
  - test evidence (`pnpm run test`, `pnpm run lint`, `pnpm run fmt-ci`)
  - screenshots only when UI/report output changes are relevant
