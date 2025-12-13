// pages/Index.tsx - Restored to original structure
import { Layout } from "@/components/layout/Layout";
import { 
  HeroSection, 
  HowItWorksSection, // Must be imported for the fix to run
  WhyChooseUsSection, 
  PartnersSection,
  AboutCharitiesSection,
  CTASection 
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      {/* <PartnersSection /> */}
      <AboutCharitiesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;