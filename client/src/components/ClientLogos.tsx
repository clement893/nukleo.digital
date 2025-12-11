import { Link } from 'wouter';

export default function ClientLogos() {
  const clients = [
    'MBAM',
    'Summit Law',
    'Affilia',
    'GoCoupons',
    'Humankind',
    'CDÉNÉ',
    'MatchStick',
    'Recrute Action',
    'Spruce',
    'Succès Scolaire',
    'Toit à moi',
    'Ukko Solutions',
  ];

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-12 relative overflow-hidden border-t border-white/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-white/50 mb-2">Trusted by</p>
          <Link href="/clients">
            <a className="text-white/70 hover:text-white transition-colors text-sm underline decoration-white/30 hover:decoration-white/70">
              View all clients →
            </a>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[rgb(30,20,60)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[rgb(30,20,60)] to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div className="flex gap-12 animate-scroll">
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 text-white/40 hover:text-white/70 transition-colors duration-300 text-lg font-medium tracking-wide whitespace-nowrap"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
