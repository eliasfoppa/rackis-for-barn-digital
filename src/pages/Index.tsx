import { Layout } from "@/components/layout/Layout";
import { 
  HeroSection, 
  HowItWorksSection, // Must be imported for the fix to run
  WhyChooseUsSection, 
  AboutCharitiesSection,
  PartnersSection,
  CTASection 
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <AboutCharitiesSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default Index;