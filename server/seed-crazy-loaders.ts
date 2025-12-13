import { createLoader } from "./loaders";

// Loader 1: OCEAN - Vagues profondes avec bulles et créatures marines
const loaderOcean = `<div class="nukleo-loader-ocean">
  <style>
    .nukleo-loader-ocean {
      position: fixed;
      inset: 0;
      background: linear-gradient(180deg, #001122 0%, #003366 30%, #004488 60%, #001122 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-ocean::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(0, 191, 255, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 150, 255, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 50%);
      animation: ocean-shimmer 4s ease-in-out infinite;
    }
    
    @keyframes ocean-shimmer {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    
    .nukleo-loader-ocean .waves {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      overflow: hidden;
    }
    
    .nukleo-loader-ocean .wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      height: 100px;
      background: linear-gradient(90deg, 
        transparent 0%,
        rgba(0, 191, 255, 0.4) 25%,
        rgba(64, 224, 208, 0.5) 50%,
        rgba(0, 191, 255, 0.4) 75%,
        transparent 100%
      );
      border-radius: 50% 50% 0 0;
      animation: wave-move 3s ease-in-out infinite;
    }
    
    .nukleo-loader-ocean .wave-1 {
      animation-delay: 0s;
      opacity: 0.7;
      height: 80px;
    }
    
    .nukleo-loader-ocean .wave-2 {
      animation-delay: 0.5s;
      opacity: 0.5;
      height: 100px;
    }
    
    .nukleo-loader-ocean .wave-3 {
      animation-delay: 1s;
      opacity: 0.3;
      height: 120px;
    }
    
    @keyframes wave-move {
      0% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-10px); }
      100% { transform: translateX(-50%) translateY(0); }
    }
    
    .nukleo-loader-ocean .bubbles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-ocean .bubble {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 191, 255, 0.3));
      border: 2px solid rgba(255, 255, 255, 0.5);
      animation: bubble-rise 4s ease-in infinite;
    }
    
    @keyframes bubble-rise {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
      }
    }
    
    .nukleo-loader-ocean .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-float 3s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(0, 191, 255, 0.6)) drop-shadow(0 0 60px rgba(64, 224, 208, 0.4));
    }
    
    @keyframes logo-float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-10px) rotate(1deg);
      }
      50% {
        transform: translateY(-5px) rotate(0deg);
      }
      75% {
        transform: translateY(-10px) rotate(-1deg);
      }
    }
    
    .nukleo-loader-ocean .logo-container img {
      width: 250px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.8));
    }
    
    .nukleo-loader-ocean .text {
      position: absolute;
      bottom: 25%;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.95);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 16px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      font-weight: 300;
      animation: text-wave 2.5s ease-in-out infinite;
      text-shadow: 
        0 0 20px rgba(0, 191, 255, 0.8),
        0 0 40px rgba(64, 224, 208, 0.6),
        0 2px 10px rgba(0, 0, 0, 0.5);
    }
    
    @keyframes text-wave {
      0%, 100% { 
        opacity: 0.8; 
        transform: translateX(-50%) translateY(0);
      }
      50% { 
        opacity: 1; 
        transform: translateX(-50%) translateY(-3px);
      }
    }
  </style>
  
  <div class="waves">
    <div class="wave wave-1"></div>
    <div class="wave wave-2"></div>
    <div class="wave wave-3"></div>
  </div>
  
  <div class="bubbles">
    ${Array.from({ length: 20 }, (_, i) => {
      const size = 10 + Math.random() * 30;
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 3 + Math.random() * 2;
      return `
        <div class="bubble" style="
          width: ${size}px;
          height: ${size}px;
          left: ${left}%;
          animation-delay: ${delay}s;
          animation-duration: ${duration}s;
        "></div>
      `;
    }).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text">Choose Intelligence</div>
</div>`;

// Loader 2: AI - Réseaux neuronaux avec circuits et particules tech
const loaderAI = `<div class="nukleo-loader-ai">
  <style>
    .nukleo-loader-ai {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-ai::before {
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
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 255, 0.03) 2px,
          rgba(0, 255, 255, 0.03) 4px
        );
      animation: grid-pulse 2s ease-in-out infinite;
    }
    
    @keyframes grid-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    .nukleo-loader-ai .neural-network {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-ai .node {
      position: absolute;
      width: 12px;
      height: 12px;
      background: radial-gradient(circle, rgba(0, 255, 255, 1), rgba(0, 200, 255, 0.5));
      border-radius: 50%;
      box-shadow: 
        0 0 10px rgba(0, 255, 255, 0.8),
        0 0 20px rgba(0, 255, 255, 0.6),
        0 0 30px rgba(0, 255, 255, 0.4);
      animation: node-pulse 2s ease-in-out infinite;
    }
    
    @keyframes node-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.3);
        opacity: 1;
      }
    }
    
    .nukleo-loader-ai .connection {
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent,
        rgba(0, 255, 255, 0.6),
        rgba(0, 255, 255, 0.8),
        rgba(0, 255, 255, 0.6),
        transparent
      );
      transform-origin: left center;
      animation: connection-flow 2s ease-in-out infinite;
    }
    
    @keyframes connection-flow {
      0% {
        opacity: 0.3;
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.4);
      }
      50% {
        opacity: 1;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6);
      }
      100% {
        opacity: 0.3;
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.4);
      }
    }
    
    .nukleo-loader-ai .circuit {
      position: absolute;
      border: 2px solid rgba(0, 255, 255, 0.4);
      border-radius: 4px;
      animation: circuit-glow 3s ease-in-out infinite;
    }
    
    @keyframes circuit-glow {
      0%, 100% {
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        opacity: 0.5;
      }
      50% {
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4);
        opacity: 1;
      }
    }
    
    .nukleo-loader-ai .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-tech 2.5s ease-in-out infinite;
      filter: drop-shadow(0 0 40px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 80px rgba(0, 200, 255, 0.6));
    }
    
    @keyframes logo-tech {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 40px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 80px rgba(0, 200, 255, 0.6));
      }
      25% {
        transform: scale(1.05) rotate(0.5deg);
        filter: drop-shadow(0 0 50px rgba(0, 255, 255, 1)) drop-shadow(0 0 100px rgba(0, 200, 255, 0.8));
      }
      50% {
        transform: scale(1.08) rotate(0deg);
        filter: drop-shadow(0 0 60px rgba(0, 255, 255, 1)) drop-shadow(0 0 120px rgba(0, 200, 255, 1)) drop-shadow(0 0 180px rgba(100, 200, 255, 0.6));
      }
      75% {
        transform: scale(1.05) rotate(-0.5deg);
        filter: drop-shadow(0 0 50px rgba(0, 255, 255, 1)) drop-shadow(0 0 100px rgba(0, 200, 255, 0.8));
      }
    }
    
    .nukleo-loader-ai .logo-container img {
      width: 240px;
      height: auto;
    }
    
    .nukleo-loader-ai .text {
      position: absolute;
      bottom: 28%;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(0, 255, 255, 0.95);
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      letter-spacing: 0.6em;
      text-transform: uppercase;
      font-weight: 400;
      animation: text-blink 1.5s ease-in-out infinite;
      text-shadow: 
        0 0 10px rgba(0, 255, 255, 0.8),
        0 0 20px rgba(0, 255, 255, 0.6),
        0 0 30px rgba(0, 200, 255, 0.4);
    }
    
    @keyframes text-blink {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
  </style>
  
  <div class="neural-network">
    ${(() => {
      const nodes = [];
      const connections = [];
      const nodePositions = [
        [20, 20], [40, 15], [60, 25], [80, 20],
        [15, 40], [35, 35], [55, 40], [75, 35], [90, 40],
        [25, 60], [45, 55], [65, 60], [85, 55],
        [30, 80], [50, 75], [70, 80]
      ];
      
      nodePositions.forEach(([x, y], i) => {
        nodes.push(`
          <div class="node" style="
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${i * 0.1}s;
          "></div>
        `);
        
        if (i < nodePositions.length - 1) {
          const [x1, y1] = nodePositions[i];
          const [x2, y2] = nodePositions[i + 1];
          const dx = x2 - x1;
          const dy = y2 - y1;
          const length = Math.sqrt(dx * dx + dy * dy) * 10;
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          
          connections.push(`
            <div class="connection" style="
              left: ${x1}%;
              top: ${y1}%;
              width: ${length}px;
              transform: rotate(${angle}deg);
              animation-delay: ${i * 0.1}s;
            "></div>
          `);
        }
      });
      
      return nodes.join('') + connections.join('');
    })()}
    
    ${Array.from({ length: 8 }, (_, i) => {
      const size = 40 + Math.random() * 60;
      const left = Math.random() * 80 + 10;
      const top = Math.random() * 80 + 10;
      return `
        <div class="circuit" style="
          left: ${left}%;
          top: ${top}%;
          width: ${size}px;
          height: ${size}px;
          animation-delay: ${i * 0.3}s;
        "></div>
      `;
    }).join('')}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text">CHOOSE INTELLIGENCE</div>
</div>`;

// Loader 3: FUNK - Disco avec couleurs vives, formes dansantes et effets psychédéliques
const loaderFunk = `<div class="nukleo-loader-funk">
  <style>
    .nukleo-loader-funk {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #ff006e 75%, #8338ec 100%);
      background-size: 400% 400%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
      animation: funk-gradient 3s ease infinite;
    }
    
    @keyframes funk-gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .nukleo-loader-funk::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 30% 30%, rgba(255, 0, 110, 0.4), transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(131, 56, 236, 0.4), transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(58, 134, 255, 0.3), transparent 50%);
      animation: funk-shimmer 2s ease-in-out infinite;
    }
    
    @keyframes funk-shimmer {
      0%, 100% { opacity: 0.6; transform: rotate(0deg); }
      50% { opacity: 1; transform: rotate(180deg); }
    }
    
    .nukleo-loader-funk .disco-ball {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(200, 200, 200, 0.6));
      border-radius: 50%;
      box-shadow: 
        0 0 50px rgba(255, 255, 255, 0.8),
        0 0 100px rgba(255, 0, 110, 0.6),
        inset -20px -20px 40px rgba(0, 0, 0, 0.3);
      animation: disco-spin 3s linear infinite;
    }
    
    @keyframes disco-spin {
      from { transform: translateX(-50%) rotate(0deg); }
      to { transform: translateX(-50%) rotate(360deg); }
    }
    
    .nukleo-loader-funk .disco-light {
      position: absolute;
      width: 200px;
      height: 200px;
      background: conic-gradient(
        from 0deg,
        rgba(255, 0, 110, 0.8),
        rgba(131, 56, 236, 0.8),
        rgba(58, 134, 255, 0.8),
        rgba(255, 0, 110, 0.8)
      );
      border-radius: 50%;
      filter: blur(40px);
      animation: disco-light-rotate 2s linear infinite;
    }
    
    @keyframes disco-light-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .nukleo-loader-funk .shapes {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-funk .shape {
      position: absolute;
      animation: funk-dance 3s ease-in-out infinite;
    }
    
    .nukleo-loader-funk .shape-1 {
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, rgba(255, 0, 110, 0.8), rgba(131, 56, 236, 0.8));
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      top: 20%;
      left: 15%;
      animation-delay: 0s;
    }
    
    .nukleo-loader-funk .shape-2 {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(58, 134, 255, 0.8), rgba(255, 0, 110, 0.8));
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
      top: 70%;
      right: 20%;
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-funk .shape-3 {
      width: 120px;
      height: 120px;
      background: linear-gradient(90deg, rgba(131, 56, 236, 0.8), rgba(58, 134, 255, 0.8));
      border-radius: 50%;
      bottom: 15%;
      left: 10%;
      animation-delay: 1s;
    }
    
    @keyframes funk-dance {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 0.7;
      }
      25% {
        transform: translate(20px, -20px) rotate(90deg) scale(1.2);
        opacity: 1;
      }
      50% {
        transform: translate(-20px, 20px) rotate(180deg) scale(0.9);
        opacity: 0.8;
      }
      75% {
        transform: translate(20px, 20px) rotate(270deg) scale(1.1);
        opacity: 1;
      }
    }
    
    .nukleo-loader-funk .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-funk 2s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 60px rgba(255, 0, 110, 0.8)) drop-shadow(0 0 90px rgba(131, 56, 236, 0.6));
    }
    
    @keyframes logo-funk {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 60px rgba(255, 0, 110, 0.8));
      }
      25% {
        transform: scale(1.1) rotate(2deg);
        filter: drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 0, 110, 1)) drop-shadow(0 0 120px rgba(131, 56, 236, 0.8));
      }
      50% {
        transform: scale(1.15) rotate(0deg);
        filter: drop-shadow(0 0 50px rgba(255, 255, 255, 1)) drop-shadow(0 0 100px rgba(255, 0, 110, 1)) drop-shadow(0 0 150px rgba(131, 56, 236, 1)) drop-shadow(0 0 200px rgba(58, 134, 255, 0.8));
      }
      75% {
        transform: scale(1.1) rotate(-2deg);
        filter: drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 0, 110, 1)) drop-shadow(0 0 120px rgba(131, 56, 236, 0.8));
      }
    }
    
    .nukleo-loader-funk .logo-container img {
      width: 260px;
      height: auto;
    }
    
    .nukleo-loader-funk .text {
      position: absolute;
      bottom: 25%;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 1);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 18px;
      letter-spacing: 0.6em;
      text-transform: uppercase;
      font-weight: 700;
      animation: text-funk 1.5s ease-in-out infinite;
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 1),
        0 0 20px rgba(255, 0, 110, 0.8),
        0 0 30px rgba(131, 56, 236, 0.6),
        0 0 40px rgba(58, 134, 255, 0.4);
    }
    
    @keyframes text-funk {
      0%, 100% {
        opacity: 0.9;
        transform: translateX(-50%) scale(1);
        letter-spacing: 0.6em;
      }
      50% {
        opacity: 1;
        transform: translateX(-50%) scale(1.1);
        letter-spacing: 0.7em;
      }
    }
  </style>
  
  <div class="disco-light" style="top: 5%; left: 50%; transform: translateX(-50%);"></div>
  <div class="disco-ball"></div>
  
  <div class="shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text">CHOOSE INTELLIGENCE</div>
</div>`;

// Loader 4: BASQUIAT - Style graffiti avec couleurs primaires, formes brutes et énergie brute
const loaderBasquiat = `<div class="nukleo-loader-basquiat">
  <style>
    .nukleo-loader-basquiat {
      position: fixed;
      inset: 0;
      background: #ffd700;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-basquiat::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(0, 0, 0, 0.05) 10px,
          rgba(0, 0, 0, 0.05) 20px
        );
      opacity: 0.3;
    }
    
    .nukleo-loader-basquiat .paint-splashes {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-basquiat .splash {
      position: absolute;
      border-radius: 50% 40% 60% 30%;
      animation: splash-appear 2s ease-out infinite;
    }
    
    .nukleo-loader-basquiat .splash-red {
      background: #ff0000;
      width: 120px;
      height: 100px;
      top: 15%;
      left: 10%;
      animation-delay: 0s;
    }
    
    .nukleo-loader-basquiat .splash-blue {
      background: #0000ff;
      width: 90px;
      height: 110px;
      top: 70%;
      right: 15%;
      animation-delay: 0.5s;
    }
    
    .nukleo-loader-basquiat .splash-black {
      background: #000000;
      width: 150px;
      height: 130px;
      top: 40%;
      left: 5%;
      animation-delay: 1s;
    }
    
    @keyframes splash-appear {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(180deg);
        opacity: 0.8;
      }
      100% {
        transform: scale(1) rotate(360deg);
        opacity: 0.6;
      }
    }
    
    .nukleo-loader-basquiat .crown {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 60px;
      border: 6px solid #000000;
      border-bottom: none;
      clip-path: polygon(0% 100%, 20% 0%, 40% 50%, 50% 0%, 60% 50%, 80% 0%, 100% 100%);
      animation: crown-bounce 1.5s ease-in-out infinite;
    }
    
    @keyframes crown-bounce {
      0%, 100% {
        transform: translateX(-50%) translateY(0) rotate(0deg);
      }
      50% {
        transform: translateX(-50%) translateY(-15px) rotate(5deg);
      }
    }
    
    .nukleo-loader-basquiat .lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-basquiat .line {
      position: absolute;
      background: #000000;
      animation: line-draw 2s ease-in-out infinite;
    }
    
    .nukleo-loader-basquiat .line-1 {
      width: 200px;
      height: 4px;
      top: 25%;
      left: 20%;
      transform: rotate(15deg);
      animation-delay: 0s;
    }
    
    .nukleo-loader-basquiat .line-2 {
      width: 150px;
      height: 4px;
      bottom: 30%;
      right: 25%;
      transform: rotate(-20deg);
      animation-delay: 0.3s;
    }
    
    .nukleo-loader-basquiat .line-3 {
      width: 180px;
      height: 4px;
      top: 60%;
      left: 15%;
      transform: rotate(10deg);
      animation-delay: 0.6s;
    }
    
    @keyframes line-draw {
      0% {
        width: 0;
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        width: var(--final-width);
        opacity: 0.8;
      }
    }
    
    .nukleo-loader-basquiat .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-basquiat 2.5s ease-in-out infinite;
      filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 0, 0, 0.6));
    }
    
    @keyframes logo-basquiat {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 0px rgba(255, 0, 0, 0.6));
      }
      25% {
        transform: scale(1.05) rotate(-1deg);
        filter: drop-shadow(6px 6px 0px rgba(0, 0, 0, 1)) drop-shadow(-3px -3px 0px rgba(255, 0, 0, 0.8)) drop-shadow(2px 2px 0px rgba(0, 0, 255, 0.6));
      }
      50% {
        transform: scale(1.08) rotate(1deg);
        filter: drop-shadow(8px 8px 0px rgba(0, 0, 0, 1)) drop-shadow(-4px -4px 0px rgba(255, 0, 0, 1)) drop-shadow(4px 4px 0px rgba(0, 0, 255, 0.8));
      }
      75% {
        transform: scale(1.05) rotate(-1deg);
        filter: drop-shadow(6px 6px 0px rgba(0, 0, 0, 1)) drop-shadow(-3px -3px 0px rgba(255, 0, 0, 0.8)) drop-shadow(2px 2px 0px rgba(0, 0, 255, 0.6));
      }
    }
    
    .nukleo-loader-basquiat .logo-container img {
      width: 280px;
      height: auto;
      filter: contrast(1.2) brightness(1.1);
    }
    
    .nukleo-loader-basquiat .text {
      position: absolute;
      bottom: 22%;
      left: 50%;
      transform: translateX(-50%);
      color: #000000;
      font-family: 'Arial Black', sans-serif;
      font-size: 20px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      font-weight: 900;
      animation: text-basquiat 2s ease-in-out infinite;
      text-shadow: 
        3px 3px 0px rgba(255, 0, 0, 0.8),
        -2px -2px 0px rgba(0, 0, 255, 0.6),
        4px 4px 8px rgba(0, 0, 0, 0.5);
    }
    
    @keyframes text-basquiat {
      0%, 100% {
        opacity: 0.9;
        transform: translateX(-50%) translateY(0);
        letter-spacing: 0.3em;
      }
      50% {
        opacity: 1;
        transform: translateX(-50%) translateY(-5px);
        letter-spacing: 0.35em;
      }
    }
  </style>
  
  <div class="paint-splashes">
    <div class="splash splash-red"></div>
    <div class="splash splash-blue"></div>
    <div class="splash splash-black"></div>
  </div>
  
  <div class="crown"></div>
  
  <div class="lines">
    <div class="line line-1" style="--final-width: 200px;"></div>
    <div class="line line-2" style="--final-width: 150px;"></div>
    <div class="line line-3" style="--final-width: 180px;"></div>
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text">CHOOSE INTELLIGENCE</div>
</div>`;

export async function seedCrazyLoaders() {
  try {
    const existingLoaders = await import("./loaders").then((m) =>
      m.getAllLoaders()
    );

    const crazyLoaders = [
      {
        name: "Ocean Depths",
        description: "Vagues profondes avec bulles et créatures marines - ambiance océanique immersive",
        cssCode: loaderOcean,
        isActive: false,
        displayOrder: 10,
      },
      {
        name: "AI Neural Network",
        description: "Réseaux neuronaux avec circuits et particules tech - intelligence artificielle",
        cssCode: loaderAI,
        isActive: false,
        displayOrder: 11,
      },
      {
        name: "Funk Disco",
        description: "Disco avec couleurs vives, formes dansantes et effets psychédéliques - style funk",
        cssCode: loaderFunk,
        isActive: false,
        displayOrder: 12,
      },
      {
        name: "Basquiat Graffiti",
        description: "Style graffiti avec couleurs primaires, formes brutes et énergie brute - hommage Basquiat",
        cssCode: loaderBasquiat,
        isActive: false,
        displayOrder: 13,
      },
    ];

    let created = 0;
    for (const loader of crazyLoaders) {
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
    console.error("❌ Erreur lors de la création des loaders créatifs:", error);
    throw error;
  }
}
