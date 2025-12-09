# Easy Issue Tracker

**Important:** This repository contains only the first, full‑stack Next.js implementation.  
All six implementations, including this one, will later be published together in a single multi‑stack GitHub repository.

Easy Issue Tracker is a study‑oriented, full‑stack issue tracking application built with modern TypeScript tooling.  
The first project in this series is a **full‑stack Next.js app** using PostgreSQL and Drizzle ORM.  
Later, this repository will be complemented by 5 additional versions (different backend/frontend stacks) in a separate public monorepo.

---

## Tech Stack (v1: Full‑Stack Next.js App)

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript, React 19
- **Styling & UI:**
  - Tailwind CSS 4
  - shadcn/ui (Radix‑based components such as `Dialog`, `Button`, form primitives)
  - `lucide-react` icons
- **Database & ORM:**
  - PostgreSQL
  - Drizzle ORM (`drizzle-orm/pg-core`)
  - Drizzle migrations (`drizzle-kit`)
- **API & Validation:**
  - `next-openapi-gen` for OpenAPI schema generation
  - `@scalar/api-reference-react` for API reference UI
  - `zod` for runtime validation
- **Markdown Editor for Issues:**
  - `react-simplemde-editor`
  - `easymde`
- **Config & Utilities:**
  - Custom `.env` helper in `lib/env-reader.ts`
  - ESLint 9 + Next.js config
  - TypeScript 5

---

## Features (Current & In Progress)

- **Issue Management**
  - `IssuesTable` with title, description, status, timestamps
  - Enum‑based statuses: `TODO`, `IN_PROGRESS`, `REVIEW`, `DEBUG`, `DONE`, `DEPLOYED`
- **Users & Roles**
  - `UsersTable` with unique email & mobile
  - Role enum: `SUPER`, `ADMIN`, `SUPPORT`, `BASIC`
- **UI/UX**
  - `/issues` page with “Add a New Issue” **modal** (shadcn `Dialog`)
  - `/issues/new` full‑page form for deep links (reuses the same form component)
  - Markdown description editor for issue details
- **API**
  - OpenAPI spec in `public/openapi.json`
  - API reference UI (Next.js route using Scalar)

---

## Roadmap: 6 Versions of the Issue Tracker

This project is **v1** of a 6‑project learning series.  
The final public repository will include:

1. **Full‑Stack Implementations**
   - **Full‑stack Next.js app** (this project)
   - **NestJS backend** only
   - **FastAPI backend** only
   - **Django REST Framework backend** only

2. **Frontend‑Only Implementations**
   - **Next.js frontend** only (talking to the standalone backends)
   - **React.js SPA** frontend only (e.g. Vite/CRA + React Router)

The goal is to show how the same domain (issue tracking) looks in different stacks, from data modeling to UI and API design.

---

## Project Structure (v1)

High‑level structure of this repo:

- `app/`
  - `issues/` – main issues listing page + “New Issue” modal
  - `issues/new/` – full page to create a new issue
  - `api/` – API routes (Next.js route handlers)
  - `api-docs/` – API reference UI powered by Scalar + OpenAPI spec
- `components/`
  - `ui/` – shadcn/ui primitives (e.g. `button`, `dialog`, form fields)
  - `issues/` – issue‑specific components (e.g. `submit-form`)
- `db/`
  - `schema.ts` – Drizzle ORM models and enums for users and issues
  - `index.ts` – DB client configuration (Postgres)
- `drizzle/`
  - `migrations/` – generated SQL migrations
- `lib/`
  - `env-reader.ts` – custom environment variable reader helper
- `public/`
  - `openapi.json` – generated OpenAPI spec
  - static assets (icons, svgs, etc.)

---

## Getting Started

### Prerequisites

- **Node.js**: version compatible with Next.js 16 (Node 20+ recommended)
- **Package manager**: `pnpm` (preferred)
- **Database**: PostgreSQL instance (local Docker or managed)
- **Environment file**: `.env.local` with at least:

```bash
DATABASE_URL="postgres://user:password@localhost:5432/easy_issue_tracker"
```

Adjust user, password, host, port, and database name as needed.

---

### Installation

Install dependencies with `pnpm`:

```bash
pnpm install
```

---

### Database & Migrations

Drizzle is configured via `drizzle.config.ts` and reads `DATABASE_URL` from `.env.local`.

To generate and apply migrations (once your database is reachable):

```bash
# Generate SQL migrations from the schema
pnpm drizzle-kit generate

# Push migrations to the database
pnpm drizzle-kit push
```

You can also run migrations using your own preferred workflow; just ensure the DB schema matches `db/schema.ts`.

---

### Running the App in Development

Start the Next.js dev server:

```bash
pnpm dev
```

Then open:

- App UI: http://localhost:3000
- Issues page: http://localhost:3000/issues
- New issue (full page): http://localhost:3000/issues/new
- API docs (if wired): http://localhost:3000/api-docs

---

### Linting

Run ESLint (with auto‑fix enabled via script):

```bash
pnpm lint
```

---

## OpenAPI & API Reference

The repository includes an OpenAPI definition and a generator setup:

- **Spec source:** `next.openapi.json` (generator config)
- **Generated spec:** `public/openapi.json`
- **Generator script:**

```bash
pnpm openapi:generate
```

After updating API routes or schemas, re‑generate the spec and refresh the API docs page.

---

## Future Work

Planned enhancements for this Next.js full‑stack version:

- Authentication and authorization using `UsersTable` and roles
- Richer issue workflow (assignees, labels, comments, activity log)
- Filtering, sorting, and search on the issues dashboard
- Tests for backend and frontend (unit + integration)
- Deployment examples (e.g., Vercel + managed Postgres)

---

## License

TBD

