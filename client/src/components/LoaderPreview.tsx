interface LoaderPreviewProps {
  loaderType: string;
  className?: string;
}

export default function LoaderPreview({ loaderType, className = "" }: LoaderPreviewProps) {
  // Render different loader previews based on type
  switch (loaderType) {
    case "current":
      return (
        <div className={`relative w-full h-48 bg-gradient-to-br from-purple-900 via-pink-900 to-cyan-900 rounded-lg overflow-hidden ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/Nukleo_blanc_RVB.svg" 
              alt="Logo" 
              className="w-24 h-24"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 1)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.8))'
              }}
            />
          </div>
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.7 + 0.3
                }}
              />
            ))}
          </div>
        </div>
      );

    case "kaleidoscope":
      return (
        <div className={`relative w-full h-48 bg-black rounded-lg overflow-hidden ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Kaleidoscope triangles */}
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <div
                  key={i}
                  className="absolute inset-0 animate-spin"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    animationDuration: '3s',
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div 
                    className="absolute top-0 left-1/2 w-0 h-0 -translate-x-1/2"
                    style={{
                      borderLeft: '30px solid transparent',
                      borderRight: '30px solid transparent',
                      borderBottom: `60px solid hsl(${rotation}, 80%, 60%)`,
                      opacity: 0.7
                    }}
                  />
                </div>
              ))}
              {/* Logo centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/Nukleo_blanc_RVB.svg" 
                  alt="Logo" 
                  className="w-16 h-16"
                />
              </div>
            </div>
          </div>
        </div>
      );

    case "liquid":
      return (
        <div className={`relative w-full h-48 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-lg overflow-hidden ${className}`}>
          <div className="absolute inset-0">
            {/* Liquid blobs */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full blur-3xl animate-pulse"
                style={{
                  width: `${120 + i * 40}px`,
                  height: `${120 + i * 40}px`,
                  background: `radial-gradient(circle, ${
                    i === 0 ? 'rgba(168, 85, 247, 0.6)' :
                    i === 1 ? 'rgba(236, 72, 153, 0.6)' :
                    'rgba(34, 211, 238, 0.6)'
                  }, transparent)`,
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  animationDuration: `${3 + i}s`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/Nukleo_blanc_RVB.svg" 
              alt="Logo" 
              className="w-20 h-20 relative z-10"
            />
          </div>
        </div>
      );

    case "matrix":
      return (
        <div className={`relative w-full h-48 bg-black rounded-lg overflow-hidden ${className}`}>
          <div className="absolute inset-0">
            {/* Matrix rain effect */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 text-green-500 text-xs font-mono opacity-70 animate-pulse"
                style={{
                  left: `${i * 7}%`,
                  animationDuration: `${1 + Math.random()}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                {Math.random().toString(36).substring(2, 8)}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/Nukleo_blanc_RVB.svg" 
              alt="Logo" 
              className="w-20 h-20 relative z-10"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 1))'
              }}
            />
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
          <p className="text-gray-400">Preview non disponible</p>
        </div>
      );
  }
}
