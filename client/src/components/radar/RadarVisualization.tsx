import { Technology } from "../../lib/radar/technologies";
import { useState } from "react";

interface RadarVisualizationProps {
  technologies: Technology[];
  onTechClick: (techId: string) => void;
}

export function RadarVisualization({ technologies, onTechClick }: RadarVisualizationProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const getDotColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "blue":
        return "bg-blue-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-16 aspect-video bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
      {/* Grille de fond */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-4">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="border border-dashed border-white/10"></div>
        ))}
      </div>

      {/* Labels des axes */}
      <div className="absolute top-0 left-0 right-0 grid grid-cols-8 text-xs text-white/40 text-center">
        <div className="p-2">Customer Service</div>
        <div className="p-2">Business Intelligence</div>
        <div className="p-2">Operations</div>
        <div className="p-2">Marketing</div>
        <div className="p-2">Sales & Support</div>
        <div className="p-2">Customer Experience</div>
        <div className="p-2">Risk Management</div>
        <div className="p-2">HR & Talent</div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around text-xs text-white/40 pl-2">
        <div>Adopt Now</div>
        <div>Trial & Evaluate</div>
        <div>Assess & Monitor</div>
        <div>Hold</div>
      </div>

      {/* Dots des technologies */}
      {technologies.map((tech) => (
        <div
          key={tech.id}
          className="absolute group cursor-pointer"
          style={{
            left: `${tech.radarPosition.x}%`,
            top: `${tech.radarPosition.y}%`,
            transform: "translate(-50%, -50%)"
          }}
          onClick={() => onTechClick(tech.id)}
          onMouseEnter={() => setHoveredTech(tech.id)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 border-white ${getDotColor(
              tech.maturityColor
            )} transition-all duration-300 group-hover:scale-[1.225] group-hover:shadow-lg`}
          ></div>

          {/* Tooltip */}
          {hoveredTech === tech.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none">
              {tech.title}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
