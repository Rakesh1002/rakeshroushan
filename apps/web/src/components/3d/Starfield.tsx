/**
 * Lightweight CSS-only starfield replacing the Three.js version.
 * Saves ~880KB of JavaScript (three.js + react-three-fiber).
 * Uses CSS animations with randomized star positions via inline styles.
 */
export default function Starfield() {
  // Generate star positions deterministically
  const layers = [
    { count: 60, size: 1, duration: 80, opacity: 0.4 },
    { count: 40, size: 1.5, duration: 60, opacity: 0.6 },
    { count: 20, size: 2, duration: 40, opacity: 0.8 },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {layers.map((layer, li) => (
        <div
          key={li}
          className="absolute inset-0"
          style={{
            animation: `starfield-drift ${layer.duration}s linear infinite`,
          }}
        >
          {Array.from({ length: layer.count }, (_, i) => {
            // Deterministic pseudo-random based on index
            const seed = (li * 100 + i) * 2654435761;
            const x = ((seed >>> 0) % 10000) / 100;
            const y = (((seed * 31) >>> 0) % 10000) / 100;
            const delay = (((seed * 17) >>> 0) % 1000) / 100;

            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: layer.size,
                  height: layer.size,
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: layer.opacity * (0.5 + ((seed * 7 >>> 0) % 50) / 100),
                  animation: `starfield-twinkle ${3 + delay}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      ))}

      <style>{`
        @keyframes starfield-drift {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-5%) rotate(0.5deg); }
        }
        @keyframes starfield-twinkle {
          0%, 100% { opacity: inherit; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
