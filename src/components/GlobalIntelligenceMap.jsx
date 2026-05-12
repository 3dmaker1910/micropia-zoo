import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAP_BG_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/87091cecb05a4c829ff1f8ff5c875ff2_MAPA%20(1).jpg';

const HOTSPOTS = [
  {
    id: 'argentina',
    x: '22%',
    y: '78%',
    label: 'ARGENTINA — Ushuaia',
    sublabel: 'Brote Hantavirus • MV Hondius',
    icon: '🚢',
    color: '#ef4444',
    critical: true,
    navigateTo: 'mission',
  },
  {
    id: 'brazil',
    x: '30%',
    y: '52%',
    label: 'BRASIL — Río de Janeiro',
    sublabel: 'Corcovado • Próximamente',
    icon: '🗿',
    color: '#eab308',
    critical: false,
    navigateTo: null,
  },
];

function HotspotMarker({ spot, onClick, isHovered, onHover, onLeave }) {
  return (
    <motion.div
      className="absolute cursor-pointer z-20"
      style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}
      onClick={() => onClick(spot)}
      onMouseEnter={() => onHover(spot.id)}
      onMouseLeave={onLeave}
    >
      {/* Pulse rings for critical */}
      {spot.critical && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 60, height: 60,
              left: -30, top: -30,
              border: `2px solid ${spot.color}`,
            }}
            animate={{ scale: [0.5, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 60, height: 60,
              left: -30, top: -30,
              border: `2px solid ${spot.color}`,
            }}
            animate={{ scale: [0.5, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </>
      )}

      {/* Glow backdrop */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 40, height: 40,
          left: -20, top: -20,
          background: spot.color,
          filter: 'blur(12px)',
        }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Icon */}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 44, height: 44,
          marginLeft: -22, marginTop: -22,
          background: `${spot.color}25`,
          border: `2px solid ${spot.color}80`,
          boxShadow: `0 0 20px ${spot.color}40`,
        }}
        whileHover={{ scale: 1.2 }}
        animate={spot.critical ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span style={{ fontSize: '1.3rem' }}>{spot.icon}</span>
      </motion.div>

      {/* Label below */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <p className="font-bold tracking-wider text-center"
          style={{
            fontSize: '0.55rem',
            color: spot.color,
            textShadow: `0 0 8px ${spot.color}80, 0 1px 4px rgba(0,0,0,0.9)`,
          }}
        >
          {spot.label.split('—')[0].trim()}
        </p>
      </div>
    </motion.div>
  );
}

export default function GlobalIntelligenceMap({ onNavigate }) {
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [dataFeed, setDataFeed] = useState([]);

  useEffect(() => {
    const feeds = [
      '◈ SATÉLITE MICROPIA-7 — enlace activo',
      '◈ Sensor biológico #42 — Argentina — ALERTA',
      '◈ Red de vigilancia OMS — 147 nodos activos',
      '◈ Análisis genómico en tiempo real...',
      '◈ Hantavirus Andes — secuencia confirmada',
      '◈ MV Hondius — cuarentena nivel 3 activa',
      '◈ Paciente cero — rastreo en progreso...',
      '◈ Tierra del Fuego — perímetro sellado',
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setDataFeed((prev) => [...prev.slice(-4), feeds[idx % feeds.length]]);
      idx++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    if (spot.navigateTo) {
      setTimeout(() => onNavigate(spot.navigateTo), 1200);
    }
  };

  const hoveredData = HOTSPOTS.find((s) => s.id === hoveredSpot);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      style={{ background: '#050a14' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#050a14]/90 backdrop-blur-md border-b border-red-500/20">
        <div
          className="h-0.5"
          style={{
            background:
              'repeating-linear-gradient(90deg, #ef4444, #ef4444 10px, transparent 10px, transparent 20px)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('hall')}
            className="text-bio-green/70 hover:text-bio-green text-sm tracking-widest uppercase transition-colors flex items-center gap-1"
          >
            ◀ CONTENCIÓN
          </button>
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-red-400"
              style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.9rem)' }}
            >
              🌐 MAPA DE INTELIGENCIA GLOBAL
            </h1>
            <p
              className="tracking-[0.3em] text-neutral-600"
              style={{ fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)' }}
            >
              RED DE VIGILANCIA EPIDEMIOLÓGICA • MICROPIA v9.5
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              className="text-red-400/60 tracking-[0.2em] hidden sm:inline"
              style={{ fontSize: '0.6rem' }}
            >
              EN VIVO
            </span>
          </div>
        </div>
      </div>

      {/* Main map area with IMAGE background */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(239,68,68,0.15)',
            boxShadow: '0 0 80px rgba(239,68,68,0.05), inset 0 0 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* MAP IMAGE BACKGROUND */}
          <div className="relative" style={{ aspectRatio: '16/9' }}>
            <img
              src={MAP_BG_URL}
              alt="Mapa Mundial de Inteligencia"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(0.7) contrast(1.2) saturate(0.8)',
              }}
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(5,10,20,0.3) 0%, rgba(5,10,20,0.15) 50%, rgba(5,10,20,0.4) 100%)',
              }}
            />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)',
                boxShadow: '0 0 10px rgba(34,197,94,0.3)',
              }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Hotspot markers overlaid on the image */}
            {HOTSPOTS.map((spot) => (
              <HotspotMarker
                key={spot.id}
                spot={spot}
                onClick={handleSpotClick}
                isHovered={hoveredSpot === spot.id}
                onHover={setHoveredSpot}
                onLeave={() => setHoveredSpot(null)}
              />
            ))}

            {/* Top-left corner HUD */}
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-bio-green"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-bio-green/60 tracking-[0.2em] uppercase font-bold"
                  style={{ fontSize: '0.55rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                >
                  SATÉLITE MICROPIA-7 ACTIVO
                </span>
              </div>
            </div>

            {/* Bottom-right corner timestamp */}
            <div className="absolute bottom-3 right-3 z-10">
              <span className="text-neutral-500 tracking-wider"
                style={{ fontSize: '0.5rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
              >
                MICROPIA RED GLOBAL • v9.5
              </span>
            </div>
          </div>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredData && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 p-3 rounded-lg"
                style={{
                  background: 'rgba(5,10,20,0.95)',
                  border: `1px solid ${hoveredData.color}40`,
                  boxShadow: `0 0 20px ${hoveredData.color}15`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: hoveredData.color, boxShadow: `0 0 6px ${hoveredData.color}` }}
                  />
                  <span className="font-bold text-xs tracking-wider" style={{ color: hoveredData.color }}>
                    {hoveredData.icon} {hoveredData.label}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs tracking-wide">{hoveredData.sublabel}</p>
                {hoveredData.navigateTo && (
                  <p className="text-red-400/70 text-xs mt-1.5 tracking-wider animate-pulse">
                    ▶ CLIC PARA INICIAR MISIÓN
                  </p>
                )}
                {!hoveredData.navigateTo && (
                  <p className="text-yellow-400/50 text-xs mt-1.5 tracking-wider">
                    🔒 MISIÓN EN DESARROLLO
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Data feed + Legend */}
      <div className="max-w-6xl mx-auto px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data feed */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(5,15,30,0.8)',
            border: '1px solid rgba(34,197,94,0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-bio-green"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-bio-green/60 text-xs tracking-[0.3em] uppercase font-bold">
              Feed de Datos
            </span>
          </div>
          <div className="space-y-1 font-mono" style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)' }}>
            {dataFeed.map((line, i) => (
              <motion.p
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${i === dataFeed.length - 1 ? 'text-bio-green/80' : 'text-neutral-600'}`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(5,15,30,0.8)',
            border: '1px solid rgba(239,68,68,0.1)',
          }}
        >
          <span className="text-red-400/60 text-xs tracking-[0.3em] uppercase font-bold block mb-3">
            Puntos de Interés
          </span>
          <div className="space-y-3">
            {HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleSpotClick(spot)}
              >
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: `${spot.color}15`,
                    border: `1px solid ${spot.color}40`,
                  }}
                  animate={spot.critical ? { scale: [0.95, 1.05, 0.95] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{spot.icon}</span>
                </motion.div>
                <div>
                  <p className="text-xs font-bold tracking-wider group-hover:underline" style={{ color: spot.color }}>
                    {spot.label}
                  </p>
                  <p className="text-neutral-500" style={{ fontSize: '0.6rem' }}>{spot.sublabel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Argentina mission CTA */}
          <motion.button
            onClick={() => handleSpotClick(HOTSPOTS[0])}
            className="mt-4 w-full py-2.5 rounded-lg font-bold text-xs tracking-[0.15em] uppercase
                       transition-all duration-300"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239,68,68,0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🚢 IR A MISIÓN: HANTAVIRUS ARGENTINA
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Selected point transition overlay */}
      <AnimatePresence>
        {selectedSpot?.navigateTo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)' }}
          >
            <div className="text-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🚢
              </motion.div>
              <motion.p
                className="text-red-400 font-bold tracking-[0.3em] text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                INICIANDO MISIÓN...
              </motion.p>
              <p className="text-neutral-600 text-xs tracking-wider mt-2">
                CONECTANDO CON USHUAIA • HANTAVIRUS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-neutral-800/30 py-4 text-center">
        <p
          className="text-neutral-700 tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.65rem)' }}
        >
          Micropia v9.5 • Red de Inteligencia Global • Vigilancia Epidemiológica en Tiempo Real
        </p>
      </div>
    </motion.div>
  );
}
