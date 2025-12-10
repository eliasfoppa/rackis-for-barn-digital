import { Layout } from "@/components/layout/Layout";
import { 
  HeroSection, 
  HowItWorksSection, 
  WhyChooseUsSection, 
  AboutBarncancerfondenSection,
  CTASection 
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <AboutBarncancerfondenSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
