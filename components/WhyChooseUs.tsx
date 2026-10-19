import React from 'react';
import { Leaf, ShieldCheck, FlaskConical, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Leaf className="w-5 h-5 sm:w-8 sm:h-8 text-neutral-800" />,
      title: 'Natural Care',
      description: 'Thoughtfully selected ingredients that respect and nurture your skin.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-neutral-800" />,
      title: '100% Organic',
      description: 'Free from unnecessary additives, focused on purity and performance.',
    },
    {
      icon: <FlaskConical className="w-5 h-5 sm:w-8 sm:h-8 text-neutral-800" />,
      title: 'Non Chemicals',
      description: 'Free from harsh chemicals, focusing on gentle and minimal formulas.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 sm:w-8 sm:h-8 text-neutral-800" />,
      title: 'No Side Effect',
      description: 'Carefully formulated to be gentle on skin, without unwanted reactions.',
    },
  ];

  return (
    <section className="bg-neutral-100 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-2 md:px-8 lg:px-16 text-center">
        {/* Subheading */}
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-medium">
          Trusted Beauty
        </span>

        {/* Main Title */}
        <h2 className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase mb-8 md:mb-12">
          Why Choose Us?
        </h2>

        {/* Features Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-3 sm:p-6 bg-transparent"
            >
              {/* Icon Container */}
              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-full bg-white border border-neutral-200 shadow-sm">
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="text-xs sm:text-lg font-semibold sm:font-medium text-neutral-900 mb-1 sm:mb-2">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-[11px] sm:text-sm text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}