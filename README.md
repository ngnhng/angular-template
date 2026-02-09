# Angular Monorepo Template

This repository is a PNPM workspace centered on an Angular application, with shared TypeScript packages alongside it.

## What this template includes

- Angular app in `apps/onboard` (Angular CLI 21)
- Workspace package support in `packages/*` for reusable libraries/utilities
- Strict TypeScript setup
- Vitest + coverage at workspace level
- Oxfmt + Oxlint for formatting and linting
- TypeDoc for package documentation generation

## Workspace layout

```text
.
├─ apps/
│  └─ onboard/        # Angular application
├─ packages/
│  └─ pkg1/           # Shared TypeScript package example
├─ package.json       # Root workspace scripts
└─ pnpm-workspace.yaml
```

## Quick start

```bash
pnpm install
pnpm run start
```

The root `start` script runs the Angular app (`onboard`) and serves it locally.

## Angular app workflow

Run these from `apps/onboard`:

```bash
pnpm run start        # ng serve
pnpm run build        # ng build
pnpm run watch        # ng build --watch --configuration development
pnpm run test         # ng test
pnpm run ng generate component my-component
```

## Workspace commands (root)

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `pnpm run start`   | Start the `onboard` Angular app                  |
| `pnpm run build`   | Build all workspace projects that expose `build` |
| `pnpm run test`    | Run Vitest with coverage                         |
| `pnpm run test-ci` | Run Vitest once for CI with coverage             |
| `pnpm run test-ui` | Open Vitest UI                                   |
| `pnpm run fmt`     | Format with Oxfmt                                |
| `pnpm run fmt-ci`  | Check formatting                                 |
| `pnpm run lint`    | Lint with Oxlint                                 |
| `pnpm run fix`     | Apply Oxlint fixes                               |
| `pnpm run docs`    | Generate TypeDoc docs                            |

## Adding code

- Add Angular features in `apps/onboard/src/app`
- Add reusable code in `packages/<name>/src`
- Export package public APIs from `packages/<name>/src/index.ts`
- Add tests under `packages/<name>/tests` (for package code)

## License

Licensed under MIT. See `LICENSE`.
