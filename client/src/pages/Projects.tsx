import SEO from '@/components/SEO';
import { useState, useRef, useEffect } from 'react';
import { Shuffle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import OptimizedImage from '@/components/OptimizedImage';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';

// Liste de fallback des images (si l'API ne retourne rien)
const fallbackImages = [
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
  const { t } = useLanguage();
  // Load images from API (public endpoint - we'll make it public)
  const { data: uploadedImages, isLoading: isLoadingImages, error: imagesError } = trpc.projectsImages.list.useQuery(undefined, {
    retry: 2,
    refetchOnWindowFocus: false,
    // Add error handling
    onError: (error) => {
      console.error('[Projects] tRPC error:', error);
    },
    onSuccess: (data) => {
      console.log('[Projects] tRPC success:', data?.length, 'images');
    },
  });
  
  const [images, setImages] = useState<string[]>([]); // Start empty, will be populated from API
  const [isShuffling, setIsShuffling] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Update images when API data loads
  useEffect(() => {
    console.log('[Projects] API state:', { 
      uploadedImages, 
      isLoadingImages, 
      imagesError,
      count: uploadedImages?.length 
    });
    
    if (uploadedImages) {
      if (uploadedImages.length > 0) {
        // Use images from API
        const imageNames = uploadedImages.map(img => img.name);
        console.log('[Projects] Setting images:', imageNames);
        setImages(imageNames);
      } else {
        // API returned empty array - no images available
        console.log('[Projects] API returned empty array');
        setImages([]);
      }
    } else if (!isLoadingImages && !imagesError) {
      // API hasn't loaded yet, keep empty
      console.log('[Projects] API not loaded yet');
      setImages([]);
    }
    
    if (imagesError) {
      console.error('[Projects] API error:', imagesError);
    }
  }, [uploadedImages, isLoadingImages, imagesError]);

  // Intersection Observer pour charger les images seulement quand elles sont visibles
  useEffect(() => {
    if (images.length === 0) return;
    
    const observers: IntersectionObserver[] = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Utiliser requestIdleCallback pour différer l'initialisation de l'observer sur mobile
    const initObserver = () => {
      // Créer un seul observer pour toutes les images pour réduire la charge
      const observer = new IntersectionObserver(
        (entries) => {
          // Utiliser requestAnimationFrame pour différer les mises à jour d'état
          requestAnimationFrame(() => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
                if (index !== -1) {
                  setVisibleImages((prev) => new Set(prev).add(index));
                  observer.unobserve(entry.target);
                }
              }
            });
          });
        },
        {
          // Réduire rootMargin sur mobile pour améliorer les performances
          rootMargin: isMobile ? '30px' : '150px',
          threshold: 0.01,
        }
      );
      
      // Observer toutes les images en une seule passe
      imageRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
      
      observers.push(observer);
    };
    
    // Sur mobile, différer l'initialisation avec un délai plus long
    if (isMobile) {
      // Utiliser setTimeout au lieu de requestIdleCallback pour un meilleur contrôle
      setTimeout(initObserver, 200);
    } else {
      initObserver();
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [images]);

  // Précharger les premières images visibles immédiatement
  useEffect(() => {
    if (images.length === 0) return;
    
    // Detect mobile to reduce preload on mobile devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Réduire drastiquement le préchargement sur mobile pour améliorer les performances
    // Sur mobile, on charge seulement la première image immédiatement
    const setInitialImages = () => {
      const initialCount = isMobile ? Math.min(1, images.length) : Math.min(4, images.length);
      const initialSet = new Set(Array.from({ length: initialCount }, (_, i) => i));
      setVisibleImages(initialSet);
    };
    
    // Sur mobile, différer avec un délai plus long pour ne pas bloquer le rendu initial
    if (isMobile) {
      // Utiliser setTimeout avec un délai pour laisser le navigateur terminer le rendu initial
      setTimeout(setInitialImages, 100);
    } else {
      // Sur desktop, charger immédiatement mais avec moins d'images
      setInitialImages();
    }
  }, [images.length]);

  const handleShuffle = () => {
    setIsShuffling(true);
    setVisibleImages(new Set()); // Réinitialiser les images visibles
    setTimeout(() => {
      setImages(shuffleArray([...images]));
      setIsShuffling(false);
    }, 300);
  };

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
            <Breadcrumb items={[{ name: t('projects.title'), url: '/projects' }]} />

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 font-heading italic">
                  {t('projects.heroTitle')}
                </h1>
                <p className="text-white/70 text-lg lg:text-xl max-w-2xl">
                  {t('projects.description')}
                </p>
              </div>

              {/* Try Me Button */}
              <Button
                onClick={handleShuffle}
                disabled={isShuffling}
                className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Shuffle className={`w-5 h-5 transition-transform duration-300 ${isShuffling ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                {t('projects.tryMe')}
              </Button>
            </div>
          </div>
        </section>

        {/* Masonry Grid - 3 colonnes max */}
        <section className="pb-24 lg:pb-32">
          <div className="container">
            {isLoadingImages ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                <span className="ml-3 text-white/70">{t('projects.loadingImages')}</span>
              </div>
            ) : imagesError ? (
              <div className="flex flex-col items-center justify-center py-24">
                <p className="text-white/70 mb-4">{t('projects.errorLoading')}</p>
                <p className="text-white/50 text-sm">{t('projects.errorRefresh')}</p>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <p className="text-white/70 mb-2">{t('projects.noImages')}</p>
                <p className="text-white/50 text-sm">{t('projects.noImagesAdmin')}</p>
              </div>
            ) : (
              <div 
                className={`columns-1 sm:columns-2 lg:columns-3 gap-6 transition-opacity duration-300 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}
              >
                {images.map((image, index) => {
                const isVisible = visibleImages.has(index);
                const imageName = image.replace(/[-_]/g, ' ').replace(/\.(jpg|png|jpeg)$/i, '');
                const imageAlt = imageName.replace(/\d+$/, '').trim();
                
                return (
                  <div
                    key={`${image}-${index}`}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="break-inside-avoid mb-6 group cursor-pointer"
                    onClick={() => setLightboxImage(image)}
                    style={{ 
                      contentVisibility: 'auto',
                      containIntrinsicSize: '400px 300px' // Prévenir le CLS avec une taille intrinsèque
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10">
                      {/* Placeholder avec blur pendant le chargement */}
                      {!isVisible && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse" />
                      )}
                      
                      {/* Image optimisée */}
                      {isVisible ? (
                        <OptimizedImage
                          src={`/projects/${image}`}
                          alt={imageAlt}
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading={index < 1 ? 'eager' : 'lazy'}
                          fetchPriority={index < 1 ? 'high' : 'low'}
                          decoding="async"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        // Placeholder avec dimensions pour éviter le CLS
                        <div 
                          className="w-full bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                          aria-hidden="true"
                          style={{ 
                            width: '100%',
                            aspectRatio: '4/3',
                            minHeight: '300px',
                            maxHeight: '400px'
                          }}
                        />
                      )}
                      
                      {/* Hover Overlay */}
                      {isVisible && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm font-medium truncate">
                              {imageAlt}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="glass rounded-3xl p-12 lg:p-16 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                {t('projects.ctaTitle')}<br />
                {t('projects.ctaSubtitle')}
              </h2>

              <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
                {t('projects.ctaDescription')}
              </p>

              <a href="/start-project">
                <Button
                  size="lg"
                  className="rounded-full text-lg px-10 py-8 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider"
                >
                  {t('projects.ctaButton')}
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
          <OptimizedImage
            src={`/projects/${lightboxImage}`}
            alt={lightboxImage.replace(/[-_]/g, ' ').replace(/\.(jpg|png|jpeg)$/i, '')}
            width={1200}
            height={900}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            loading="eager"
            fetchPriority="high"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageLayout>
  );
}
