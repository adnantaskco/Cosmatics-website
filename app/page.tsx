
import { MostPopularSectionExact } from "@/components/mostpopularsection";

import { ShopByCategory } from "@/components/Shopbycategories";
import ForYouTabSection from "@/components/TabCombinesection";

import HeroSection2 from "@/components/herosection2";
import VideoHero from "@/components/Videosection";
import { SynchronizedProductShowcase } from "@/components/carcelsection";

import KBeautyAutoCarousel from "@/components/k-beauty";
import WhyChooseUs from "@/components/WhyChooseUs";
import FaceAutoCarousel from "@/components/facesection";
import CastomerTestimonials from "@/components/Costomerreview";
import BeforeAfterSection from "@/components/beforeafter";
import ExpertTipsSection from "@/components/ExpertTipsSection";




export default function Home() {
  return (
    <div>
     <HeroSection2/>
     <MostPopularSectionExact/>
     <ShopByCategory/>
     <VideoHero/>
     <SynchronizedProductShowcase/>
     <FaceAutoCarousel/>
     <KBeautyAutoCarousel/>
     <ForYouTabSection/>
     <WhyChooseUs/>
     <CastomerTestimonials/>
     <div className="bg-background ">
      <BeforeAfterSection 
        beforeImage="https://plain-apac-prod-public.komododecks.com/202610/18/RxHxchJ2UAyuMxlVpF0l/image.png" 
        afterImage="https://plain-apac-prod-public.komododecks.com/202610/18/592ztAUbelF3gWwuIFvD/image.png" 
      />
    </div>
    <ExpertTipsSection/>
    
    </div>
  );
}
