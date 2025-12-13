// RadarNew.tsx
import { useState } from "react";
import SEO from "@/components/SEO";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RadarHero } from "../components/radar/RadarHero";
import { FilterSection } from "../components/radar/FilterSection";
import { RadarVisualization } from "../components/radar/RadarVisualization";
import { TechnologyCard } from "../components/radar/TechnologyCard";
import { RadarCTA } from "../components/radar/RadarCTA";
import { technologies } from "../lib/radar/technologies";
export function RadarNew() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [maturityFilter, setMaturityFilter] = useState("All");

  // Filtrage des technologies
  const filteredTechnologies = technologies.filter((tech) => {
    const matchCategory = categoryFilter === "All" || tech.category === categoryFilter;
    const matchMaturity = maturityFilter === "All" || tech.maturity === maturityFilter;
    return matchCategory && matchMaturity;
  });

  // Scroll vers la carte au clic sur le dot
  const handleTechClick = (techId: string) => {
    const cardElement = document.getElementById(`card-${techId}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
      cardElement.classList.add("ring-2", "ring-purple-400", "ring-offset-2", "ring-offset-transparent");
      setTimeout(() => {
        cardElement.classList.remove("ring-2", "ring-purple-400", "ring-offset-2", "ring-offset-transparent");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Technology Radar 2024 | Proven AI Tools & Solutions"
        description="Discover AI technologies that matter for organizations of all sizes. Cut through the hype with proven ROI, realistic budgets, and fast implementation. Explore our curated AI technology radar."
        keywords="AI technology radar, AI tools 2024, AI adoption, AI implementation, AI ROI, enterprise AI, AI solutions, machine learning tools, AI platforms, AI maturity"
        ogImage="https://nukleo.digital/og-image.jpg"
      />
      <Header />
      {/* Hero Section */}
      <RadarHero />

      {/* Filter Section (Sticky) */}
      <FilterSection
        categoryFilter={categoryFilter}
        maturityFilter={maturityFilter}
        onCategoryChange={setCategoryFilter}
        onMaturityChange={setMaturityFilter}
      />

      {/* Radar Visualization */}
      <div className="container py-16">
        <RadarVisualization technologies={filteredTechnologies} onTechClick={handleTechClick} />
      </div>

      {/* Technology Cards Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnologies.map((tech) => (
              <TechnologyCard key={tech.id} {...tech} />
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredTechnologies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-white/60">
                No technologies match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <RadarCTA />
      <Footer />
    </div>
  );
}
