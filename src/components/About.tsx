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
import React from 'react';
import { Card, CardContent } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About Fertile Works LTD</h2>
              <p className="text-xl text-gray-600 mb-8">
                Your trusted real estate partner in Kenya since 2010
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    🇰🇪 Local Expertise
                  </h3>
                  <p className="text-gray-600">
                    Deep understanding of Kenyan property markets across all 47 counties
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    🏆 Award-Winning
                  </h3>
                  <p className="text-gray-600">
                    Recipient of 2023 Kenya Property Awards for customer service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Our Nairobi Office"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
