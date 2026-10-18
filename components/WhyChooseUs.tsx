import React from 'react';
import { Leaf, ShieldCheck, FlaskConical, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-neutral-800" />,
      title: 'Natural Care',
      description: 'Thoughtfully selected ingredients that respect and nurture your skin.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-neutral-800" />,
      title: '100% Organic',
      description: 'Free from unnecessary additives, focused on purity and performance.',
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-neutral-800" />,
      title: 'Non Chemicals',
      description: 'Free from harsh chemicals, focusing on gentle and minimal formulas.',
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-neutral-800" />,
      title: 'No Side Effect',
      description: 'Carefully formulated to be gentle on skin, without unwanted reactions.',
    },
  ];

  return (
    <section className="bg-neutral-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Removed conflicting container and nested padding classes */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        {/* Subheading */}
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
          Trusted Beauty
        </span>

        {/* Main Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-transparent"
            >
              {/* Icon Container */}
              <div className="mb-4 p-3 rounded-full bg-white  border border-neutral-200">
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-sm text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}