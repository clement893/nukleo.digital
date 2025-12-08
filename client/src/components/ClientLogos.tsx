export default function ClientLogos() {
  const clients = [
    { name: 'MBAM', industry: 'Museum' },
    { name: 'Summit Law', industry: 'Legal' },
    { name: 'Affilia', industry: 'Healthcare' },
    { name: 'GoCoupons', industry: 'E-commerce' },
    { name: 'Humankind', industry: 'Social Impact' },
    { name: 'CDÉNÉ', industry: 'Education' },
    { name: 'MatchStick', industry: 'Marketing' },
    { name: 'Recrute Action', industry: 'Recruitment' },
    { name: 'Spruce', industry: 'Technology' },
    { name: 'Succès Scolaire', industry: 'Education' },
    { name: 'Toit à moi', industry: 'Real Estate' },
    { name: 'Ukko Solutions', industry: 'Technology' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-white/90">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powering Innovation Across
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Diverse Industries
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            From museums to tech startups, we've helped organizations transform their operations with AI
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-center gap-4"
            >
              {/* Logo placeholder - will be replaced with actual logos */}
              <div className="text-center">
                <div className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors mb-2">
                  {client.name}
                </div>
                <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-mono tracking-wider">
                  {client.industry}
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          <div className="text-center">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              12+
            </div>
            <div className="text-white/70 text-lg">
              Trusted Clients
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
              8+
            </div>
            <div className="text-white/70 text-lg">
              Industries Served
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
              340%
            </div>
            <div className="text-white/70 text-lg">
              Average ROI Increase
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
