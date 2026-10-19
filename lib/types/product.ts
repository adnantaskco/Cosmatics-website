export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  unitsSold: number;
  isLowStock: boolean;
  size: string;
  productType: string;
  skinType: string[];
  skinConcern: string[];
  highlights: string[];
  ingredients: string[];
  description: {
    banglaText: string;
    keyBenefits: { title: string; desc: string }[];
    keyIngredients: { name: string; desc: string }[];
    howToUse: string[];
    faqs: { q: string; a: string }[];
  };
  reviews: Review[];
  relatedProducts: RelatedProduct[];
}