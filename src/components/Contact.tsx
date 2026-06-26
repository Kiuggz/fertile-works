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
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ContactForm } from '../types/property';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact-submission', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: `Your message was sent via ${data.routedTo}. We'll get back to you within 24 hours.`,
      });

      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Our Kenyan Offices</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (e.g. +2547...)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="[+]{1}[0-9]{11,14}"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Office Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    📌 Nairobi Office
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Suite B1, GNK Plaza, Hamza Makadara<br />
                    Jogoo Road, Nairobi, Kenya
                  </p>
                  <p className="text-gray-600 mb-1">📞 +254113405388</p>
                  <p className="text-gray-600">✉️ fertileworkslimited@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Google Map Section */}
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176890089376!2d36.84438761475395!3d-1.2841046990638447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f110c8b1c3c25%3A0x6c8e6c9f8b1c3c25!2sJogoo%20Road%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                  width="100%"
                  height="384"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Office Location - Jogoo Road, Nairobi"
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Visit us at Suite B1, GNK Plaza on Jogoo Road, Nairobi
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
