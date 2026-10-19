import React from 'react';
import Link from 'next/link';
import { ALL_PRODUCTS } from '@/lib/DataALLProducts';
import ClientProductView from './ClientProductView';

export const instant = false; // Allows blocking route behavior

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const productSlug = resolvedParams.slug;

  // Safely find the product while handling potential undefined elements in the dataset
  const product = (ALL_PRODUCTS as (typeof ALL_PRODUCTS[number] | undefined)[]).find(
    (p) => p !== undefined && p.slug === productSlug
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-red-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return <ClientProductView product={product} />;
}