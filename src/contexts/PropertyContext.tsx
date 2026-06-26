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
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property } from '../types/property';

interface PropertyContextValue {
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const PropertyContext = createContext<PropertyContextValue | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PropertyContext.Provider
      value={{ selectedProperty, setSelectedProperty, isModalOpen, setIsModalOpen }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProperty = (): PropertyContextValue => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
