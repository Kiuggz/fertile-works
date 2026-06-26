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

export type PropertyType = 'residential' | 'commercial' | 'land';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: PropertyType;
  images: string[];
  features: string[];
  kenyanFeatures: string[];
  description: string;
}

export interface SearchFilters {
  location: string;
  // Freetext from the Hero <select>; semantically '' | 'residential' | 'commercial' | 'land'.
  propertyType: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  message: string;
}
