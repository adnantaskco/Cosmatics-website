import { ImageHeroCarousel } from "@/components/hero";
import { MostPopularSectionExact } from "@/components/mostpopularsection";
import {SaleProductsSectionComplete} from "@/components/saleproduct"
import  Navbar  from "@/components/Navbar";
import {TrendingSection} from "@/components/trending"

import { ShopByCategory } from "@/components/Shopbycategories";
import salesection form "@/"

export default function Home() {
  return (
    <div>
     <Navbar/>
     <ImageHeroCarousel/>
     <MostPopularSectionExact/>
     <ShopByCategory/>
     <TrendingSection/>
     <salesection/>
    </div>
  );
}
