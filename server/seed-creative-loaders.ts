import { createLoader } from "./loaders";
import { generateAlternatingText } from "./loader-text-utils";

// Loader 1: Particules cosmiques avec effet de vortex
const loader1 = `<div class="nukleo-loader-cosmic">
  <style>
    .nukleo-loader-cosmic {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-cosmic::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(139, 92, 236, 0.3) 90deg,
        transparent 180deg,
        rgba(236, 72, 153, 0.3) 270deg,
        transparent 360deg
      );
      animation: cosmic-rotate 8s linear infinite;
    }
    
    @keyframes cosmic-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-cosmic .logo-container {
      position: relative;
      z-index: 10;
      animation: cosmic-pulse 2s ease-in-out infinite;
    }
    
    @keyframes cosmic-pulse {
      0%, 100% { 
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6));
      }
      50% { 
        transform: scale(1.1) rotate(5deg);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 150px rgba(34, 211, 238, 0.6));
      }
    }
    
    .nukleo-loader-cosmic .logo-container img {
      width: 220px;
      height: auto;
      animation: logo-glow 3s ease-in-out infinite;
    }
    
    @keyframes logo-glow {
      0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)); }
      50% { filter: brightness(1.3) drop-shadow(0 0 40px rgba(139, 92, 246, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.8)); }
    }
    
    .nukleo-loader-cosmic .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-cosmic .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(139, 92, 246, 1), transparent);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.8);
      animation: particle-orbit 4s linear infinite;
    }
    
    @keyframes particle-orbit {
      from {
        transform: rotate(0deg) translateX(150px) rotate(0deg);
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
      to {
        transform: rotate(360deg) translateX(150px) rotate(-360deg);
        opacity: 0.3;
      }
    }
    
    .nukleo-loader-cosmic .text {
      color: rgba(255, 255, 255, 0.95);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 16px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(236, 72, 153, 0.6);
    }
  </style>
  
  <div class="particles">
    ${Array.from({ length: 12 }, (_, i) => `
      <div class="particle" style="
        animation-delay: ${i * 0.33}s;
        animation-duration: ${4 + (i % 3) * 0.5}s;
      "></div>
    `).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-cosmic-text', 'color: rgba(255, 255, 255, 0.95); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 16px; letter-spacing: 0.5em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(236, 72, 153, 0.6);', '25%')}
</div>`;

// Loader 2: Glitch néon avec effet de scan
const loader2 = `<div class="nukleo-loader-glitch">
  <style>
    .nukleo-loader-glitch {
      position: fixed;
      inset: 0;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-glitch::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 255, 0.03) 2px,
          rgba(0, 255, 255, 0.03) 4px
        );
      animation: scan-line 0.1s linear infinite;
    }
    
    @keyframes scan-line {
      from { transform: translateY(0); }
      to { transform: translateY(4px); }
    }
    
    .nukleo-loader-glitch .logo-wrapper {
      position: relative;
      z-index: 10;
    }
    
    .nukleo-loader-glitch .logo-wrapper::before,
    .nukleo-loader-glitch .logo-wrapper::after {
      content: '';
      position: absolute;
      inset: -30px;
      border: 2px solid;
      border-radius: 50%;
      animation: ring-expand 2s ease-out infinite;
    }
    
    .nukleo-loader-glitch .logo-wrapper::before {
      border-color: rgba(0, 255, 255, 0.6);
      animation-delay: 0s;
    }
    
    .nukleo-loader-glitch .logo-wrapper::after {
      border-color: rgba(255, 0, 255, 0.6);
      animation-delay: 0.5s;
    }
    
    @keyframes ring-expand {
      0% {
        transform: scale(0.5);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    
    .nukleo-loader-glitch .logo {
      position: relative;
      width: 250px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.6));
      animation: glitch-effect 3s infinite;
    }
    
    @keyframes glitch-effect {
      0%, 90%, 100% {
        transform: translate(0);
        filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.6));
      }
      91% {
        transform: translate(-3px, 3px);
        filter: drop-shadow(0 0 30px rgba(0, 255, 255, 1)) drop-shadow(0 0 60px rgba(255, 0, 255, 0.8));
      }
      92% {
        transform: translate(3px, -3px);
        filter: drop-shadow(0 0 40px rgba(255, 0, 255, 1)) drop-shadow(0 0 80px rgba(0, 255, 255, 0.8));
      }
      93% {
        transform: translate(-2px, 2px);
        filter: drop-shadow(0 0 50px rgba(0, 255, 255, 1)) drop-shadow(0 0 100px rgba(255, 0, 255, 1));
      }
    }
    
    .nukleo-loader-glitch .text {
      color: rgba(0, 255, 255, 0.9);
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6);
    }
  </style>
  
  <div class="logo-wrapper">
    <img class="logo" src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-glitch-text', 'color: rgba(0, 255, 255, 0.9); font-family: \'JetBrains Mono\', monospace; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6);', '30%')}
</div>`;

// Loader 3: Morphing géométrique avec formes qui se transforment
const loader3 = `<div class="nukleo-loader-morph">
  <style>
    .nukleo-loader-morph {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-morph .shapes {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .nukleo-loader-morph .shape {
      position: absolute;
      border: 3px solid;
      animation: morph-shape 4s ease-in-out infinite;
    }
    
    .nukleo-loader-morph .shape-1 {
      width: 300px;
      height: 300px;
      border-color: rgba(139, 92, 246, 0.6);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      animation-delay: 0s;
    }
    
    .nukleo-loader-morph .shape-2 {
      width: 250px;
      height: 250px;
      border-color: rgba(236, 72, 153, 0.6);
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-morph .shape-3 {
      width: 200px;
      height: 200px;
      border-color: rgba(34, 211, 238, 0.6);
      border-radius: 50%;
      animation-delay: 1s;
    }
    
    @keyframes morph-shape {
      0%, 100% {
        transform: rotate(0deg) scale(1);
        opacity: 0.6;
        filter: blur(0px);
      }
      25% {
        transform: rotate(90deg) scale(1.1);
        opacity: 0.8;
        filter: blur(1px);
      }
      50% {
        transform: rotate(180deg) scale(0.9);
        opacity: 1;
        filter: blur(0px);
      }
      75% {
        transform: rotate(270deg) scale(1.05);
        opacity: 0.8;
        filter: blur(1px);
      }
    }
    
    .nukleo-loader-morph .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-morph 3s ease-in-out infinite;
    }
    
    @keyframes logo-morph {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6));
      }
      33% {
        transform: scale(1.05) rotate(-5deg);
        filter: drop-shadow(0 0 40px rgba(236, 72, 153, 0.8));
      }
      66% {
        transform: scale(1.05) rotate(5deg);
        filter: drop-shadow(0 0 50px rgba(34, 211, 238, 0.8));
      }
    }
    
    .nukleo-loader-morph .logo-container img {
      width: 200px;
      height: auto;
    }
    
    .nukleo-loader-morph .text {
      color: rgba(255, 255, 255, 0.9);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 15px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
    }
  </style>
  
  <div class="shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-morph-text', 'color: rgba(255, 255, 255, 0.9); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 15px; letter-spacing: 0.4em; text-transform: uppercase; text-shadow: 0 0 20px rgba(139, 92, 246, 0.8);', '28%')}
</div>`;

// Loader 4: Ondes et vibrations avec effet de liquide
const loader4 = `<div class="nukleo-loader-waves">
  <style>
    .nukleo-loader-waves {
      position: fixed;
      inset: 0;
      background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-waves .wave {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        transparent 0%,
        rgba(139, 92, 246, 0.1) 30%,
        transparent 60%
      );
      animation: wave-expand 3s ease-out infinite;
    }
    
    .nukleo-loader-waves .wave-1 {
      animation-delay: 0s;
    }
    
    .nukleo-loader-waves .wave-2 {
      animation-delay: 1s;
    }
    
    .nukleo-loader-waves .wave-3 {
      animation-delay: 2s;
    }
    
    @keyframes wave-expand {
      0% {
        transform: scale(0.5);
        opacity: 0.8;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    .nukleo-loader-waves .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-vibrate 2s ease-in-out infinite;
    }
    
    @keyframes logo-vibrate {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.7));
      }
      25% {
        transform: translate(2px, -2px) scale(1.02);
        filter: drop-shadow(0 0 35px rgba(139, 92, 246, 0.9));
      }
      50% {
        transform: translate(-2px, 2px) scale(1.02);
        filter: drop-shadow(0 0 45px rgba(236, 72, 153, 0.9));
      }
      75% {
        transform: translate(2px, 2px) scale(1.02);
        filter: drop-shadow(0 0 35px rgba(34, 211, 238, 0.9));
      }
    }
    
    .nukleo-loader-waves .logo-container img {
      width: 220px;
      height: auto;
    }
    
    .nukleo-loader-waves .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-waves .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(139, 92, 246, 0.8);
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
      animation: particle-float 4s ease-in-out infinite;
    }
    
    @keyframes particle-float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translate(30px, -40px) scale(1.5);
        opacity: 1;
      }
    }
    
    .nukleo-loader-waves .text {
      color: rgba(255, 255, 255, 0.9);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 14px;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      text-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
    }
  </style>
  
  <div class="wave wave-1"></div>
  <div class="wave wave-2"></div>
  <div class="wave wave-3"></div>
  
  <div class="particles">
    ${Array.from({ length: 15 }, (_, i) => {
      const positions = [
        [20, 25], [45, 30], [70, 20], [30, 50], [60, 60],
        [80, 45], [25, 70], [75, 25], [15, 55], [85, 65],
        [40, 15], [55, 75], [20, 40], [65, 50], [35, 80]
      ];
      const [left, top] = positions[i] || [50, 50];
      return `
        <div class="particle" style="
          left: ${left}%;
          top: ${top}%;
          animation-delay: ${i * 0.2}s;
          animation-duration: ${3 + (i % 3) * 0.5}s;
        "></div>
      `;
    }).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-waves-text', 'color: rgba(255, 255, 255, 0.9); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 14px; letter-spacing: 0.35em; text-transform: uppercase; text-shadow: 0 0 15px rgba(139, 92, 246, 0.7);', '30%')}
</div>`;

// Loader 5: Explosion de particules avec effet de feu
const loader5 = `<div class="nukleo-loader-explosion">
  <style>
    .nukleo-loader-explosion {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #000000 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-explosion::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(139, 92, 246, 0.2) 0%,
        rgba(236, 72, 153, 0.15) 30%,
        transparent 60%
      );
      animation: explosion-pulse 2s ease-in-out infinite;
    }
    
    @keyframes explosion-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.8;
      }
    }
    
    .nukleo-loader-explosion .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-explode 2.5s ease-in-out infinite;
    }
    
    @keyframes logo-explode {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6));
      }
      25% {
        transform: scale(1.1) rotate(-3deg);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8));
      }
      50% {
        transform: scale(1.15) rotate(0deg);
        filter: drop-shadow(0 0 60px rgba(139, 92, 246, 1)) drop-shadow(0 0 120px rgba(236, 72, 153, 1)) drop-shadow(0 0 180px rgba(34, 211, 238, 0.8));
      }
      75% {
        transform: scale(1.1) rotate(3deg);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8));
      }
    }
    
    .nukleo-loader-explosion .logo-container img {
      width: 240px;
      height: auto;
    }
    
    .nukleo-loader-explosion .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-explosion .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: particle-explode 3s ease-out infinite;
    }
    
    .nukleo-loader-explosion .particle-1 {
      background: radial-gradient(circle, rgba(139, 92, 246, 1), transparent);
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
    }
    
    .nukleo-loader-explosion .particle-2 {
      background: radial-gradient(circle, rgba(236, 72, 153, 1), transparent);
      box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
    }
    
    .nukleo-loader-explosion .particle-3 {
      background: radial-gradient(circle, rgba(34, 211, 238, 1), transparent);
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
    }
    
    @keyframes particle-explode {
      0% {
        transform: translate(0, 0) scale(0);
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(1);
        opacity: 0;
      }
    }
    
    .nukleo-loader-explosion .text {
      color: rgba(255, 255, 255, 0.95);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 16px;
      letter-spacing: 0.45em;
      text-transform: uppercase;
      font-weight: 300;
      text-shadow: 
        0 0 10px rgba(139, 92, 246, 0.8),
        0 0 20px rgba(236, 72, 153, 0.6),
        0 0 30px rgba(34, 211, 238, 0.4);
    }
  </style>
  
  <div class="particles">
    ${(() => {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const distance = 120 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const type = (i % 3) + 1;
        particles.push(`
          <div class="particle particle-${type}" style="
            --tx: ${tx}px;
            --ty: ${ty}px;
            animation-delay: ${i * 0.1}s;
            animation-duration: ${2.5 + Math.random() * 1}s;
          "></div>
        `);
      }
      return particles.join('');
    })()}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-explosion-text', 'color: rgba(255, 255, 255, 0.95); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 16px; letter-spacing: 0.45em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6), 0 0 30px rgba(34, 211, 238, 0.4);', '28%')}
</div>`;

// Loader 6: Geometric Lines - Lignes géométriques modernes avec effet de scan
const loader6 = `<div class="nukleo-loader-geometric">
  <style>
    .nukleo-loader-geometric {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-geometric::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%),
        linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.08) 50%, transparent 70%);
      animation: geometric-scan 4s ease-in-out infinite;
    }
    
    @keyframes geometric-scan {
      0%, 100% { opacity: 0.3; transform: translateX(-100%); }
      50% { opacity: 0.6; transform: translateX(100%); }
    }
    
    .nukleo-loader-geometric .lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-geometric .line {
      position: absolute;
      background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent);
      height: 1px;
      animation: line-sweep 3s ease-in-out infinite;
    }
    
    .nukleo-loader-geometric .line-horizontal {
      width: 100%;
      left: 0;
    }
    
    .nukleo-loader-geometric .line-vertical {
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.6), transparent);
    }
    
    @keyframes line-sweep {
      0%, 100% { opacity: 0; transform: scaleX(0); }
      50% { opacity: 1; transform: scaleX(1); }
    }
    
    .nukleo-loader-geometric .logo-container {
      position: relative;
      z-index: 10;
      animation: geometric-pulse 2.5s ease-in-out infinite;
    }
    
    @keyframes geometric-pulse {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6));
      }
      50% { 
        transform: scale(1.05);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 0.9)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.6));
      }
    }
    
    .nukleo-loader-geometric .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="lines">
    ${Array.from({ length: 5 }, (_, i) => `
      <div class="line line-horizontal" style="top: ${20 + i * 15}%; animation-delay: ${i * 0.3}s;"></div>
      <div class="line line-vertical" style="left: ${20 + i * 15}%; animation-delay: ${i * 0.3 + 0.15}s;"></div>
    `).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-geometric-text', 'color: rgba(255, 255, 255, 0.95); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);', '28%')}
</div>`;

// Loader 7: Floating Particles - Particules élégantes flottantes
const loader7 = `<div class="nukleo-loader-floating">
  <style>
    .nukleo-loader-floating {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #0f0519 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-floating::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%);
      animation: floating-glow 6s ease-in-out infinite;
    }
    
    @keyframes floating-glow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
    
    .nukleo-loader-floating .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-floating .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(139, 92, 246, 1), rgba(139, 92, 246, 0));
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
      animation: float 8s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0.4;
      }
      25% {
        transform: translateY(-30px) translateX(20px) scale(1.2);
        opacity: 0.8;
      }
      50% {
        transform: translateY(-60px) translateX(-10px) scale(1);
        opacity: 1;
      }
      75% {
        transform: translateY(-30px) translateX(-20px) scale(1.2);
        opacity: 0.8;
      }
    }
    
    .nukleo-loader-floating .logo-container {
      position: relative;
      z-index: 10;
      animation: floating-logo 3s ease-in-out infinite;
    }
    
    @keyframes floating-logo {
      0%, 100% { 
        transform: translateY(0) scale(1);
        filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.7));
      }
      50% { 
        transform: translateY(-10px) scale(1.03);
        filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.9)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.5));
      }
    }
    
    .nukleo-loader-floating .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="particles">
    ${Array.from({ length: 15 }, (_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 8;
      return `<div class="particle" style="left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-floating-text', 'color: rgba(255, 255, 255, 0.95); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);', '28%')}
</div>`;

// Loader 8: Light Rays - Rayons de lumière élégants
const loader8 = `<div class="nukleo-loader-rays">
  <style>
    .nukleo-loader-rays {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #1a0b2e 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-rays::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(139, 92, 246, 0.15) 45deg,
        rgba(236, 72, 153, 0.2) 90deg,
        rgba(139, 92, 246, 0.15) 135deg,
        transparent 180deg,
        rgba(139, 92, 246, 0.15) 225deg,
        rgba(236, 72, 153, 0.2) 270deg,
        rgba(139, 92, 246, 0.15) 315deg,
        transparent 360deg
      );
      animation: rays-rotate 12s linear infinite;
    }
    
    @keyframes rays-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-rays .rays {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-rays .ray {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 2px;
      height: 40%;
      background: linear-gradient(180deg, rgba(139, 92, 246, 0.8), transparent);
      transform-origin: top center;
      animation: ray-pulse 2s ease-in-out infinite;
    }
    
    @keyframes ray-pulse {
      0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
      50% { opacity: 0.8; transform: scaleY(1); }
    }
    
    .nukleo-loader-rays .logo-container {
      position: relative;
      z-index: 10;
      animation: rays-logo 2.5s ease-in-out infinite;
    }
    
    @keyframes rays-logo {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.7)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.5));
      }
      50% { 
        transform: scale(1.05);
        filter: drop-shadow(0 0 50px rgba(139, 92, 246, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.8));
      }
    }
    
    .nukleo-loader-rays .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="rays">
    ${Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * 360;
      return `<div class="ray" style="transform: rotate(${angle}deg) translateY(-50%); animation-delay: ${i * 0.15}s;"></div>`;
    }).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-rays-text', 'color: rgba(255, 255, 255, 0.95); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);', '28%')}
</div>`;

// Loader 9: Minimalist Abstract - Formes abstraites minimalistes
const loader9 = `<div class="nukleo-loader-minimalist">
  <style>
    .nukleo-loader-minimalist {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0f0519 0%, #1a0b2e 50%, #0f0519 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-minimalist::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
      animation: minimalist-pulse 4s ease-in-out infinite;
    }
    
    @keyframes minimalist-pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.2); }
    }
    
    .nukleo-loader-minimalist .shapes {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-minimalist .shape {
      position: absolute;
      border: 1px solid rgba(139, 92, 246, 0.4);
      animation: shape-rotate 6s linear infinite;
    }
    
    .nukleo-loader-minimalist .shape-circle {
      border-radius: 50%;
      border: 1px solid rgba(139, 92, 246, 0.3);
    }
    
    .nukleo-loader-minimalist .shape-square {
      border: 1px solid rgba(236, 72, 153, 0.3);
    }
    
    @keyframes shape-rotate {
      from { transform: rotate(0deg) scale(1); opacity: 0.3; }
      50% { transform: rotate(180deg) scale(1.1); opacity: 0.6; }
      to { transform: rotate(360deg) scale(1); opacity: 0.3; }
    }
    
    .nukleo-loader-minimalist .logo-container {
      position: relative;
      z-index: 10;
      animation: minimalist-logo 3s ease-in-out infinite;
    }
    
    @keyframes minimalist-logo {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
      }
      50% { 
        transform: scale(1.02);
        filter: drop-shadow(0 0 35px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.4));
      }
    }
    
    .nukleo-loader-minimalist .logo-container img {
      width: 200px;
      height: auto;
    }
  </style>
  
  <div class="shapes">
    ${Array.from({ length: 6 }, (_, i) => {
      const size = 80 + i * 40;
      const left = 50 - (size / 2) / 10;
      const top = 50 - (size / 2) / 10;
      const type = i % 2 === 0 ? 'shape-circle' : 'shape-square';
      const delay = i * 0.5;
      return `<div class="shape ${type}" style="width: ${size}px; height: ${size}px; left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  ${generateAlternatingText('nukleo-loader-minimalist-text', 'color: rgba(255, 255, 255, 0.95); font-family: \'Aktiv Grotesk\', sans-serif; font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 300; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.6);', '28%')}
</div>`;

export async function seedCreativeLoaders() {
  try {
    const existingLoaders = await import("./loaders").then((m) =>
      m.getAllLoaders()
    );

    const creativeLoaders = [
      {
        name: "Cosmic Vortex",
        description: "Particules cosmiques avec effet de vortex et rotation infinie",
        cssCode: loader1,
        isActive: false,
        displayOrder: 1,
      },
      {
        name: "Neon Glitch",
        description: "Effet de glitch néon avec scan lines et anneaux expansifs",
        cssCode: loader2,
        isActive: false,
        displayOrder: 2,
      },
      {
        name: "Geometric Morph",
        description: "Formes géométriques qui se transforment et se morphisent",
        cssCode: loader3,
        isActive: false,
        displayOrder: 3,
      },
      {
        name: "Wave Vibration",
        description: "Ondes et vibrations avec particules flottantes",
        cssCode: loader4,
        isActive: false,
        displayOrder: 4,
      },
      {
        name: "Particle Explosion",
        description: "Explosion de particules colorées avec effet de feu",
        cssCode: loader5,
        isActive: false,
        displayOrder: 5,
      },
      {
        name: "Geometric Lines",
        description: "Lignes géométriques modernes avec effet de scan élégant",
        cssCode: loader6,
        isActive: false,
        displayOrder: 6,
      },
      {
        name: "Floating Particles",
        description: "Particules élégantes flottantes avec mouvement fluide",
        cssCode: loader7,
        isActive: false,
        displayOrder: 7,
      },
      {
        name: "Light Rays",
        description: "Rayons de lumière élégants avec rotation douce",
        cssCode: loader8,
        isActive: false,
        displayOrder: 8,
      },
      {
        name: "Minimalist Abstract",
        description: "Formes abstraites minimalistes avec style épuré",
        cssCode: loader9,
        isActive: false,
        displayOrder: 9,
      },
    ];

    let created = 0;
    for (const loader of creativeLoaders) {
      const exists = existingLoaders.some((l) => l.name === loader.name);
      if (!exists) {
        await createLoader(loader);
        created++;
        console.log(`✅ Loader "${loader.name}" créé avec succès`);
      } else {
        console.log(`ℹ️ Loader "${loader.name}" existe déjà`);
      }
    }

    console.log(`✅ ${created} nouveaux loaders créatifs créés`);
    return { success: true, created };
  } catch (error) {
    // Don't log full error details to avoid rate limiting and excessive logs
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : null;
    
    // Check if it's a database connection error
    if (errorCode === 'ECONNREFUSED') {
      console.error("❌ Erreur lors de la création des loaders créatifs: Database connection refused");
      throw new Error("Database connection refused");
    }
    
    // For other errors, log a concise message
    console.error(`❌ Erreur lors de la création des loaders créatifs: ${errorMsg}`);
    throw error;
  }
}
