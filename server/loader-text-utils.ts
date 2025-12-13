// Fonction pour générer le texte alternatif avec animation
export const generateAlternatingText = (textClass: string, textStyles: string, bottomPosition: string = '25%') => {
  return `
    <div class="${textClass}">
      <span class="text-item" data-text="Choose Intelligence">Choose Intelligence</span>
      <span class="text-item" data-text="Choose Creativity">Choose Creativity</span>
      <span class="text-item" data-text="Choose The Future">Choose The Future</span>
    </div>
    <style>
      .${textClass} {
        position: fixed;
        bottom: ${bottomPosition};
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        pointer-events: none;
        height: 1.5em;
        overflow: hidden;
      }
      .${textClass} .text-item {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation: text-cycle-${textClass} 6s ease-in-out infinite;
        white-space: nowrap;
        ${textStyles}
      }
      .${textClass} .text-item:nth-child(1) {
        animation-delay: 0s;
      }
      .${textClass} .text-item:nth-child(2) {
        animation-delay: 2s;
      }
      .${textClass} .text-item:nth-child(3) {
        animation-delay: 4s;
      }
      @keyframes text-cycle-${textClass} {
        0%, 30% {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        5%, 25% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        35%, 100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
    </style>
  `;
};
