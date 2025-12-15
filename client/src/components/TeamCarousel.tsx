import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import OptimizedImage from '@/components/OptimizedImage';

const teamMembers = [
  {
    name: "Clément",
    translationKey: "clement",
    image: "/team/Clement.webp",
    linkedin: "https://www.linkedin.com/in/clement-roy/"
  },
  {
    name: "Alexei",
    translationKey: "alexei",
    image: "/team/Alexei.webp",
    linkedin: "https://www.linkedin.com/in/alexei-bissonnette-9aa38a23a/"
  },
  {
    name: "Antoine",
    translationKey: "antoine",
    image: "/team/Antoine.webp",
    linkedin: "https://www.linkedin.com/in/antoine-doray-55b77b192/"
  },
  {
    name: "Margaux",
    translationKey: "margaux",
    image: "/team/Margaux.webp",
    linkedin: "https://www.linkedin.com/in/margaux-goethals-8407a5128/"
  },
  {
    name: "Camille",
    translationKey: "camille",
    image: "/team/Camille.webp",
    linkedin: "https://www.linkedin.com/in/camillegauthier226/"
  },
  {
    name: "Timothé",
    translationKey: "timothe",
    image: "/team/Timothe.webp",
    linkedin: "https://www.linkedin.com/in/timothe-lac/"
  },
  {
    name: "Sarah",
    translationKey: "sarah",
    image: "/team/Sarah.webp",
    linkedin: "https://www.linkedin.com/in/sarah-katerji/"
  },
  {
    name: "Séverine",
    translationKey: "severine",
    image: "/team/Severine.webp",
    linkedin: "https://www.linkedin.com/in/s%C3%A9verine-dimambro/"
  },
  {
    name: "Maxime",
    translationKey: "maxime",
    image: "/team/Maxime.webp",
    linkedin: "https://www.linkedin.com/in/maxime-besnier/"
  },
  {
    name: "Meriem",
    translationKey: "meriem",
    image: "/team/Meriem.webp",
    linkedin: "https://www.linkedin.com/in/meriem-kouidri16/"
  },
  {
    name: "Jean-François",
    translationKey: "jeanFrancois",
    image: "/team/Jean-Francois.webp",
    linkedin: "https://www.linkedin.com/in/jeffldev/"
  },
  {
    name: "Hind",
    translationKey: "hind",
    image: "/team/Hind.webp",
    linkedin: "https://www.linkedin.com/in/hind-djebien-767288195/"
  },
  {
    name: "Omar",
    translationKey: "omar",
    image: "/team/Omar.webp",
    linkedin: "https://www.linkedin.com/in/omarhamdi/"
  },
  {
    name: "Ricardo",
    translationKey: "ricardo",
    image: "/team/Ricardo.png",
    linkedin: "https://www.linkedin.com/in/ricardo-wierzynski/"
  },
  {
    name: "Marie-Claire",
    translationKey: "marieClaire",
    image: "/team/Marie-Claire.png",
    linkedin: "https://www.linkedin.com/in/marieclairelajeunesse/"
  }
];

export default function TeamCarousel() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Nombre de membres à afficher par slide selon la taille de l'écran
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 4; // desktop
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

  // Mettre à jour itemsPerSlide lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Obtenir les membres à afficher pour le slide actuel
  const getCurrentMembers = () => {
    const start = currentIndex * itemsPerSlide;
    return teamMembers.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-rose-900/30" />
      
      <div className="container px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-3">
            <span className="text-xs font-mono text-white/70">{t('home.team.sectionLabel') || 'NOTRE ÉQUIPE'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t('home.team.title') || 'Rencontrez Notre Équipe'}
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            {t('home.team.description') || 'Des experts passionnés qui transforment votre vision en réalité.'}
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center group"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Team Members Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const start = slideIndex * itemsPerSlide;
                const slideMembers = teamMembers.slice(start, start + itemsPerSlide);
                
                return (
                  <div
                    key={slideIndex}
                    className="min-w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-2"
                  >
                    {slideMembers.map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-2 md:mb-3">
                          {member.image === '/team/Ricardo.png' || member.image === '/team/Marie-Claire.png' ? (
                            <img 
                              src={member.image}
                              alt={(t('alt.teamMember') || '{{name}} - {{role}} chez Nukleo Digital')
                                .replace('{{name}}', member.name)
                                .replace('{{role}}', t(`about.team.${member.translationKey}.role`) || member.translationKey)}
                              width={200}
                              height={200}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <OptimizedImage 
                              src={member.image.endsWith('.webp') ? member.image.replace('.webp', '.png') : member.image}
                              webpSrc={member.image.endsWith('.webp') ? member.image : (member.image.endsWith('.png') ? member.image.replace('.png', '.webp') : undefined)}
                              alt={(t('alt.teamMember') || '{{name}} - {{role}} chez Nukleo Digital')
                                .replace('{{name}}', member.name)
                                .replace('{{role}}', t(`about.team.${member.translationKey}.role`) || member.translationKey)}
                              width={200}
                              height={200}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm md:text-base font-bold text-white mb-0.5 truncate">{member.name}</h3>
                            <p className="text-xs md:text-sm text-white/60 line-clamp-2">
                              {t(`about.team.${member.translationKey}.role`) || member.translationKey}
                            </p>
                          </div>
                          <a 
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-white transition-colors flex-shrink-0 ml-2"
                            aria-label={`${member.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="w-4 h-4 md:w-4 md:h-4" fill="currentColor" strokeWidth={0} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4 md:mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/30 hover:bg-white/50 w-1.5'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Link to About Page */}
        <div className="text-center mt-6 md:mt-8">
          <Link href={getLocalizedPath('/about')}>
            <button className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-fuchsia-500/50 transition-all duration-300 inline-flex items-center gap-2">
              <span>{t('home.team.cta') || 'Voir Toute l\'Équipe'}</span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

