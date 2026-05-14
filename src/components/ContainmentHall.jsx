import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { microbes } from '../data/microbes';
import ContainmentTube from './ContainmentTube';
import MicrobeCard from './MicrobeCard';
import SecurityGuard from './SecurityGuard';

const ACCESS_PANEL_ROOMS = [
  { id: 'mission', name: 'Misión Hantavirus', icon: '🚢', desc: 'Investigación en el Mar' },
  { id: 'vectors', name: 'Sala de la Pulga', icon: '🪳', desc: 'Vector: Peste Negra' },
  { id: 'bodyscan', name: 'Escáner Corporal', icon: '🔬', desc: 'Auditoría Biológica' },
  { id: 'cyanobacteria', name: 'Primer Aliento', icon: '🌍', desc: 'Isla de Oxigenación' },
  { id: 'autofagia', name: 'Sala de Autofagia', icon: '♻️', desc: 'Teoría de Ohsumi' },
];

export default function ContainmentHall({ onGoToHub, onGoToMap, onNavigate }) {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);
  const [showAccessPanel, setShowAccessPanel] = useState(false);

  const handleTerminalLink = (targetId) => {
    onNavigate(targetId);
    setShowAccessPanel(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-white overflow-x-auto overflow-y-hidden relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Botones de Control Directo */}
      <div className="absolute top-6 left-8 z-40 flex flex-col gap-3">
        <button onClick={onGoToHub} className="px-6 py-2 bg-green-900/20 border border-green-500/40 rounded-full text-[10px] font-black tracking-widest text-green-400 hover:bg-green-500 hover:text-black transition-all shadow-lg">◀ OFICINA DRA. MICRA</button>
        <button onClick={onGoToMap} className="px-6 py-2 bg-blue-900/20 border border-blue-500/40 rounded-full text-[10px] font-black tracking-widest text-blue-400 hover:bg-blue-500 hover:text-black transition-all shadow-lg">🌐 MAPA GLOBAL</button>
        <button onClick={() => onNavigate('vectors')} className="px-6 py-2 bg-orange-600 border border-orange-400 rounded-full text-[10px] font-black tracking-widest text-black hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,100,0,0.3)] animate-pulse">🪳 SALA DE VECTORES</button>
      </div>

      <div className="absolute top-6 right-8 z-40">
        <button 
          onClick={() => setShowAccessPanel(!showAccessPanel)}
          className="px-6 py-2 bg-slate-900 border border-white/20 rounded-full text-[10px] font-black tracking-widest text-white/60 hover:bg-white hover:text-black transition-all shadow-xl uppercase"
        >
          {showAccessPanel ? '✕ CERRAR TERMINAL' : '📂 TERMINAL DE ACCESO'}
        </button>
      </div>

      <AnimatePresence>
        {showAccessPanel && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }}
            className="fixed top-20 right-8 w-85 bg-black border-2 border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-6 z-50 shadow-2xl"
          >
            <div className="text-center mb-6">
              <h3 className="text-white font-black tracking-tighter uppercase italic text-sm">Unidad de Navegación</h3>
              <div className="h-1 w-12 bg-orange-500 mx-auto mt-1 rounded-full" />
            </div>

            <div className="space-y-2">
              {ACCESS_PANEL_ROOMS.map(room => (
                <button 
                  key={room.id} 
                  onClick={() => handleTerminalLink(room.id)}
                  className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <span className="text-3xl">{room.icon}</span>
                  <div>
                    <p className="text-[11px] font-black text-white/80">{room.name.toUpperCase()}</p>
                    <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold">{room.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-screen flex items-center px-20">
        <div className="flex gap-16 min-w-max items-center">
          {microbes.map((m, i) => (
            <div key={m.id} className="relative">
              <ContainmentTube microbe={m} onClick={() => setSelectedMicrobe(m)} />
            </div>
          ))}
        </div>
        <SecurityGuard />
      </div>

      <AnimatePresence>
        {selectedMicrobe && <MicrobeCard microbe={selectedMicrobe} onClose={() => setSelectedMicrobe(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}