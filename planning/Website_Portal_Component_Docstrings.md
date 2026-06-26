# Website / Portal Component Docstrings
## Fertile Works LTD — Phase A + C
## Paste each block into the top of the corresponding file, directly above the component declaration.

---

## src/App.tsx

```tsx
/**
 * App
 *
 * Root component and route container for the Fertile Works website and portal.
 *
 * Zone A — Public marketing site (no auth required):
 *   /              → Header + Hero + Properties + About + Contact + PropertyModal
 *
 * Zone B — Tenant portal (JWT required, role = "tenant"):
 *   /portal/tenant            → TenantDashboard
 *   /portal/tenant/statements → Rent statements + PDF download
 *   /portal/tenant/payments   → Payment history
 *   /portal/tenant/water      → Water readings and bills
 *   /portal/tenant/notices    → Notices from Fertile Works
 *
 * Zone C — Landlord portal (JWT required, role = "landlord"):
 *   /portal/landlord              → LandlordDashboard
 *   /portal/landlord/properties   → Property and unit occupancy
 *   /portal/landlord/remittances  → Remittance statements + commission
 *   /portal/landlord/reports      → Downloadable PDF financial reports
 *
 * Auth routes (public):
 *   /tenant-login    → TenantLogin (OTP two-step)
 *   /landlord-login  → LandlordLogin (OTP two-step)
 *
 * @remarks
 * PropertyModal must be rendered at the App root level, outside <main>,
 * so it can overlay the full viewport via the shadcn Dialog component.
 * PropertyProvider wraps the app in main.tsx — not here.
 *
 * Phase A: wire existing components (marketing site only).
 * Phase C: add BrowserRouter, Routes, and portal route structure.
 */
```

---

## src/main.tsx

```tsx
/**
 * main.tsx
 *
 * React application entry point.
 *
 * Wraps the App in PropertyProvider so that PropertyContext (selected property
 * state and modal open/close state) is available to both Properties and
 * PropertyModal without prop drilling.
 *
 * Phase C addition: when portal auth is implemented, any global auth context
 * provider should also be added here, wrapping PropertyProvider.
 */
```

---

## src/components/Header.tsx

```tsx
/**
 * Header
 *
 * Fixed top navigation bar for the Fertile Works public marketing site.
 *
 * Features:
 * - Renders the Fertile Works LTD brand name as the logo/home link.
 * - Desktop nav: horizontal links to Home, Properties, About Us, Contact,
 *   Tenant Login (/tenant-login), and Owner Login (/landlord-login).
 * - Mobile nav: hamburger icon (lucide Menu/X) toggles a vertical dropdown.
 * - Smooth scrolls to the target section via scrollToSection(), which calls
 *   element.scrollIntoView({ behavior: 'smooth' }) and closes the mobile menu.
 *
 * @remarks
 * Nav items for in-page sections use <a href="#sectionId"> with onClick
 * preventDefault to allow smooth scrolling while keeping the DOM semantic.
 * Portal login links (/tenant-login, /landlord-login) use standard <a> tags
 * and do NOT call scrollToSection — they are full-page navigations.
 *
 * "Owner Login" is the client-facing label for the landlord portal.
 * Do not change it to "Landlord Login" without confirming with Fertile Works.
 *
 * @param isMenuOpen - Internal state: whether the mobile menu is expanded.
 * @param scrollToSection - Scrolls to the element with the given section ID
 *   and closes the mobile menu.
 */
```

---

## src/components/Hero.tsx

```tsx
/**
 * Hero
 *
 * Full-screen hero section for the public marketing site.
 *
 * Renders at section#home with a blue-to-purple gradient background and a
 * property search form. The search form accepts a freetext location input
 * and a property type selector (residential / commercial / land).
 *
 * @remarks
 * handleSearch currently logs searchFilters to console and is a stub.
 * Phase D (or a dedicated search phase) should implement actual search logic —
 * either filtering the static featuredProperties array in Properties.tsx or
 * calling a PMIS API endpoint once the backend is deployed.
 *
 * SearchFilters type is defined in src/types/property.ts:
 *   { location: string; propertyType: string }
 *
 * @param searchFilters - Controlled state for the search form inputs.
 * @param handleSearch - Form submit handler; prevents default and triggers search.
 */
```

---

## src/components/Properties.tsx

```tsx
/**
 * Properties
 *
 * Featured properties grid section for the public marketing site.
 *
 * Renders at section#properties. Displays a hardcoded list of featured
 * Property objects as shadcn Cards with image, price (formatted as KES),
 * location, bedroom/bathroom/size features, and a "View Details" button.
 *
 * "View Details" sets the selectedProperty in PropertyContext and opens
 * the PropertyModal dialog.
 *
 * @remarks
 * featuredProperties is currently a static array hardcoded in this component.
 * A future phase should move property data to the PMIS backend and fetch it
 * via a public API endpoint (no auth required for the marketing site listings).
 *
 * formatPrice uses Intl.NumberFormat with locale 'en-KE' and currency 'KES'.
 * This produces e.g. "KSh 25,000,000" which is the correct Kenyan format.
 *
 * Depends on: PropertyContext (useProperty hook), src/types/property.ts
 *
 * @param setSelectedProperty - From PropertyContext; sets the active property.
 * @param setIsModalOpen - From PropertyContext; opens the PropertyModal.
 */
```

---

## src/components/About.tsx

```tsx
/**
 * About
 *
 * About section for the public marketing site.
 *
 * Renders at section#about. Presents Fertile Works LTD company background,
 * key value propositions (Local Expertise, Award-Winning service), and an
 * office image in a two-column layout on large screens.
 *
 * @remarks
 * Content is static. No external data dependencies.
 * The office image is an Unsplash placeholder — replace with an actual
 * Fertile Works office photo before production launch.
 * The "since 2010" and "2023 Kenya Property Awards" copy should be verified
 * with Fertile Works before deployment.
 */
```

---

## src/components/Contact.tsx

```tsx
/**
 * Contact
 *
 * Contact section for the public marketing site.
 *
 * Renders at section#contact. Contains:
 * - A contact form (name, phone, message) that submits to the Supabase Edge
 *   Function 'contact-submission'. The Edge Function is responsible for routing
 *   the message via SMS, email, or WhatsApp and returning { routedTo: channel }.
 * - An office information card with the Nairobi address, phone, and email.
 * - An embedded Google Maps iframe centred on Jogoo Road, Nairobi.
 *
 * @remarks
 * Requires src/lib/supabase.ts to exist and VITE_SUPABASE_URL /
 * VITE_SUPABASE_ANON_KEY to be set in .env.
 *
 * The Supabase Edge Function 'contact-submission' must be deployed separately
 * via Supabase CLI. The frontend form is wired correctly; the function handles
 * routing logic server-side.
 *
 * Phone field uses pattern="[+]{1}[0-9]{11,14}" to enforce Kenyan E.164 format
 * (e.g. +254712345678). No email field is present — enquiries come via phone
 * or the form message. This is intentional for the Kenyan market context.
 *
 * @param formData - Controlled state for the three form fields.
 * @param isSubmitting - Disables the submit button during the async request.
 * @param handleSubmit - Calls supabase.functions.invoke, shows toast on result.
 * @param handleInputChange - Generic onChange handler for all form inputs.
 */
```

---

## src/components/PropertyModal.tsx

```tsx
/**
 * PropertyModal
 *
 * Full-screen property detail dialog, rendered at the App root level.
 *
 * Opens when a user clicks "View Details" on a property card in Properties.tsx.
 * Displays the full property detail: image gallery (primary + thumbnails),
 * price (KES), location, size/bedrooms/bathrooms, Kenyan-specific features
 * list, description, and a WhatsApp contact button.
 *
 * The WhatsApp button opens wa.me/254113405388 with a pre-filled message
 * referencing the property title and price. The phone number is the Fertile
 * Works Nairobi office WhatsApp number.
 *
 * @remarks
 * Returns null early if selectedProperty is null — this prevents rendering
 * an empty Dialog before any property has been selected.
 *
 * Must be placed at the App root level (outside <main>) so the Dialog overlay
 * covers the full viewport without being clipped by a positioned ancestor.
 *
 * Depends on: PropertyContext (useProperty hook), src/types/property.ts
 *
 * @param selectedProperty - From PropertyContext; the property to display.
 * @param isModalOpen - From PropertyContext; controls Dialog open state.
 * @param setIsModalOpen - From PropertyContext; allows Dialog to close itself.
 * @param formatPrice - Formats a number as KES using Intl.NumberFormat en-KE.
 * @param handleWhatsAppContact - Builds and opens the wa.me deep link.
 */
```

---

## src/contexts/PropertyContext.tsx

```tsx
/**
 * PropertyContext
 *
 * React context providing shared state for the currently selected property
 * and the PropertyModal open/close state.
 *
 * Used by:
 * - Properties.tsx  — sets selectedProperty and opens the modal on card click.
 * - PropertyModal.tsx — reads selectedProperty to render detail, reads/sets
 *   isModalOpen to control Dialog visibility.
 *
 * @remarks
 * PropertyProvider must wrap the entire App in main.tsx so both consumers
 * receive the same context instance. If useProperty() is called outside a
 * PropertyProvider, it throws with a clear error message.
 *
 * This context is intentionally limited to UI selection state. Financial data,
 * auth tokens, and portal state belong in separate contexts (Phase C+).
 *
 * @interface PropertyContextValue
 * @property selectedProperty - The currently selected Property or null.
 * @property setSelectedProperty - Setter for selectedProperty.
 * @property isModalOpen - Whether PropertyModal is currently open.
 * @property setIsModalOpen - Setter for isModalOpen.
 */
```

---

## src/types/property.ts

```ts
/**
 * property.ts
 *
 * Shared TypeScript interfaces for the Fertile Works property data model
 * used across the public marketing site components.
 *
 * @interface Property
 * Represents a single real estate listing.
 * @property id - Unique identifier (slug format e.g. 'westlands-1').
 * @property title - Display title of the listing.
 * @property price - Asking price in KES (Kenya Shillings).
 * @property location - Human-readable location string (e.g. 'Westlands, Nairobi').
 * @property bedrooms - Number of bedrooms.
 * @property bathrooms - Number of bathrooms.
 * @property size - Floor area in square metres.
 * @property type - Property category: 'residential' | 'commercial' | 'land'.
 * @property images - Ordered array of image URLs; index 0 is the primary image.
 * @property features - Generic feature labels (e.g. '4 Bedrooms', '250 sq.m').
 * @property kenyanFeatures - Kenya-specific amenities (e.g. 'Borehole water',
 *   'Generator backup', 'Solar backup'). Displayed separately in PropertyModal.
 * @property description - Free-text property description for the modal detail view.
 *
 * @interface SearchFilters
 * Controlled state for the Hero search form.
 * @property location - Freetext location query.
 * @property propertyType - One of '' | 'residential' | 'commercial' | 'land'.
 *
 * @interface ContactForm
 * Controlled state for the Contact section form.
 * @property name - Enquirer's full name.
 * @property phone - Kenyan phone number in E.164 format (+254...).
 * @property message - Free-text enquiry message.
 *
 * @remarks
 * Phase D addition: when the portal goes live, tenant- and landlord-specific
 * interfaces (TenantStatement, RemittanceSummary, WaterReading, etc.) should
 * be added here or in separate type files under src/types/.
 */
```

---

## src/lib/supabase.ts

```ts
/**
 * supabase.ts
 *
 * Initialises and exports the Supabase client for use across the application.
 *
 * Currently used by:
 * - Contact.tsx — invokes the 'contact-submission' Edge Function.
 *
 * Phase C+ usage:
 * - Portal authentication may optionally use Supabase Auth as an alternative
 *   to the custom PMIS JWT flow. Confirm architecture before Phase C begins.
 *
 * @remarks
 * Requires the following environment variables in .env (never commit .env):
 *   VITE_SUPABASE_URL      — found in Supabase project Settings → API
 *   VITE_SUPABASE_ANON_KEY — found in Supabase project Settings → API
 *
 * Vite exposes env vars prefixed with VITE_ to the browser bundle.
 * Non-VITE_ vars are not available client-side.
 */
```

---

## src/lib/auth.ts  (Phase C — create this file)

```ts
/**
 * auth.ts
 *
 * Client-side JWT storage and retrieval utilities for the Fertile Works portal.
 *
 * Stores the access token and user role in localStorage under namespaced keys.
 * Used by ProtectedRoute to determine whether a user is authenticated and
 * whether their role matches the required portal zone.
 *
 * @remarks
 * localStorage is used for simplicity in Phase C. A future hardening phase
 * may migrate to httpOnly cookies for improved XSS resistance — this module
 * is the single place to make that change.
 *
 * The stored role value is one of: 'tenant' | 'landlord'.
 * Admin role is reserved for a future phase and is not stored here yet.
 *
 * @function saveAuth - Persists token and role after successful OTP verification.
 * @function getToken - Returns the stored JWT or null if not authenticated.
 * @function getRole - Returns the stored role string or null.
 * @function clearAuth - Removes token and role (logout).
 * @function isAuthenticated - Returns true if a token exists in storage.
 */
```

---

## src/components/ProtectedRoute.tsx  (Phase C — create this file)

```tsx
/**
 * ProtectedRoute
 *
 * Route guard component for the tenant and landlord portal zones.
 *
 * Behaviour:
 * - If no token in localStorage → redirects to the login page for the
 *   required role (/tenant-login or /landlord-login).
 * - If token exists but role does not match requiredRole → redirects to /.
 * - If token and role both match → renders children.
 *
 * @remarks
 * This component enforces role separation client-side. The FastAPI backend
 * enforces the same rules server-side via require_tenant() and
 * require_landlord() JWT dependencies. Both layers are required — the React
 * guard is UX; the FastAPI guard is the security boundary.
 *
 * Does NOT validate JWT expiry client-side. Expired tokens will be rejected
 * by the API on the first authenticated request. The resulting 401 should be
 * caught in the API layer and trigger clearAuth() + redirect to login.
 *
 * @param children - The portal page component to render if authorised.
 * @param requiredRole - The role required to access this route.
 */
```

---

## src/pages/TenantLogin.tsx  (Phase C — create this file)

```tsx
/**
 * TenantLogin
 *
 * Two-step OTP login page for tenant portal access.
 *
 * Step 1 — Credential entry:
 *   Renders an input labelled "Email or phone number" and a "Send OTP" button.
 *   On submit, calls POST /auth/tenant/request-otp with { credential }.
 *   Displays helper text: "Enter the email address or phone number registered
 *   with Fertile Works."
 *
 * Step 2 — OTP verification:
 *   Shown after a successful Step 1 response. Renders a 6-digit OTP input
 *   (using the input-otp package already installed), a countdown timer showing
 *   remaining validity (10 minutes), and a "Verify" button.
 *   On submit, calls POST /auth/tenant/verify-otp with { credential, otp_code }.
 *   On success: calls saveAuth(token, 'tenant') and navigates to /portal/tenant.
 *   On failure: displays the error message from the API response.
 *
 * @remarks
 * Does not allow self-registration. Only tenants whose phone or email is
 * already on record in the PMIS can log in. Display this expectation clearly
 * on Step 1 to prevent confusion.
 *
 * The credential entered in Step 1 is carried forward to Step 2 in local state.
 * It is not stored in localStorage — only the issued JWT and role are stored.
 *
 * input-otp@1.2.4 is already installed in package.json. Import as:
 *   import { OTPInput, OTPInputContext } from 'input-otp'
 */
```

---

## src/pages/LandlordLogin.tsx  (Phase C — create this file)

```tsx
/**
 * LandlordLogin
 *
 * Two-step OTP login page for landlord (owner) portal access.
 *
 * Identical structure to TenantLogin.tsx with the following differences:
 * - Calls POST /auth/landlord/request-otp and POST /auth/landlord/verify-otp.
 * - On success: calls saveAuth(token, 'landlord') and navigates to
 *   /portal/landlord.
 * - Step 1 helper text: "Enter the email address or phone number registered
 *   with Fertile Works as a property owner."
 *
 * @remarks
 * The page title and all user-facing copy uses "Owner" not "Landlord" —
 * consistent with the "Owner Login" label in the Header navigation.
 *
 * Some landlords may have no email address on record. If they enter an email
 * that does not match any Landlord record, the API returns a generic 404.
 * Do not reveal whether the record exists — show only: "No account found
 * with that credential."
 *
 * @see TenantLogin for full implementation pattern.
 */
```

---

## src/pages/portal/tenant/TenantDashboard.tsx  (Phase C stub — create this file)

```tsx
/**
 * TenantDashboard
 *
 * Root page of the tenant portal. Authenticated route: /portal/tenant
 *
 * Phase C (stub): fetches GET /tenant/me and displays the tenant's name,
 * unit number, and property name as a confirmation that authentication
 * and the API connection are working end-to-end.
 *
 * Phase D (full): expands to display:
 * - Current balance and arrears summary (from PaymentService allocation data)
 * - Quick links to Statements, Payments, Water, Notices sub-pages
 * - Most recent payment receipt
 * - Any outstanding debit notes
 *
 * @remarks
 * All API calls must include the JWT from getToken() in the Authorization
 * header: Authorization: Bearer <token>.
 * A 401 response means the token has expired — call clearAuth() and redirect
 * to /tenant-login.
 */
```

---

## src/pages/portal/landlord/LandlordDashboard.tsx  (Phase C stub — create this file)

```tsx
/**
 * LandlordDashboard
 *
 * Root page of the landlord portal. Authenticated route: /portal/landlord
 *
 * Phase C (stub): fetches GET /landlord/me and displays the landlord's name
 * and the list of file numbers they own, confirming authentication and API
 * connectivity end-to-end.
 *
 * Phase D (full): expands to display:
 * - Occupancy rate across all file numbers
 * - Rent collection summary for the current period
 * - Most recent remittance run date and amount
 * - Quick links to Properties, Remittances, Reports sub-pages
 *
 * @remarks
 * Dashboard figures must reflect only file numbers listed in the JWT claim
 * file_numbers[]. Never display portfolio-wide totals to a landlord — they
 * must see only their own properties.
 *
 * When PMIS Phase 31 (Accrual Accounting) is live, check the accounting_mode
 * field returned by GET /landlord/me for each file number and display the
 * correct label: "Cash collected" (CASH) or "Income earned" (ACCRUAL).
 *
 * A 401 response means the token has expired — call clearAuth() and redirect
 * to /landlord-login.
 */
```
