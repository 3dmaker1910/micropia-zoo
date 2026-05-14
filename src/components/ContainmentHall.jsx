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

export default function ContainmentHall({ onGoToHub, onGoToMap, onGoToVectors, onNavigate }) {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);
  const [showAccessPanel, setShowShowAccessPanel] = useState(false);

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-white overflow-x-auto overflow-y-hidden relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Main UI Controls */}
      <div className="absolute top-6 left-8 z-40 flex flex-col gap-4">
        <button onClick={onGoToHub} className="px-6 py-2 bg-green-900/20 border border-green-500/40 rounded-full text-[10px] font-black tracking-widest text-green-400 hover:bg-green-500 hover:text-black transition-all">◀ OFICINA DRA. MICRA</button>
        <button onClick={onGoToMap} className="px-6 py-2 bg-blue-900/20 border border-blue-500/40 rounded-full text-[10px] font-black tracking-widest text-blue-400 hover:bg-blue-500 hover:text-black transition-all">🌐 MAPA DE INTELIGENCIA</button>
      </div>

      <div className="absolute top-6 right-8 z-40">
        <button 
          onClick={() => setShowShowAccessPanel(!showAccessPanel)}
          className="px-6 py-2 bg-orange-900/30 border border-orange-500/50 rounded-full text-[10px] font-black tracking-widest text-orange-400 hover:bg-orange-500 hover:text-black transition-all shadow-[0_0_20px_rgba(234,88,12,0.2)]"
        >
          {showAccessPanel ? '✕ CERRAR ACCESO' : '📂 PANEL DE SALAS'}
        </button>
      </div>

      <AnimatePresence>
        {showAccessPanel && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-20 right-8 w-80 bg-black/90 border-2 border-orange-500/30 backdrop-blur-2xl rounded-[2.5rem] p-6 z-50 shadow-2xl"
          >
            <h3 className="text-orange-500 font-black tracking-tighter uppercase italic mb-6 border-b border-orange-500/20 pb-2">Terminal de Acceso Nando</h3>
            <div className="space-y-3">
              {ACCESS_PANEL_ROOMS.map(room => (
                <button 
                  key={room.id} 
                  onClick={() => { onNavigate(room.id); setShowShowAccessPanel(false); }}
                  className="w-full flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-orange-500/20 hover:border-orange-500/40 transition-all text-left group"
                >
                  <span className="text-2xl">{room.icon}</span>
                  <div>
                    <p className="text-[10px] font-black text-white group-hover:text-orange-400">{room.name.toUpperCase()}</p>
                    <p className="text-[8px] text-white/40 uppercase tracking-widest">{room.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Muestra 5 Tubos ahora - Scroll Horizontal */}
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/10 font-black tracking-[1em] uppercase text-[10px] pointer-events-none">
        Pabellón de Contención BSL-4 • Muestras #001 - #005
      </div>
    </motion.div>
  );
}