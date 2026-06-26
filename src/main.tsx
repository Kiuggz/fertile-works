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
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PropertyProvider } from './contexts/PropertyContext'

createRoot(document.getElementById("root")!).render(
  <PropertyProvider>
    <App />
  </PropertyProvider>
);
