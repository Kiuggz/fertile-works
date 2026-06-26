/**
 * App
 *
 * Root component and route container for the Fertile Works website and portal.
 *
 * Zone A — Public marketing site (no auth required):
 *   /              → Header + Hero + Properties + About + Contact + PropertyModal
 *
 * Zone B — Tenant portal (JWT required, role = "tenant"):     [Phase C]
 * Zone C — Landlord portal (JWT required, role = "landlord"): [Phase C]
 *
 * @remarks
 * PropertyModal is rendered at the App root level, outside <main>, so it can
 * overlay the full viewport via the shadcn Dialog component.
 * PropertyProvider wraps the app in main.tsx — not here.
 *
 * Toaster (shadcn) and Sonner are mounted at the root so the Contact form's
 * success / error toasts have a render target.
 *
 * Phase A: wire existing components (marketing site only).  ← current
 * Phase C: add BrowserRouter, Routes, and portal route structure.
 */
import Header from './components/Header';
import Hero from './components/Hero';
import Properties from './components/Properties';
import About from './components/About';
import Contact from './components/Contact';
import PropertyModal from './components/PropertyModal';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from './components/ui/sonner';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Properties />
        <About />
        <Contact />
      </main>

      {/* Rendered at root, outside <main>, so the Dialog overlay covers the viewport */}
      <PropertyModal />

      <Toaster />
      <Sonner />
    </>
  );
}

export default App;
