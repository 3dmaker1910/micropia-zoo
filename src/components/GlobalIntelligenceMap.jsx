import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// MAPA MUNDI PLANO - Ajuste fino de coordenadas
const MAP_BG_URL = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop';

const HOTSPOTS = [
  {
    id: 'canada',
    x: '18%',
    y: '25%',
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
    y: '85%',
    label: 'ARGENTINA — Ushuaia',
    sublabel: 'Brote Hantavirus • MV Hondius',
    icon: '🚢',
    color: '#ef4444',
    critical: true,
    navigateTo: 'mission',
  },
  {
    id: 'netherlands',
    x: '48.5%',
    y: '28%',
    label: 'PAÍSES BAJOS — Ámsterdam',
    sublabel: 'Sede Central Micropia',
    icon: '🇳🇱',
    color: '#f97316',
    critical: true,
    navigateTo: null,
  },
  {
    id: 'spain',
    x: '46.5%',
    y: '35%',
    label: 'ESPAÑA — Madrid',
    sublabel: 'Centro Nacional de Biotecnología',
    icon: '🇪🇸',
    color: '#fbbf24',
    critical: true,
    navigateTo: null,
  },
  {
    id: 'canarias',
    x: '44%',
    y: '43%',
    label: 'ISLAS CANARIAS',
    sublabel: 'Estación de Vigilancia Transatlántica',
    icon: '🏝️',
    color: '#f472b6',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'elba',
    x: '50.5%',
    y: '35%',
    label: 'ITALIA — Isla de Elba',
    sublabel: 'Fiebre Mediterránea • Archivo Histórico',
    icon: '🇮🇹',
    color: '#60a5fa',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'capetown',
    x: '52.5%',
    y: '80%',
    label: 'SUDÁFRICA — Ciudad del Cabo',
    sublabel: 'Resistencia Extrema • Vigilancia',
    icon: '🇿🇦',
    color: '#34d399',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'seoul',
    x: '84%',
    y: '38%',
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
    y: '78%',
    label: 'AUSTRALIA — Shark Bay',
    sublabel: 'Sala 3 • Cianobacterias: El Primer Aliento',
    icon: '🦠',
    color: '#00c896',
    critical: true,
    navigateTo: 'cyanobacteria',
  },
  {
    id: 'biotecnofilos',
    x: '62%',
    y: '86%',
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
          className="absolute rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{ width: 40, height: 40, left: -20, top: -20, border: `2px solid ${spot.color}` }}
          animate={{ scale: [0.8, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 32, height: 32, marginLeft: -16, marginTop: -16,
          background: `${spot.color}40`, border: `2px solid ${spot.color}`, boxShadow: `0 0 15px ${spot.color}80`
        }}
        whileHover={{ scale: 1.3, boxShadow: `0 0 25px ${spot.color}` }}
      >
        <span style={{ fontSize: '1rem' }}>{spot.icon}</span>
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
      className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="p-4 border-b border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-between z-50 relative">
        <button onClick={() => onNavigate('hall')} className="text-[10px] font-black tracking-widest text-cyan-400 hover:text-cyan-300 uppercase">◀ CONTENCIÓN</button>
        <div className="text-center">
          <h1 className="text-sm md:text-base font-black tracking-tighter uppercase italic text-cyan-400 leading-none">Vigilancia Global Micropia</h1>
          <p className="text-[8px] text-white/30 tracking-[0.4em] mt-1">BIO-HAZARD INTELLIGENCE NETWORK</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-black text-red-500 tracking-widest uppercase">Live</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4 md:p-6">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video">
          <img 
            src={MAP_BG_URL} 
            alt="World Map" 
            className="w-full h-full object-cover opacity-40 grayscale"
            style={{ filter: 'brightness(0.3) contrast(1.4) saturate(0)' }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none" />
          
          <motion.div 
            className="absolute left-0 right-0 h-px bg-cyan-500/30 shadow-[0_0_15px_cyan] z-10"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
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

          <AnimatePresence>
            {hoveredData && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bottom-8 right-8 w-72 p-5 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl rounded-3xl z-30 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{hoveredData.icon}</span>
                  <div>
                    <h3 className="font-black text-sm uppercase italic tracking-tighter" style={{ color: hoveredData.color }}>{hoveredData.label}</h3>
                    <p className="text-[10px] text-white/60 leading-tight uppercase font-bold tracking-wider">{hoveredData.sublabel}</p>
                  </div>
                </div>
                <div className="h-px bg-white/10 mb-3" />
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black tracking-widest text-cyan-400 uppercase">
                    {hoveredData.navigateTo ? '▸ Enlace Disponible' : '🔒 Acceso Bloqueado'}
                  </p>
                  {hoveredData.critical && <span className="text-[8px] bg-red-600 text-white px-2 py-0.5 rounded font-black animate-pulse">CRÍTICO</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
        <div className="w-full md:w-96 p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-[9px] text-cyan-500/50">
          <p className="mb-2 text-white/20 uppercase font-black tracking-widest">Sistema de Vigilancia Activo</p>
          {dataFeed.map((line, i) => (
            <p key={i} className={i === dataFeed.length -1 ? 'text-cyan-400' : ''}>{line}</p>
          ))}
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.6em] font-black">Micropia Global Network • v11.1</p>
          <p className="text-[8px] text-white/10 mt-1 uppercase font-bold tracking-widest">Sector de Inteligencia Epidemiológica • Acceso Nivel 4</p>
        </div>
      </div>
    </motion.div>
  );
}