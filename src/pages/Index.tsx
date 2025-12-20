import { Layout } from "@/components/layout/Layout";
import { 
  HeroSection, 
  HowItWorksSection,
  CommunitySection,
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
      <CommunitySection />
      <WhyChooseUsSection />
      <AboutCharitiesSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default Index;