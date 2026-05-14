import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// NUEVO MAPA MUNDI PLANO AZUL ELÉCTRICO ENVIADO POR NANDO
const MAP_BG_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/cf293892df9f4aa5af22a096d5ea7224_MAPA%20%20(1).jpg';

const HOTSPOTS = [
  {
    id: 'canada',
    x: '23%',
    y: '30%',
    label: 'CANADÁ — Toronto',
    sublabel: 'Misión Ártica • Patógenos del Permafrost',
    icon: '🇨🇦',
    color: '#3b82f6',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'argentina',
    x: '31%',
    y: '88%',
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
    y: '25%',
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
    y: '36%',
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
    y: '44%',
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
    y: '36%',
    label: 'ITALIA — Isla de Elba',
    sublabel: 'Fiebre Mediterránea • Archivo Histórico',
    icon: '🇮🇹',
    color: '#60a5fa',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'capetown',
    x: '52%',
    y: '82%',
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
    y: '40%',
    label: 'COREA DEL SUR — Seúl',
    sublabel: 'Tecnología de Diagnóstico Cuántico',
    icon: '🇰🇷',
    color: '#a855f7',
    critical: true,
    navigateTo: null,
  },
  {
    id: 'cyanobacteria',
    x: '83%',
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
          className="absolute rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          style={{ width: 44, height: 44, left: -22, top: -22, border: `2px solid ${spot.color}` }}
          animate={{ scale: [0.8, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 34, height: 32, marginLeft: -17, marginTop: -16,
          background: `${spot.color}40`, border: `1px solid ${spot.color}`, boxShadow: `0 0 15px ${spot.color}90`
        }}
        whileHover={{ scale: 1.3, boxShadow: `0 0 30px ${spot.color}` }}
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
      '◈ SATÉLITE MICROPIA-7 — ENLACE AZUL ELÉCTRICO ACTIVO',
      '◈ Sensor biológico #42 — Ushuaia — ALERTA CRÍTICA',
      '◈ Red de vigilancia — 147 nodos sincronizados',
      '◈ Hantavirus Andes — secuencia confirmada en MV Hondius',
      '◈ Mapa Plano Proyectado — Vigilancia Global',
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
      className="min-h-screen bg-black text-white overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="p-4 border-b border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md flex items-center justify-between z-50 relative">
        <button onClick={() => onNavigate('hall')} className="text-[10px] font-black tracking-widest text-cyan-400 hover:text-cyan-300 uppercase">◀ PABELLÓN</button>
        <div className="text-center">
          <h1 className="text-base md:text-xl font-black tracking-tighter uppercase italic text-cyan-400 leading-none">Mapa de Inteligencia Global</h1>
          <p className="text-[8px] text-cyan-500/50 tracking-[0.5em] mt-1">UN MUNDO DENTRO DE TU MUNDO — AZUL ELÉCTRICO</p>
        </div>
        <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">VIVO</span>
        </div>
      </div>

      <div className="relative max-w-full mx-auto p-2 md:p-4 h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-cyan-500/10 shadow-[0_0_100px_rgba(0,255,255,0.05)] bg-black">
          <img 
            src={MAP_BG_URL} 
            alt="Mapa Plano Azul Eléctrico" 
            className="w-full h-full object-contain"
          />
          
          <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none" />
          
          <motion.div 
            className="absolute left-0 right-0 h-px bg-cyan-400/40 shadow-[0_0_20px_cyan] z-10"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-10 right-10 w-72 p-6 bg-black/90 border border-cyan-500/40 backdrop-blur-3xl rounded-[2rem] z-30 shadow-[0_0_50px_rgba(0,255,255,0.15)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl filter drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]">{hoveredData.icon}</span>
                  <div>
                    <h3 className="font-black text-sm uppercase italic tracking-tighter text-cyan-400">{hoveredData.label}</h3>
                    <p className="text-[10px] text-white/50 leading-tight uppercase font-bold tracking-wider">{hoveredData.sublabel}</p>
                  </div>
                </div>
                <div className="h-px bg-cyan-500/20 mb-4" />
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black tracking-widest text-cyan-300 uppercase animate-pulse">
                    {hoveredData.navigateTo ? '▸ ENLACE DISPONIBLE' : '🔒 ÁREA RESTRINGIDA'}
                  </p>
                  {hoveredData.critical && <span className="text-[8px] bg-red-600 text-white px-2 py-0.5 rounded font-black">ALERTA</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 flex justify-between items-end gap-6 pb-6">
        <div className="w-full md:w-[450px] p-4 rounded-2xl bg-cyan-950/10 border border-cyan-500/10 font-mono text-[9px] text-cyan-400/60">
          <p className="mb-2 text-cyan-400/40 uppercase font-black tracking-widest">Consola de Vigilancia Satelital</p>
          {dataFeed.map((line, i) => (
            <p key={i} className={i === dataFeed.length -1 ? 'text-cyan-300' : ''}>{line}</p>
          ))}
        </div>
        <div className="text-right opacity-30">
          <p className="text-[10px] text-cyan-400 uppercase tracking-[0.8em] font-black">Micropia Global Net • v11.2</p>
          <p className="text-[8px] text-cyan-400/50 mt-1 uppercase font-bold tracking-widest italic">Ubicaciones: América • Europa • África • Asia</p>
        </div>
      </div>
    </motion.div>
  );
}