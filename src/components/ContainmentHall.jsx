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
      className="min-h-screen bg-[#050505] text-white overflow-y-auto relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* CONTROLES SUPERIORES - ADAPTADOS A MÓVIL */}
      <div className="absolute top-4 left-4 right-4 z-40 flex flex-wrap gap-2 md:top-6 md:left-8 md:flex-col">
        <button onClick={onGoToHub} className="px-4 py-2 bg-green-900/40 border border-green-500/40 rounded-full text-[9px] font-black tracking-widest text-green-400 uppercase shadow-lg">◀ OFICINA</button>
        <button onClick={onGoToMap} className="px-4 py-2 bg-blue-900/40 border border-blue-500/40 rounded-full text-[9px] font-black tracking-widest text-blue-400 uppercase shadow-lg">🌐 MAPA</button>
        <button onClick={() => onNavigate('vectors')} className="px-4 py-2 bg-orange-600 border border-orange-400 rounded-full text-[9px] font-black tracking-widest text-black uppercase shadow-lg">🪳 VECTORES</button>
      </div>

      <div className="absolute top-4 right-4 z-40 md:top-6 md:right-8">
        <button 
          onClick={() => setShowAccessPanel(!showAccessPanel)}
          className="p-3 bg-slate-900 border border-white/20 rounded-full text-[10px] font-black text-white shadow-xl"
        >
          {showAccessPanel ? '✕' : '📂'}
        </button>
      </div>

      {/* TERMINAL DE ACCESO RESPONSIVA */}
      <AnimatePresence>
        {showAccessPanel && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }}
            className="fixed top-16 right-4 left-4 md:left-auto md:w-85 bg-black/95 border-2 border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-6 z-50 shadow-2xl"
          >
            <h3 className="text-white font-black tracking-tighter uppercase italic text-center mb-4">Menú de Acceso</h3>
            <div className="grid grid-cols-1 gap-2">
              {ACCESS_PANEL_ROOMS.map(room => (
                <button 
                  key={room.id} 
                  onClick={() => handleTerminalLink(room.id)}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl active:bg-orange-500/20"
                >
                  <span className="text-2xl">{room.icon}</span>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white/80">{room.name.toUpperCase()}</p>
                    <p className="text-[7px] text-white/30 uppercase tracking-widest">{room.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VISTA DE TUBOS - GRID PARA MÓVIL, FLEX PARA PC */}
      <div className="min-h-screen flex flex-col items-center justify-center p-10 pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-8 md:gap-16 items-center justify-center">
          {microbes.map((m) => (
            <div key={m.id} className="relative scale-90 md:scale-100">
              <ContainmentTube microbe={m} onClick={() => setSelectedMicrobe(m)} />
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-0">
           <SecurityGuard />
        </div>
      </div>

      <AnimatePresence>
        {selectedMicrobe && <MicrobeCard microbe={selectedMicrobe} onClose={() => setSelectedMicrobe(null)} />}
      </AnimatePresence>

      <div className="pb-10 text-center text-white/5 font-black tracking-[1em] uppercase text-[8px] pointer-events-none">
        Bio-Containment Unit BSL-4
      </div>
    </motion.div>
  );
}