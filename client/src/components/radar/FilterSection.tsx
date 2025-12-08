import { categories, maturityLevels } from "../../lib/radar/technologies";

interface FilterSectionProps {
  categoryFilter: string;
  maturityFilter: string;
  onCategoryChange: (category: string) => void;
  onMaturityChange: (maturity: string) => void;
}

export function FilterSection({
  categoryFilter,
  maturityFilter,
  onCategoryChange,
  onMaturityChange
}: FilterSectionProps) {
  return (
    <section className="sticky top-20 z-20 backdrop-blur-xl bg-background/80 py-6 border-b border-white/10">
      <div className="container">
        {/* Rangée 1: Filtres par catégorie */}
        <div className="mb-4">
          <span className="text-sm text-white/60 mb-2 block">Filter by Category</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  categoryFilter === category
                    ? "bg-white/15 border border-white/30 text-white"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Rangée 2: Filtres par maturité */}
        <div>
          <span className="text-sm text-white/60 mb-2 block">Filter by Maturity</span>
          <div className="flex flex-wrap gap-2">
            {maturityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => onMaturityChange(level.id === "all" ? "All" : level.label)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  maturityFilter === (level.id === "all" ? "All" : level.label)
                    ? "bg-white/15 border border-white/30 text-white"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {level.id !== "all" && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      level.color === "green"
                        ? "bg-green-500"
                        : level.color === "yellow"
                        ? "bg-yellow-500"
                        : level.color === "blue"
                        ? "bg-blue-500"
                        : level.color === "red"
                        ? "bg-red-500"
                        : ""
                    }`}
                  ></span>
                )}
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
