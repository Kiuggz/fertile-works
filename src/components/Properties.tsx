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
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { useProperty } from '../contexts/PropertyContext';
import { Property } from '../types/property';

const Properties = () => {
  const { setSelectedProperty, setIsModalOpen } = useProperty();

  const featuredProperties: Property[] = [
    {
      id: 'westlands-1',
      title: 'Westlands Luxury Apartment',
      price: 25000000,
      location: 'Westlands, Nairobi',
      bedrooms: 4,
      bathrooms: 3,
      size: 250,
      type: 'residential',
      images: [
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      features: ['4 Bedrooms', '3 Bathrooms', '250 sq.m'],
      kenyanFeatures: ['Borehole water', 'Solar backup', 'Security guard', 'Covered parking'],
      description: 'Luxurious apartment in the heart of Westlands with modern amenities and stunning city views.'
    },
    {
      id: 'nyali-1',
      title: 'Nyali Beachfront Villa',
      price: 45000000,
      location: 'Nyali, Mombasa',
      bedrooms: 5,
      bathrooms: 4,
      size: 400,
      type: 'residential',
      images: [
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      features: ['5 Bedrooms', '4 Bathrooms', '400 sq.m'],
      kenyanFeatures: ['Ocean view', 'Private beach access', 'Swimming pool', 'Generator backup'],
      description: 'Stunning beachfront villa with direct ocean access and luxury amenities.'
    }
  ];

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600">Discover premium real estate across Kenya</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                <p className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</p>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  {property.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleViewDetails(property)}
                  className="w-full"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
