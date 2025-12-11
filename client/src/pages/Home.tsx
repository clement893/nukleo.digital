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
import LEOChatUnified from '@/components/LEOChatUnified';

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
          {/* Unified Background - Style Arts & Culture */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, rgb(60,15,15) 0%, rgb(40,60,120) 50%, rgb(60,15,15) 100%)`
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
            
            {/* Animated Gradient Orbs - Réduites en intensité */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-blue-900/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }} />
          </div>
          
          <div className="relative z-10">
            <HeroSection />
            <ManifestoSection />
            <WhoWeServeSection />
            <CapabilitiesSection />
          </div>
        </div>
        
        <TrinitySection />
        <TestimonialsCarousel />
        <CTASection />
        <ClientLogos />
      </main>
      <Footer />
      <LEOChatUnified pageContext="home" autoOpen={true} />
    </div>
  );
}
