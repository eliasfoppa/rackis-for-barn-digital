import { Layout } from "@/components/layout/Layout";
import { HeroSection, MissionSection, CTASection } from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
