import SEO from '@/components/SEO';
import { useState, useMemo } from 'react';
import { Shuffle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';

// Liste des 51 images de la sélection Décembre 2025
const projectImages = [
  'AMQ_1.png',
  'AdeleBlais_2.jpg',
  'Affilia_3.jpg',
  'Affilia_4.jpg',
  'Affilia_7.png',
  'Arsenal_1.jpg',
  'Arsenal_2.jpg',
  'CECS_2.jpg',
  'CQDE_2.jpg',
  'CQDE_4.jpg',
  'D28_24_14.jpg',
  'D28_24_17.jpg',
  'D28_24_19.jpg',
  'D28_24_5.jpg',
  'D28_25_4.jpg',
  'D28_25_5.jpg',
  'D28_25_6.jpg',
  'D28_25_9.jpg',
  'DocTocToc_1.jpg',
  'DocTocToc_2.jpg',
  'FJL_2.jpg',
  'FJL_3.jpg',
  'Humankind_1.jpg',
  'Humankind_2.jpg',
  'MBAM_1.jpg',
  'MBAM_2.jpg',
  'MBAM_9.jpg',
  'MJL_2025_1.jpg',
  'MJL_2025_4.jpg',
  'Matchstick_1.jpg',
  'Matchstick_2.jpg',
  'NouvelleIle_1.png',
  'O-Salon_1.jpg',
  'Psy-etc_1.jpg',
  'Psy-etc_2.jpg',
  'Queertech_1.jpg',
  'Queertech_2.jpg',
  'Reseau-Sante_1.jpg',
  'Reseau-Sante_2.jpg',
  'Rideau_4.jpg',
  'SSCO_1.jpg',
  'SSCO_2.jpg',
  'SSCO_3.jpg',
  'SummitLaw_1.jpg',
  'SummitLaw_13.jpg',
  'SummitLaw_2.jpg',
  'SummitLaw_3.jpg',
  'TAM_1.jpg',
  'TAM_3.jpg',
  'TAM_4.jpg',
  'Zu_2.jpg',
];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Projects() {
  const [images, setImages] = useState(projectImages);
  const [isShuffling, setIsShuffling] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setImages(shuffleArray(projectImages));
      setIsShuffling(false);
    }, 300);
  };

  // Assign sizes for masonry effect
  const imageSizes = useMemo(() => {
    return images.map((_, index) => {
      // Create varied sizes for visual interest
      const patterns = ['small', 'medium', 'large', 'small', 'medium'];
      return patterns[index % patterns.length];
    });
  }, [images]);

  return (
    <PageLayout>
      <SEO 
        title="Projects | Nukleo Digital Portfolio"
        description="Explore our portfolio of creative and digital projects. Branding, web design, mobile apps, marketing campaigns and more."
        keywords="portfolio, projects, branding, web design, digital agency, creative work"
      />
      
      <div className="min-h-screen bg-gradient-nukleo">
        {/* Hero Section */}
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container">
            <Breadcrumb items={[{ name: 'Projects', url: '/projects' }]} />

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 font-heading italic">
                  Our Work
                </h1>
                <p className="text-white/70 text-lg lg:text-xl max-w-2xl">
                  A selection of our recent projects across branding, web, digital, and creative campaigns.
                </p>
              </div>

              {/* Try Me Button */}
              <Button
                onClick={handleShuffle}
                disabled={isShuffling}
                className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Shuffle className={`w-5 h-5 transition-transform duration-300 ${isShuffling ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                Try Me
              </Button>
            </div>
          </div>
        </section>

        {/* Masonry Grid */}
        <section className="pb-24 lg:pb-32">
          <div className="container">
            <div 
              className={`columns-1 sm:columns-2 lg:columns-3 gap-6 transition-opacity duration-300 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
            >
              {images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white/5">
                    <img
                      src={`/projects/${image}`}
                      alt={image.replace(/[-_]/g, ' ').replace(/\.(jpg|png|jpeg)$/i, '')}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium truncate">
                          {image.replace(/[-_]/g, ' ').replace(/\.(jpg|png|jpeg)$/i, '').replace(/\d+$/, '').trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="glass rounded-3xl p-12 lg:p-16 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                Ready to Start<br />
                Your Project?
              </h2>

              <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
                Let's discuss how we can bring your vision to life.
              </p>

              <a href="/start-project">
                <Button
                  size="lg"
                  className="rounded-full text-lg px-10 py-8 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider"
                >
                  Start Your Project
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={`/projects/${lightboxImage}`}
            alt={lightboxImage}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageLayout>
  );
}
