"use client";
import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Music, 
  ArrowUp
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-black font-sans border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          
          {/* Column 1: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-wide uppercase">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <span>368 Ocean Ave, CA 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                <span>+ (555) - 123-6868</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                <a href="mailto:Veliora@Example.com" className="hover:underline break-all">Veliora@Example.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <span>All Day: 9:00AM - 22:00PM</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Socials Network */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-wide uppercase">Socials Network</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#facebook" className="hover:text-black transition-colors flex items-center space-x-2">
                  <FaFacebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-black transition-colors flex items-center space-x-2">
                  <FaInstagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#twitter" className="hover:text-black transition-colors flex items-center space-x-2">
                  <FaTwitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#tiktok" className="hover:text-black transition-colors flex items-center space-x-2">
                  <Music className="w-4 h-4" />
                  <span>Tiktok</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-wide uppercase">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#skincare" className="hover:text-black transition-colors">Skincare Solutions</a></li>
              <li><a href="#complexion" className="hover:text-black transition-colors">Complexion Perfection</a></li>
              <li><a href="#eye" className="hover:text-black transition-colors">Eye Enhancements</a></li>
              <li><a href="#lips" className="hover:text-black transition-colors">Radiant Lips</a></li>
            </ul>
          </div>

          {/* Column 4: Our Policies */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-wide uppercase">Our Policies</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#shipping" className="hover:text-black transition-colors">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-black transition-colors">Returns Policy</a></li>
              <li><a href="#terms" className="hover:text-black transition-colors">Terms & Conditions</a></li>
              <li><a href="#privacy" className="hover:text-black transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 5: Customer Care */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base font-semibold tracking-wide uppercase">Customer Care</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#faqs" className="hover:text-black transition-colors">FAQs</a></li>
              <li><a href="#service" className="hover:text-black transition-colors">Terms Of Service</a></li>
              <li><a href="#privacy-care" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#giftcard" className="hover:text-black transition-colors">Gift Card</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Copyright, Brand Logo, Payment Methods, Back to Top) */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          
          {/* Copyright text */}
          <p className="text-xs text-gray-500 order-3 lg:order-1">
            Copyright © 2026 Nova Creative. All rights reserved.
          </p>

          {/* Centered Brand Logo */}
          <div className="text-2xl font-serif tracking-widest text-black order-1 lg:order-2">
            TASKCO
          </div>

          {/* Payment Icons & Scroll Top */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 order-2 lg:order-3 w-full lg:w-auto">
            {/* Payment Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-gray-600">
              <span className="px-2 py-1 bg-white border border-gray-200 rounded">PayPal</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded">Mastercard</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded">Shop Pay</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded">Visa</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded">AMEX</span>
            </div>

            {/* Scroll-to-top Button */}
            <button 
              onClick={scrollToTop} 
              aria-label="Scroll to top"
              className="p-2 bg-white border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}