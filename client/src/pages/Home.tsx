import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';
import StructuredData, { organizationSchema, websiteSchema } from '@/components/StructuredData';
import ManifestoSection from '@/components/ManifestoSection';
import WhoWeServeSection from '@/components/WhoWeServeSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import TrinitySection from '@/components/TrinitySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative">
      <SEO 
        title="AI Transformation Agency | Agentic AI Solutions"
        description="Transform your business with AI-powered solutions. We help startups, SMBs, enterprises, and governments unlock the power of artificial intelligence through strategic consulting, intelligent platforms, and automated operations."
        keywords="AI transformation, artificial intelligence consulting, agentic AI, AI strategy, machine learning, AI automation, digital transformation, AI agency, enterprise AI, AI solutions, AI marketing, intelligent operations"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <WhoWeServeSection />
        <CapabilitiesSection />
        <TrinitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
