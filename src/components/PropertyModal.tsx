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
 */
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useProperty } from '../contexts/PropertyContext';

const PropertyModal = () => {
  const { selectedProperty, isModalOpen, setIsModalOpen } = useProperty();

  if (!selectedProperty) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in ${selectedProperty.title} listed at ${formatPrice(selectedProperty.price)}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/254113405388?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedProperty.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={selectedProperty.images[0]}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover rounded-lg"
            />

            {selectedProperty.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {selectedProperty.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProperty.title} ${index + 2}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {formatPrice(selectedProperty.price)}
              </p>
              <p className="text-gray-600">📍 {selectedProperty.location}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-1">📐 Size</h4>
                <p>{selectedProperty.size} sq.m</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">🛏️ Bedrooms</h4>
                <p>{selectedProperty.bedrooms}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">🚿 Bathrooms</h4>
                <p>{selectedProperty.bathrooms}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Kenyan-Specific Features</h3>
              <ul className="space-y-2">
                {selectedProperty.kenyanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-gray-700">{selectedProperty.description}</p>
            </div>

            <Button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
                width="20"
                alt="WhatsApp"
                className="w-5 h-5"
              />
              Contact via WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
