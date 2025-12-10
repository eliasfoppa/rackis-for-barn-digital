import { Layout } from "@/components/layout/Layout";
import { 
  HeroSection, 
  HowItWorksSection, 
  WhyChooseUsSection, 
  AboutCharitiesSection,
  CTASection 
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <AboutCharitiesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
