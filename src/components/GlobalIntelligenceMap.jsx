import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// MAPA MUNDI PLANO - Estética Técnica de Vigilancia
const MAP_BG_URL = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop';

const HOTSPOTS = [
  {
    id: 'canada',
    x: '18%',
    y: '22%',
    label: 'CANADÁ — Toronto',
    sublabel: 'Misión Ártica • Patógenos del Permafrost',
    icon: '🇨🇦',
    color: '#3b82f6',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'argentina',
    x: '28%',
    y: '78%',
    label: 'ARGENTINA — Ushuaia',
    sublabel: 'Brote Hantavirus • MV Hondius',
    icon: '🚢',
    color: '#ef4444',
    critical: true,
    navigateTo: 'mission',
  },
  {
    id: 'netherlands',
    x: '48%',
    y: '24%',
    label: 'PAÍSES BAJOS — Ámsterdam',
    sublabel: 'Sede Central Micropia',
    icon: '🇳🇱',
    color: '#f97316',
    critical: true,
    navigateTo: null,
  },
  {
    id: 'spain',
    x: '46%',
    y: '33%',
    label: 'ESPAÑA — Madrid',
    sublabel: 'Centro Nacional de Biotecnología',
    icon: '🇪🇸',
    color: '#fbbf24',
    critical: true,
    navigateTo: null,
  },
  {
    id: 'canarias',
    x: '43%',
    y: '42%',
    label: 'ISLAS CANARIAS',
    sublabel: 'Estación de Vigilancia Transatlántica',
    icon: '🏝️',
    color: '#f472b6',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'elba',
    x: '50%',
    y: '33%',
    label: 'ITALIA — Isla de Elba',
    sublabel: 'Fiebre Mediterránea • Archivo Histórico',
    icon: '🇮🇹',
    color: '#60a5fa',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'capetown',
    x: '53%',
    y: '75%',
    label: 'SUDÁFRICA — Ciudad del Cabo',
    sublabel: 'Resistencia Extrema • Vigilancia',
    icon: '🇿🇦',
    color: '#34d399',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'seoul',
    x: '85%',
    y: '35%',
    label: 'COREA DEL SUR — Seúl',
    sublabel: 'Tecnología de Diagnóstico Cuántico',
    icon: '🇰🇷',
    color: '#a855f7',
    critical: true,
    navigateTo: null,
  },
  {
    id: 'cyanobacteria',
    x: '82%',
    y: '75%',
    label: 'AUSTRALIA — Shark Bay',
    sublabel: 'Sala 3 • Cianobacterias: El Primer Aliento',
    icon: '🦠',
    color: '#00c896',
    critical: true,
    navigateTo: 'cyanobacteria',
  },
  {
    id: 'biotecnofilos',
    x: '65%',
    y: '85%',
    label: 'ISLA DE LOS BIOTECNÓFILOS',
    sublabel: 'Sala 4 • Biopelículas y Bacterias Sociales',
    icon: '🧫',
    color: '#a855f7',
    critical: true,
    navigateTo: 'biotecnofilos',
  },
];

function HotspotMarker({ spot, onClick, onHover, onLeave }) {
  return (
    <motion.div
      className="absolute cursor-pointer z-20"
      style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}
      onClick={() => onClick(spot)}
      onMouseEnter={() => onHover(spot.id)}
      onMouseLeave={onLeave}
    >
      {spot.critical && (
        <motion.div
          className="absolute rounded-full"
          style={{ width: 50, height: 50, left: -25, top: -25, border: `2px solid ${spot.color}` }}
          animate={{ scale: [0.6, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 36, height: 36, marginLeft: -18, marginTop: -18,
          background: `${spot.color}30`, border: `2px solid ${spot.color}90`, boxShadow: `0 0 15px ${spot.color}50`
        }}
        whileHover={{ scale: 1.25, boxShadow: `0 0 25px ${spot.color}` }}
      >
        <span style={{ fontSize: '1.1rem' }}>{spot.icon}</span>
      </motion.div>
    </motion.div>
  );
}

export default function GlobalIntelligenceMap({ onNavigate }) {
  const [hoveredSpot, setHoveredSpot] = useState(null);
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
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setDataFeed((prev) => [...prev.slice(-3), feeds[idx % feeds.length]]);
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const hoveredData = HOTSPOTS.find((s) => s.id === hoveredSpot);

  return (
    <motion.div 
      className="min-h-screen bg-[#020617] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
        <button onClick={() => onNavigate('hall')} className="text-xs font-bold tracking-widest text-cyan-400 hover:text-cyan-300">◀ VOLVER AL HALL</button>
        <div className="text-center">
          <h1 className="text-sm md:text-lg font-black tracking-tighter uppercase italic text-cyan-500">Mapa de Inteligencia Global</h1>
          <p className="text-[10px] text-white/40 tracking-widest">MICROPIA • UN MUNDO DENTRO DE TU MUNDO</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-red-500 tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative max-w-7xl mx-auto p-4 md:p-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
          <div className="relative" style={{ aspectRatio: '16/9' }}>
            <img 
              src={MAP_BG_URL} 
              alt="World Map" 
              className="w-full h-full object-cover opacity-60 grayscale brightness-75"
              style={{ filter: 'hue-rotate(180deg) invert(0.9) brightness(0.4) contrast(1.5)' }}
            />
            
            {/* Blue Tint Overlay */}
            <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
            
            {/* Scan Line */}
            <motion.div 
              className="absolute left-0 right-0 h-px bg-cyan-500/50 shadow-[0_0_10px_cyan] z-10"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {HOTSPOTS.map((spot) => (
              <HotspotMarker 
                key={spot.id} 
                spot={spot} 
                onClick={() => spot.navigateTo && onNavigate(spot.navigateTo)} 
                onHover={setHoveredSpot}
                onLeave={() => setHoveredSpot(null)}
              />
            ))}
          </div>

          {/* Tooltip Overlay */}
          <AnimatePresence>
            {hoveredData && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-8 right-8 w-64 p-4 bg-black/80 border border-white/20 backdrop-blur-xl rounded-2xl z-30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{hoveredData.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: hoveredData.color }}>{hoveredData.label}</h3>
                    <p className="text-[10px] text-white/50 leading-tight">{hoveredData.sublabel}</p>
                  </div>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <p className="text-[9px] font-bold tracking-widest text-cyan-400">
                  {hoveredData.navigateTo ? '▸ ACCESO DISPONIBLE' : '🔒 ÁREA RESTRINGIDA'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-[10px] text-cyan-500/70">
          <p className="mb-2 text-white/40 uppercase font-bold tracking-widest">Feed de Vigilancia</p>
          {dataFeed.map((line, i) => (
            <p key={i} className={i === dataFeed.length -1 ? 'text-cyan-400' : ''}>{line}</p>
          ))}
        </div>
        <div className="flex flex-col justify-center items-end text-right">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Red Global de Inteligencia • Micropia v11.0</p>
          <p className="text-[9px] text-white/20 mt-1">América • Europa • África • Asia • Oceanía</p>
        </div>
      </div>
    </motion.div>
  );
}