import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';
import StructuredData, { organizationSchema, websiteSchema } from '@/components/StructuredData';
import ManifestoSection from '@/components/ManifestoSection';
import WhoWeServeSection from '@/components/WhoWeServeSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import TrinitySection from '@/components/TrinitySection';
import CTASection from '@/components/CTASection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ClientLogos from '@/components/ClientLogos';
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
        {/* First 4 sections with unified sandwich gradient */}
        <div className="relative">
          {/* Unified Background with Sandwich Effect */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 1200px 800px at 0% 0%, rgb(107,23,22) 0%, transparent 50%),
              radial-gradient(ellipse 1400px 1000px at 50% 50%, rgb(40,60,120) 0%, transparent 60%),
              radial-gradient(ellipse 1200px 800px at 100% 100%, rgb(107,23,22) 0%, transparent 50%),
              linear-gradient(135deg, rgb(82,61,203) 0%, rgb(30,20,60) 100%)
            `
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
            
            {/* Animated Gradient Orbs - Sandwich Effect */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-red-600/15 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-blue-900/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-600/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="relative z-10">
            <HeroSection />
            <ClientLogos />
            <ManifestoSection />
            <WhoWeServeSection />
            <CapabilitiesSection />
          </div>
        </div>
        
        <TrinitySection />
        <TestimonialsCarousel />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
