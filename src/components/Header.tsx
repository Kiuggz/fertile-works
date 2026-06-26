/**
 * Header
 *
 * Fixed top navigation bar for the Fertile Works public marketing site.
 *
 * Features:
 * - Renders the Fertile Works LTD brand name as the logo/home link.
 * - Desktop nav: horizontal links to Home, Properties, About Us, Contact.
 * - Mobile nav: hamburger icon (lucide Menu/X) toggles a vertical dropdown.
 * - Smooth scrolls to the target section via scrollToSection(), which calls
 *   element.scrollIntoView({ behavior: 'smooth' }) and closes the mobile menu.
 *
 * @remarks
 * Nav items for in-page sections use <a href="#sectionId"> with onClick
 * preventDefault to allow smooth scrolling while keeping the DOM semantic and
 * keyboard-navigable.
 *
 * Portal login links (/tenant-login, /landlord-login) are added in Phase C,
 * once those routes exist. "Owner Login" is the client-facing label for the
 * landlord portal — do not change it to "Landlord Login" without confirming
 * with Fertile Works.
 *
 * @param isMenuOpen - Internal state: whether the mobile menu is expanded.
 * @param scrollToSection - Scrolls to the element with the given section ID
 *   and closes the mobile menu.
 */
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <h1 className="text-2xl font-bold text-primary">Fertile Works LTD</h1>
          </a>
        </div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
