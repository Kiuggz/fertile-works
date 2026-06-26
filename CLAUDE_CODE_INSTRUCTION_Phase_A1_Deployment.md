# Claude Code Instruction — Phase A.1
## Fertile Works Website: GitHub Push + Cloudflare Pages Deployment
**Date:** June 2026
**Project root:** `D:\Tenant Data Form\Website Project`
**Current git state:** 2 commits on `main` (bd33354, b96cd5d), working tree clean

---

## Context

Phase A (public marketing site fix) is complete and committed. The website runs
correctly locally. The next task is to push the repository to GitHub and connect
it to Cloudflare Pages for live deployment.

**Do not start Phase C. Do not modify any source files. This is a deployment task only.**

---

## Step 1 — Confirm clean working tree

```cmd
cd /d "D:\Tenant Data Form\Website Project"
git status
```

Expected output:
```
On branch main
nothing to commit, working tree clean
```

If the working tree is NOT clean, stop and report what is uncommitted before proceeding.

---

## Step 2 — Check for existing remote

```cmd
git remote -v
```

If a remote named `origin` already exists, report its URL and skip Step 3.
If no remote exists, proceed to Step 3.

---

## Step 3 — Add GitHub remote and push

**You need the GitHub repository URL before running this step.**
If you do not have it yet, pause here and ask:
> "Please provide the GitHub repository URL for the Fertile Works website
> (e.g. https://github.com/YOUR-USERNAME/fertile-works-website.git)"

Once you have the URL:

```cmd
git remote add origin https://github.com/YOUR-USERNAME/fertile-works-website.git
git branch -M main
git push -u origin main
```

Confirm the push succeeded and report the GitHub URL.

---

## Step 4 — Report Cloudflare Pages build settings

After the push, provide these exact settings for the person to configure
Cloudflare Pages manually via the Cloudflare dashboard:

| Setting | Value |
|---|---|
| Service | Cloudflare Pages |
| Git provider | GitHub |
| Repository | fertile-works-website |
| Production branch | main |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (leave blank) |

---

## Step 5 — Report required environment variables

Provide these environment variables for the person to add inside
Cloudflare Pages → Settings → Environment Variables:

| Variable | Where to find the value | Required now |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase dashboard → Settings → API → Project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API → anon/public key | Yes |
| `VITE_API_BASE_URL` | PMIS backend URL — not yet deployed | No — leave blank until Phase C |

**Important:** Do not add real secret values to the GitHub repository.
Environment variables belong in Cloudflare Pages settings only.

---

## Step 6 — Post-deployment verification checklist

After Cloudflare deploys (typically 1–3 minutes after connecting), verify:

| Check | Expected |
|---|---|
| Browser tab title | `Fertile Works LTD — Premium Real Estate in Kenya` |
| All sections visible | Header, Hero, Properties, About Us, Contact |
| Property modal | Opens on "View Details", shows details, closes cleanly |
| WhatsApp button | Opens `wa.me/254113405388` with pre-filled property message |
| Mobile hamburger menu | Opens and closes correctly on narrow viewport |
| Contact form | Renders without console errors (requires Supabase env vars) |
| No console errors | Zero errors on page load in browser devtools |

---

## What NOT to do in this session

- Do not modify any source files (App.tsx, components, types, etc.)
- Do not run `npm install` for any new packages
- Do not pull additional shadcn components (deferred to Phase C)
- Do not start Phase C portal authentication work
- Do not add real API keys or secrets to any tracked file

---

## On completion

Report:
1. GitHub repository URL
2. Cloudflare Pages deployment URL (e.g. `https://fertile-works-website.pages.dev`)
3. All six deployment verification checks passed / failed
4. Any errors encountered and how they were resolved
