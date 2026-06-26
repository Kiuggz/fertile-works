# AGENTS.md — Fertile Works Website & Portal

Operating standard for this repository. Binding for every task here.

## Project boundaries
- This is the **Website & Portal** project: React + TypeScript + Vite + Tailwind + shadcn/ui,
  hosted on Cloudflare Pages. It is **separate** from the PMIS (FastAPI + PostgreSQL).
- Phases are **lettered (A, B, C, D)** — never merge or renumber against PMIS numbered phases.
- Governing docs live in [`planning/`](planning/): the MDD, the Execution Guide, and the
  Component Docstrings. Read them before phase work.

## Always keep the main docs in lockstep with the code  ← required
After completing a phase or making any material change, **update both main docs in
`planning/` in the same change**:
- **`Website_Portal_MDD_v1.docx`** — phase roadmap/status tables, component inventory,
  key design decisions.
- **`Website_Portal_Execution_Guide_v1.docx`** — Phase Tracker status, per-gate
  "Date Cleared" log, and acceptance-criteria results.

Do not leave the docs claiming an earlier state than the code (e.g. "Phase A pending" after
Phase A shipped). The docs are `.docx` (binary) — edit with `python-docx`, not a text editor.

## Working rules
- **Smallest safe change.** Don't bundle unrelated refactors into phase work. Preserve the
  existing component/architecture patterns mirrored from the source project.
- **Do not hand-edit `src/components/ui/`** — these are shadcn/ui primitives. Add new ones via
  `npx shadcn@latest add <name>` (only the components actually used are vendored in).
- **Secrets:** never commit `.env`. Only `VITE_`-prefixed vars reach the browser bundle.
  Keep `.env.example` as placeholders only. Backend secrets (`JWT_SECRET`, `OTP_*`) belong to
  the PMIS/FastAPI side, not this repo.
- **Auth is server-side (Phase C+).** React route guards are UX only; the FastAPI JWT
  dependencies are the security boundary. Enforce tenant/landlord data isolation server-side.
- **Labels:** "Owner Login" is the client-facing term for the landlord portal — do not rename
  without confirming with Fertile Works.
- **Completion honesty:** report what was actually run (tsc / eslint / build / browser checks),
  what was not, and known gaps — in the same session, not carried from memory.
