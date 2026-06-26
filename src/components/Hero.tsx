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
import React, { useState } from 'react';
import { Button } from './ui/button';
import { SearchFilters } from '../types/property';

const Hero = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    propertyType: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search filters:', searchFilters);
    // Implement search functionality
  };

  return (
    <section id="home" className="hero relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white pt-20">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Dream Property in Kenya
        </h2>
        <p className="text-xl mb-8">
          Discover premium real estate across Kenya's most desirable locations
        </p>

        <form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Location (e.g. Nairobi, Mombasa)"
            value={searchFilters.location}
            onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={searchFilters.propertyType}
            onChange={(e) => setSearchFilters({ ...searchFilters, propertyType: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Property Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>

          <Button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
