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

## Best practices

In Angular 21 (released November 2025), the best practices for folder structure have solidified around **Standalone Components**, **Signals**, and **Domain-Driven Design (DDD)**. The "NgModule" era is effectively over, and the focus is on grouping code by _feature domain_ rather than technical type.

Here is the recommended folder structure for a scalable Angular 21 Single Page Application (SPA).

### 1. High-Level Philosophy

- **Feature First:** Group files by what they _do_ (e.g., `UserProfile`, `Checkout`), not what they _are_ (e.g., Components, Services).
- **Standalone Everything:** No `*.module.ts` files. Use `imports: []` in components and `provideRouter` in configuration.
- **Signals for State:** Prefer Signals over `BehaviorSubjects` for local and global state.
- **Separation of Concerns:** Keep UI (dumb components) separate from Logic/Data (smart components/stores).

---

### 2. The Recommended Structure (`src/app`)

```text
src/
└── app/
    ├── app.component.ts          # Root component (minimal logic)
    ├── app.config.ts             # Global providers (routes, http, animations)
    ├── app.routes.ts             # Root routing configuration
    │
    ├── core/                     # SINGLETONS & GLOBAL CONFIG
    │   ├── auth/                 # Auth logic (guards, interceptors, services)
    │   ├── interceptors/         # Global HTTP interceptors
    │   ├── services/             # Global, stateless services (e.g., Logging, Analytics)
    │   └── models/               # Global TypeScript interfaces/types
    │
    ├── layouts/                  # SHELL COMPONENTS
    │   ├── main-layout/          # Header + Sidebar + RouterOutlet
    │   └── auth-layout/          # Clean layout for Login/Register pages
    │
    ├── shared/                   # REUSABLE UI (DUMB COMPONENTS)
    │   ├── components/           # Generic UI (Buttons, Cards, Modals)
    │   ├── directives/           # Shared directives (e.g., Tooltip, Permissions)
    │   ├── pipes/                # Shared pipes (e.g., DateFormat)
    │   └── utils/                # Pure helper functions (no state)
    │
    └── features/                 # DOMAIN LOGIC (The "Meat" of the app)
        ├── dashboard/            # Feature A
        ├── settings/             # Feature B
        └── users/                # Feature C
            ├── users.routes.ts   # Lazy-loaded routes for this feature
            ├── user-list/        # Page Component (Smart)
            ├── user-detail/      # Page Component (Smart)
            ├── ui/               # Feature-specific Dumb Components
            └── data-access/      # Services, API calls, Stores (Signals)
```

---

### 3. Folder Details & Angular 21 Specifics

#### `core/` (The Backbone)

Use this for code that is essential for the app to start but is **never imported by features directly**.

- **What goes here:** `AuthService`, `AuthGuard`, `GlobalErrorHandler`, `HttpInterceptors`.
- **Angular 21 Tip:** With `app.config.ts`, you no longer need a `CoreModule`. Just provide these services in the `providers` array in `app.config.ts`.

#### `shared/` (The Toolbelt)

Use this for "Dumb" components that have **no dependency on the business logic**.

- **What goes here:** A generic `<app-button>`, `<app-loading-spinner>`, or formatting pipes.
- **Rule:** Components in `shared` should receive data via `@Input()` (Signals) and emit events via `@Output()`. They should generally _not_ inject services.
- **Barrel Files:** It is acceptable to have an `index.ts` in `shared/` to simplify imports, e.g., `import { ButtonComponent } from '@shared';`.

#### `features/` (The Business Logic)

This is where 90% of your work happens. Each folder represents a distinct business domain.

- **Lazy Loading:** Each feature should be lazy-loaded in `app.routes.ts` using `loadChildren`.
- **Anatomy of a Feature Folder:**
  - **`*.routes.ts`**: The routing entry point for this feature.
  - **`data-access/`**: This isolates your API calls and State. In Angular 21, this often contains a **Signal Store** (using `@ngrx/signals` or a custom Signal service) rather than complex RxJS streams.
  - **`ui/`**: Components that are specific to this feature but reusable within it (e.g., a `UserCard` that is only used in the Users feature).
  - **`feature-name.component.ts`**: The entry component (if applicable).

---

### 4. Key Angular 21 Patterns

#### A. Zoneless Architecture

Angular 21 defaults to **Zoneless** change detection.

- **Impact on Structure:** You will rely heavily on **Signals**.
- **State Management:** Instead of `BehaviorSubject` in services, use `signal` or `computed`.

  ```typescript
  // features/users/data-access/user.store.ts
  import { signal, computed, Injectable } from "@angular/core";

  @Injectable({ providedIn: "root" })
  export class UserStore {
    readonly users = signal<User[]>([]);
    readonly count = computed(() => this.users().length);
    // ... methods to update state
  }
  ```

#### B. Standalone Bootstrapping

Your `main.ts` now bootstraps the app using `bootstrapApplication` and `app.config.ts`. You do not need an `AppModule`.

#### C. Control Flow Syntax

In your templates (which are colocated with components), you will use the `@if`, `@for`, and `@switch` syntax. This doesn't change folder structure but simplifies the `shared/` folder since you no longer need to export `CommonModule` everywhere.

---

### 5. Anti-Patterns to Avoid

1.  **The "Services" Folder:** Do not put _all_ services in a root `src/app/services` folder. Move services close to where they are used (inside `features/xyz/data-access/`). Only global singleton services go in `core/services`.
2.  **Shared State:** Do not put stateful services in `shared/`. Shared should be stateless. If multiple features need the same state, move that state to `core/` or a dedicated `state/` folder (if using Redux/NgRx).
3.  **Deep Barrel Files:** Avoid `export *` chains that go 5 levels deep. It messes with tree-shaking and build times.
4.  **Smart Components in `ui/`:** Feature `ui` components should not inject API services. They should purely be presentational.

### Summary Checklist for a New File

1.  Is it used everywhere? -> **Shared**
2.  Is it a global singleton (like Auth)? -> **Core**
3.  Is it a page or domain logic? -> **Features**
4.  Is it an API call or State? -> **Features/Name/Data-Access**
