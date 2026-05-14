import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAP_BG_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/cf293892df9f4aa5af22a096d5ea7224_MAPA%20%20(1).jpg';

const HOTSPOTS = [
  { id: 'canada', x: '29%', y: '34%', label: 'CANADÁ', sublabel: 'Patógenos del Permafrost', icon: '🇨🇦', color: '#3b82f6', critical: false, navigateTo: null },
  { id: 'argentina_ship', x: '37%', y: '85%', label: 'ARGENTINA — Ushuaia', sublabel: 'MV Hondius', icon: '🚢', color: '#ef4444', critical: true, navigateTo: 'mission' },
  { id: 'virus_argentina', x: '39%', y: '88%', label: 'BROTE DETECTADO', sublabel: 'Cepa Andes', icon: '☣️', color: '#ef4444', critical: true, navigateTo: 'mission' },
  { id: 'netherlands', x: '46.5%', y: '35%', label: 'PAÍSES BAJOS', sublabel: 'Sede Central', icon: '🇳🇱', color: '#f97316', critical: true, navigateTo: null },
  { id: 'spain', x: '44.5%', y: '42%', label: 'ESPAÑA', sublabel: 'Madrid', icon: '🇪🇸', color: '#fbbf24', critical: true, navigateTo: null },
  { id: 'canarias', x: '40%', y: '44%', label: 'CANARIAS', sublabel: 'Estación Vigilancia', icon: '🏝️', color: '#f472b6', critical: false, navigateTo: null },
  { id: 'elba', x: '48.5%', y: '42%', label: 'ITALIA — Elba', sublabel: 'Fiebre Mediterránea', icon: '🇮🇹', color: '#60a5fa', critical: false, navigateTo: null },
  { id: 'seoul', x: '78%', y: '40%', label: 'COREA DEL SUR', sublabel: 'Seúl', icon: '🇰🇷', color: '#a855f7', critical: true, navigateTo: null },
  { id: 'cyanobacteria', x: '83%', y: '78%', label: 'AUSTRALIA', sublabel: 'Shark Bay', icon: '🦠', color: '#00c896', critical: true, navigateTo: 'cyanobacteria' },
];

function HotspotMarker({ spot, onClick, onHover, onLeave }) {
  return (
    <motion.div className="absolute cursor-pointer z-20" style={{ left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }} onClick={() => onClick(spot)} onMouseEnter={() => onHover(spot.id)} onMouseLeave={onLeave}>
      {spot.critical && <motion.div className="absolute rounded-full" style={{ width: 40, height: 40, left: -20, top: -20, border: `2px solid ${spot.color}` }} animate={{ scale: [0.8, 1.8], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />}
      <motion.div className="relative flex items-center justify-center rounded-full" style={{ width: 32, height: 32, marginLeft: -16, marginTop: -16, background: `${spot.color}40`, border: `2px solid ${spot.color}`, boxShadow: `0 0 15px ${spot.color}90` }} whileHover={{ scale: 1.3 }}>
        <span style={{ fontSize: '0.9rem' }}>{spot.icon}</span>
      </motion.div>
    </motion.div>
  );
}

export default function GlobalIntelligenceMap({ onNavigate }) {
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [dataFeed, setDataFeed] = useState([]);

  useEffect(() => {
    const feeds = ['◈ ENLACE AZUL ELÉCTRICO ACTIVO', '◈ MV Hondius: 12:00 ARR | 18:00 DEP', '◈ Trayecto: Mar Argentino -> Atlántico'];
    let idx = 0;
    const interval = setInterval(() => { setDataFeed((prev) => [...prev.slice(-3), feeds[idx % feeds.length]]); idx++; }, 3000);
    return () => clearInterval(interval);
  }, []);

  const hoveredData = HOTSPOTS.find((s) => s.id === hoveredSpot);

  return (
    <motion.div className="min-h-screen bg-black text-white overflow-hidden font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="p-4 border-b border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md flex items-center justify-between z-50 relative">
        <button onClick={() => onNavigate('hall')} className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">◀ PABELLÓN</button>
        <div className="text-center">
          <h1 className="text-base md:text-xl font-black italic text-cyan-400">Vigilancia Global</h1>
        </div>
        <div className="w-20" />
      </div>

      <div className="relative w-full h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-7xl h-full rounded-[3rem] overflow-hidden border border-white/10 bg-black">
          <img src={MAP_BG_URL} alt="Map" className="w-full h-full object-contain opacity-60" />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40">
             {/* Dotted lines for ship path */}
             <path d="M 480,850 L 520,800 L 580,750" fill="none" stroke="cyan" strokeWidth="1" strokeDasharray="4,4" />
             <text x="38%" y="82%" fill="cyan" fontSize="8" className="font-mono">12:00 ARR</text>
             <text x="42%" y="77%" fill="cyan" fontSize="8" className="font-mono">18:00 DEP</text>
          </svg>

          {HOTSPOTS.map((spot) => (
            <HotspotMarker key={spot.id} spot={spot} onClick={() => spot.navigateTo && onNavigate(spot.navigateTo)} onHover={setHoveredSpot} onLeave={() => setHoveredSpot(null)} />
          ))}

          <AnimatePresence>
            {hoveredData && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute top-10 right-10 w-72 p-6 bg-black/90 border border-cyan-500/40 backdrop-blur-3xl rounded-[2rem] z-30 shadow-2xl">
                <span className="text-5xl mb-2 block">{hoveredData.icon}</span>
                <h3 className="font-black text-sm text-cyan-400">{hoveredData.label}</h3>
                <p className="text-[10px] text-white/50">{hoveredData.sublabel}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}