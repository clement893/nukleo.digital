/**
 * Extended Window interface for global browser APIs
 */

interface Window {
  /**
   * Google Analytics data layer
   */
  dataLayer: unknown[];
  
  /**
   * Google Analytics gtag function
   */
  gtag: (...args: unknown[]) => void;
  
  /**
   * jsPDF library (loaded from CDN)
   */
  jspdf?: {
    jsPDF: new () => {
      text: (text: string, x: number, y: number) => void;
      save: (filename: string) => void;
      setFontSize: (size: number) => void;
      setTextColor: (r: number, g: number, b: number) => void;
      [key: string]: unknown;
    };
  };
  
  /**
   * WebKit AudioContext (for older browsers)
   */
  webkitAudioContext?: typeof AudioContext;
}

