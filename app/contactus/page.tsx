'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  MessageCircle,
} from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between relative">
      {/* Page Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl">
            Have questions or ready to place an order? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Grid: Get in Touch & Send Us a Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Get in Touch</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Our support team is available during working hours to assist you with any questions.
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <a href="mailto:info@shopery.com" className="text-gray-800 font-medium hover:text-emerald-600">
                      info@shopery.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <a href="tel:+15551234567" className="text-gray-800 font-medium hover:text-emerald-600">
                      +1 (555) 123456789
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <span className="text-gray-800 font-medium block">
                      Sun – Thu: 10:00 AM – 06:00 PM
                    </span>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Office Address
                    </span>
                    <span className="text-gray-800 font-medium block">
                      123 Grocery Street, Food City, FC 12345
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tip Box */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-xs">
                <span className="font-bold text-emerald-800 block mb-1">QUICK TIP</span>
                <p className="text-emerald-700 leading-relaxed">
                  For order issues, please include your order number in the message so we can assist you faster.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Send us a Message</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Fill in the form below and we'll respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01XXX-XXXXXX"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="" disabled>
                        Select inquiry type
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Issue</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-400 resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Live Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          title="Chat Support"
          className="p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </button>
      </div>
    </div>
  );
}