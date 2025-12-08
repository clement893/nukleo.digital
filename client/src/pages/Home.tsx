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
        {/* Hero with its own gradient */}
        <div className="relative">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(129deg, rgb(107, 23, 22) -8.84%, rgb(82, 61, 203) 106.82%)'
          }}>
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          <div className="relative z-10">
            <HeroSection />
          </div>
        </div>
        
        {/* Following sections with mirrored gradient */}
        <div className="relative">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(129deg, rgb(82, 61, 203) -8.84%, rgb(107, 23, 22) 106.82%)'
          }}>
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          <div className="relative z-10">
            <ManifestoSection />
            <WhoWeServeSection />
            <CapabilitiesSection />
          </div>
        </div>
        
        <TrinitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
