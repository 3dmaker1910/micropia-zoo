import { useState } from 'react';
import { motion } from 'framer-motion';
import { microbes } from '../data/microbes';
import ContainmentTube from './ContainmentTube';
import MicrobeCard from './MicrobeCard';
import BiohazardIcon from './BiohazardIcon';

export default function ContainmentHall() {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);

  return (
    <div className="min-h-screen relative">
      <div className="sticky top-0 z-40 bg-lab-black/90 backdrop-blur-md border-b border-emergency/20">
        <div className="h-0.5" style={{ background: 'repeating-linear-gradient(90deg, #facc15, #facc15 10px, transparent 10px, transparent 20px)' }} />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="text-emergency">
              <BiohazardIcon size={28} />
            </motion.div>
            <div>
              <h1 className="text-sm font-bold tracking-[0.2em] text-emergency">MICROPIA</h1>
              <p className="text-[9px] tracking-[0.3em] text-neutral-600">SALA DE CONTENCIÓN BSL-4</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.div className="w-2 h-2 rounded-full bg-bio-green" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] text-bio-green/70 tracking-[0.2em] hidden sm:inline">CONTENCIÓN ACTIVA</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-emergency mb-3" style={{ textShadow: '0 0 30px rgba(250, 204, 21, 0.2)' }}>
          SALA DE CONTENCIÓN
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs tracking-[0.3em] text-neutral-500 uppercase max-w-md mx-auto">
          5 organismos de máxima peligrosidad biológica • Seleccione una muestra para inspección
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 py-1.5 border-y border-red-500/10 overflow-hidden">
          <motion.p animate={{ x: ['100%', '-100%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="text-[10px] text-red-500/40 tracking-[0.2em] whitespace-nowrap">
            ⚠ ADVERTENCIA: MATERIAL BIOLÓGICO NIVEL 4 • NO ROMPER EL VIDRIO DE CONTENCIÓN • PROTOCOLO DE EMERGENCIA: EVACUACIÓN INMEDIATA SI SE DETECTA RUPTURA • EQUIPO DE PROTECCIÓN OBLIGATORIO ⚠
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-5">
          {microbes.map((microbe, index) => (
            <ContainmentTube key={microbe.id} microbe={microbe} index={index} onClick={() => setSelectedMicrobe(microbe)} />
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-800/50 py-6 text-center">
        <p className="text-[10px] text-neutral-700 tracking-[0.3em] uppercase">Micropia: El Zoo Invisible • Instalación BSL-4 • Todos los organismos están contenidos</p>
      </div>

      {selectedMicrobe && <MicrobeCard microbe={selectedMicrobe} onClose={() => setSelectedMicrobe(null)} />}
    </div>
  );
}
