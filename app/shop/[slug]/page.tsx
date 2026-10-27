import React from "react";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/DetailsProductData";
import ClientProductView from "./ClientProductView";

// Allow this route to use blocking rendering
export const instant = false;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const matchedItem = (ALL_PRODUCTS as any[]).find(
    (item) => item?.data?.slug === slug || item?.slug === slug
  );

  const product = matchedItem?.data ?? matchedItem;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <h1 className="text-2xl font-bold mb-2">
          Product Not Found
        </h1>

        <p className="text-gray-500 mb-6">
          The product you are looking for does not exist or has been removed.
        </p>

        <Link
          href="/"
          className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return <ClientProductView product={product} />;
}