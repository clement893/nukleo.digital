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
        {/* First 3 sections with unified hero background */}
        <div className="relative">
          {/* Unified Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-[rgb(107,23,22)]">
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
            
            {/* Animated Gradient Orbs */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[rgb(107,23,22)]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="relative z-10">
            <HeroSection />
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
