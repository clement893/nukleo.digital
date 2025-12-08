import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import WhoWeServeSection from '@/components/WhoWeServeSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import TrinitySection from '@/components/TrinitySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative">
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
