import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { microbes } from '../data/microbes';
import ContainmentTube from './ContainmentTube';
import MicrobeCard from './MicrobeCard';
import SecurityGuard from './SecurityGuard';

const ACCESS_PANEL_ROOMS = [
  { id: 'mission', name: 'Misión Hantavirus', icon: '🚢', desc: 'Investigación en Ushuaia' },
  { id: 'vectors', name: 'Sala de la Pulga', icon: '🪳', desc: 'Vectores Biológicos' },
  { id: 'bodyscan', name: 'Escáner Corporal', icon: '🔬', desc: 'Auditoría Humana' },
  { id: 'cyanobacteria', name: 'Primer Aliento', icon: '🌍', desc: 'Isla de Oxigenación' },
  { id: 'autofagia', name: 'Sala de Autofagia', icon: '♻️', desc: 'Reciclaje Celular' },
  { id: 'conan', name: 'Unidad Conan', icon: '☢️', desc: 'Resistencia Extrema' },
  { id: 'holobionte', name: 'El Holobionte', icon: '🤰', desc: 'Evolución Humana' },
  { id: 'probioticos', name: 'Superhéroes VIP', icon: '🦸‍♂️', desc: 'Sala de Probióticos' },
  { id: 'flu', name: 'Virus del Hielo', icon: '❄️', desc: 'Gripe Española 1918' },
  { id: 'viruela', name: 'Corona de Muerte', icon: '👑', desc: 'El Milagro de Jenner' },
];

const BADGE_ICONS = {
  hanta: '🚢', vector: '🪳', scan: '🔬', oxygen: '🌍', recycle: '♻️', conan: '☢️', holo: '🤰', vip: '🦸‍♂️', ice: '❄️', crown: '👑'
};

export default function ContainmentHall({ onGoToHub, onGoToMap, onNavigate, badges = [] }) {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);
  const [showAccessPanel, setShowAccessPanel] = useState(false);

  const handleTerminalLink = (targetId) => {
    onNavigate(targetId);
    setShowAccessPanel(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Main UI Controls */}
      <div className="absolute top-6 left-8 z-40 flex flex-col gap-4">
        <button onClick={onGoToHub} className="px-6 py-2 bg-green-900/20 border border-green-500/40 rounded-full text-[10px] font-black tracking-widest text-green-400 hover:bg-green-500 hover:text-black transition-all shadow-lg">◀ OFICINA DRA. MICRA</button>
        <button onClick={onGoToMap} className="px-6 py-2 bg-blue-900/20 border border-blue-500/40 rounded-full text-[10px] font-black tracking-widest text-blue-400 hover:bg-blue-500 hover:text-black transition-all shadow-lg">🌐 MAPA DE INTELIGENCIA</button>
      </div>

      {/* BADGES DISPLAY */}
      <div className="absolute bottom-24 left-8 z-40 flex flex-col gap-3">
         <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">Parches de Honor Obtenidos</p>
         <div className="flex gap-2 flex-wrap max-w-[200px]">
            {badges.length > 0 ? badges.map(b => (
              <motion.div key={b} initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                 {BADGE_ICONS[b] || '🏅'}
              </motion.div>
            )) : (
              <div className="text-[9px] text-white/10 italic">Explora salas para ganar parches...</div>
            )}
         </div>
      </div>

      {/* BOTÓN TERMINAL DE SALAS - ENLARGED AND HIGHLIGHTED */}
      <div className="absolute top-6 right-8 z-50">
        <motion.button 
          onClick={() => setShowAccessPanel(!showAccessPanel)}
          whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,100,0,0.8)' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="px-12 py-7 bg-orange-600 border-4 border-white/20 rounded-[2.5rem] text-sm font-black tracking-[0.2em] text-white shadow-[0_0_50px_rgba(255,100,0,0.5)] hover:bg-orange-500 transition-all uppercase"
        >
          {showAccessPanel ? '✕ CERRAR UNIDAD' : '📂 ACCESO A SALAS'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showAccessPanel && (
          <motion.div 
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            className="fixed top-32 right-8 w-96 bg-black/95 border-2 border-orange-500/40 backdrop-blur-3xl rounded-[3.5rem] p-10 z-[60] shadow-[0_0_150px_rgba(0,0,0,1)]"
          >
            <h3 className="text-orange-500 font-black tracking-tighter uppercase italic mb-8 border-b border-orange-500/20 pb-4 text-center text-lg">Consola de Navegación</h3>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
              {ACCESS_PANEL_ROOMS.map(room => (
                <button 
                  key={room.id} 
                  onClick={() => handleTerminalLink(room.id)}
                  className="w-full flex items-center gap-6 p-5 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-orange-500/20 hover:border-orange-500/40 transition-all text-left group"
                >
                  <span className="text-4xl filter group-hover:scale-125 transition-transform">{room.icon}</span>
                  <div>
                    <p className="text-[12px] font-black text-white group-hover:text-orange-400 uppercase">{room.name}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-widest">{room.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hall Samples */}
      <div className="h-screen flex items-center justify-center p-10 pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex gap-8 md:gap-12 items-center justify-center">
          {microbes.map((m) => (
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/5 font-black tracking-[2em] uppercase text-[14px] pointer-events-none w-full text-center">
        Micropia Zoo Unit
      </div>
    </motion.div>
  );
}