# Fertile Works LTD — Website & Portal

Public marketing website and (future) tenant/landlord portal for Fertile Works LTD,
a Kenyan real estate company. Built with React + TypeScript + Vite + Tailwind +
shadcn/ui. This repository is the local, git-owned source of truth (mirrored out of
the original Lovable project so it can be developed independently).

## Status

| Phase | Title | Status |
| ----- | ----- | ------ |
| A | Fix public marketing website | ✅ Complete |
| B | Integration readiness gate (PMIS deployed) | Dependency gate |
| C | Portal authentication (OTP, JWT, protected routes) | Post-pilot |
| D | Portal dashboards (tenant + landlord) | Post-pilot |

The governing design docs live in [`planning/`](planning/):
- `Website_Portal_MDD_v1.docx` — Master Design Document
- `Website_Portal_Execution_Guide_v1.docx` — Phase Execution Guide
- `Website_Portal_Component_Docstrings.md` — per-file docstrings

## Getting started

```sh
npm install
cp .env.example .env   # fill in real Supabase values for the Contact form
npm run dev            # http://localhost:8080
```

> Note: if Vite fails with "Failed to load native binding" (`@swc/core`), run
> `npm install @swc/core-win32-x64-msvc` (the platform binary npm sometimes skips).

## Scripts

- `npm run dev` — Vite dev server (port 8080)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint

## Environment

The Contact form calls a Supabase Edge Function (`contact-submission`). Set in `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Only `VITE_`-prefixed vars are exposed to the browser bundle. Never commit `.env`.

## Project structure

```
src/
  components/        marketing components (Header, Hero, Properties, About, Contact, PropertyModal)
  components/ui/     shadcn/ui primitives — do not hand-edit
  contexts/          PropertyContext (selected property + modal state)
  hooks/             use-toast, use-mobile
  lib/               supabase client, cn() util
  types/             property.ts (Property, SearchFilters, ContactForm)
```

## Deployment

Cloudflare Pages (git-based deploys). Build command `npm run build`, output `dist/`.
