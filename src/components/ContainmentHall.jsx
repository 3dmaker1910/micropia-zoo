import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { microbes } from '../data/microbes';
import ContainmentTube from './ContainmentTube';
import MicrobeCard from './MicrobeCard';
import SecurityGuard from './SecurityGuard';

const ACCESS_PANEL_ROOMS = [
  { id: 'mission', name: 'Investigación Hantavirus', icon: '🚢', desc: 'Detective en MV Hondius', status: 'Activo' },
  { id: 'vectors', name: 'Sala de Vectores', icon: '🪳', desc: 'La Pulga de Nando', status: 'Activo' },
  { id: 'bodyscan', name: 'Escáner Corporal', icon: '🔬', desc: 'Análisis de Amenazas', status: 'Activo' },
  { id: 'cyanobacteria', name: 'Islas Cianobacterias', icon: '🦠', desc: 'Origen del Oxígeno', status: 'Activo' },
  { id: 'autofagia', name: 'Sala de Autofagia', icon: '♻️', desc: 'El Reciclaje Maestro', status: 'Activo' },
];

export default function ContainmentHall({ onGoToHub, onGoToMap, onNavigate }) {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);
  const [showAccessPanel, setShowShowAccessPanel] = useState(false);

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-white overflow-x-auto overflow-y-hidden relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Main UI Controls */}
      <div className="absolute top-6 left-8 z-40 flex flex-col gap-4">
        <button onClick={onGoToHub} className="px-6 py-2 bg-green-900/20 border border-green-500/40 rounded-full text-[10px] font-black tracking-widest text-green-400 hover:bg-green-500 hover:text-black transition-all shadow-lg">◀ OFICINA DRA. MICRA</button>
        <button onClick={onGoToMap} className="px-6 py-2 bg-blue-900/20 border border-blue-500/40 rounded-full text-[10px] font-black tracking-widest text-blue-400 hover:bg-blue-500 hover:text-black transition-all shadow-lg">🌐 MAPA DE INTELIGENCIA</button>
        <button onClick={() => onNavigate('vectors')} className="px-6 py-2 bg-orange-900/20 border border-orange-500/40 rounded-full text-[10px] font-black tracking-widest text-orange-400 hover:bg-orange-500 hover:text-black transition-all shadow-lg">🪳 SALA DE VECTORES</button>
      </div>

      <div className="absolute top-6 right-8 z-40">
        <button 
          onClick={() => setShowShowAccessPanel(!showAccessPanel)}
          className="px-6 py-2 bg-slate-900/60 border border-white/20 rounded-full text-[10px] font-black tracking-widest text-white/60 hover:bg-white hover:text-black transition-all shadow-xl"
        >
          {showAccessPanel ? '✕ CERRAR' : '📂 TERMINAL DE SALAS'}
        </button>
      </div>

      <AnimatePresence>
        {showAccessPanel && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-20 right-8 w-80 bg-black/95 border-2 border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-6 z-50 shadow-2xl"
          >
            <h3 className="text-white font-black tracking-tighter uppercase italic mb-6 border-b border-white/10 pb-2 text-center">Centro de Mando Micropia</h3>
            <div className="space-y-3">
              {ACCESS_PANEL_ROOMS.map(room => (
                <button 
                  key={room.id} 
                  onClick={() => { onNavigate(room.id); setShowShowAccessPanel(false); }}
                  className="w-full flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <span className="text-2xl">{room.icon}</span>
                  <div>
                    <p className="text-[10px] font-black text-white/80">{room.name.toUpperCase()}</p>
                    <p className="text-[8px] text-white/30 uppercase tracking-widest">{room.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hall - 5 Samples Display */}
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/5 font-black tracking-[1.5em] uppercase text-[12px] pointer-events-none">
        Bio-Containment Level 4
      </div>
    </motion.div>
  );
}