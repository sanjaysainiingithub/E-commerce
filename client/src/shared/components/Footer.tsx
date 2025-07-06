// src/shared/components/Footer.tsx

import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 mt-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">ShopMart</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop destination for high-quality products at competitive prices.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-primary">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-primary">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-gray-600">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>Brain Mentors Pvt Ltd</span>
              </li>
              <li className="flex gap-2 text-gray-600">
                <Phone size={18} className="shrink-0" />
                <span>+1 (555) 123-0000</span>
              </li>
              <li className="flex gap-2 text-gray-600">
                <Mail size={18} className="shrink-0" />
                <span>support@brain-mentors.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-4 border-t text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ShopMart. All rights reserved (Brain Mentors Pvt Ltd).</p>
        </div>
      </div>
    </footer>
  );
}