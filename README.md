# Supabase Server Project

Starter repository for two Supabase execution environments:

1. **Standalone server** using `@supabase/server`.
2. **Supabase Edge Functions** using the Supabase-managed Deno runtime.

This is an initial draft. The standalone server deployment runtime (Node.js, Bun, or Deno), hosting target, and application-specific routes remain to be finalized.

## Requirements

- Node.js 22+ for package tooling
- npm
- Supabase CLI and Docker for local Supabase development
- Deno tooling is optional but recommended for Edge Function editor support

## Install

```bash
npm install
cp .env.example .env
```

Fill `.env` with values from the Supabase project API settings. Never commit `.env` or actual secret keys.

## Environment variables

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable API key |
| `SUPABASE_SECRET_KEY` | Server-only secret API key |
| `SUPABASE_JWKS_URL` | JWKS endpoint used to verify user JWTs |

The `@supabase/server` package can read these variables in supported runtimes. Supabase Edge Functions receive platform configuration automatically.

## Standalone server starter

The fetch handler is in `server/src/index.ts`.

- `GET /health` — basic health response.
- `GET /api/v1/me` — example endpoint requiring a valid Supabase user JWT.

The handler uses the standard Fetch API. It is compatible with Deno, Bun, and worker-style runtimes. A Node.js HTTP/framework adapter is deliberately not selected in this draft; choose the deployment runtime before adding its process bootstrap.

## Edge Functions

Example function:

```text
supabase/functions/hello-world/index.ts
```

Run the local Supabase stack and serve the function:

```bash
supabase start
supabase functions serve hello-world
```

Local function URL:

```text
http://localhost:54321/functions/v1/hello-world
```

## Type checking

```bash
npm run typecheck
```

## Draft structure

```text
.
├── server/
│   └── src/
│       └── index.ts
├── supabase/
│   ├── config.toml
│   └── functions/
│       ├── deno.json
│       └── hello-world/
│           └── index.ts
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## Pending decisions

- Select standalone server runtime and hosting target.
- Define application routes and domain services.
- Decide which endpoints use user-scoped access and which require service-level access.
- Add automated unit/integration tests and CI after the runtime is locked.

## Official references

- [@supabase/server — Getting Started](https://github.com/supabase/server/blob/main/docs/getting-started.md)
- [@supabase/server — Environment Variables](https://github.com/supabase/server/blob/main/docs/environment-variables.md)
- [Supabase Edge Functions — Quickstart](https://supabase.com/docs/guides/functions/quickstart)
- [Securing Edge Functions](https://supabase.com/docs/guides/functions/auth)
- [Edge Function Environment Variables](https://supabase.com/docs/guides/functions/secrets)
