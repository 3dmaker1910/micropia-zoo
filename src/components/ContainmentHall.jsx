import { useState } from 'react';
import { motion } from 'framer-motion';
import { microbes } from '../data/microbes';
import ContainmentTube from './ContainmentTube';
import MicrobeCard from './MicrobeCard';
import SecurityGuard from './SecurityGuard';
import STLModelViewer from './STLModelViewer';

const LOGO_URL = 'https://static.prod-images.emergentagent.com/jobs/b09505ba-190e-4ca7-9d47-23f73249f18b/images/35f7f965de88ecd8174371ab9698c7c29a20c26e2c37b5022fd3c115fce3eeac.png';

export default function ContainmentHall({ onGoToHub, onGoToMap, onGoToVectors }) {
  const [selectedMicrobe, setSelectedMicrobe] = useState(null);

  return (
    <div className="min-h-screen relative">
      {/* Top warning bar */}
      <div className="sticky top-0 z-40 bg-lab-black/90 backdrop-blur-md border-b border-emergency/20">
        <div className="h-0.5"
          style={{
            background: 'repeating-linear-gradient(90deg, #facc15, #facc15 10px, transparent 10px, transparent 20px)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.5))' }}
            >
              <img
                src={LOGO_URL}
                alt="Micropia"
                style={{ width: '44px', height: '44px', objectFit: 'contain' }}
              />
            </motion.div>
            <div>
              <h1 className="font-bold tracking-[0.2em] text-emergency"
                style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)' }}
              >
                MICROPIA
              </h1>
              <p className="tracking-[0.3em] text-neutral-600"
                style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)' }}
              >
                SALA DE CONTENCIÓN BSL-4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-bio-green"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-bio-green/70 tracking-[0.2em] hidden sm:inline"
              style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
            >
              CONTENCIÓN ACTIVA
            </span>
          </div>
        </div>
      </div>

      {/* Header section */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold tracking-[0.15em] text-emergency mb-3"
          style={{
            fontSize: 'clamp(1.3rem, 5vw, 2.2rem)',
            textShadow: '0 0 30px rgba(250, 204, 21, 0.2)',
          }}
        >
          SALA DE CONTENCIÓN
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="tracking-[0.3em] text-neutral-500 uppercase max-w-md mx-auto"
          style={{ fontSize: 'clamp(0.65rem, 2vw, 0.85rem)' }}
        >
          5 organismos de máxima peligrosidad biológica • Toca un domo para inspección
        </motion.p>

        {/* Warning ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 py-1.5 border-y border-red-500/10 overflow-hidden"
        >
          <motion.p
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-red-500/40 tracking-[0.2em] whitespace-nowrap"
            style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
          >
            ⚠ ADVERTENCIA: MATERIAL BIOLÓGICO NIVEL 4 • NO ROMPER EL VIDRIO DE CONTENCIÓN • 
            PROTOCOLO DE EMERGENCIA: EVACUACIÓN INMEDIATA SI SE DETECTA RUPTURA • 
            EQUIPO DE PROTECCIÓN OBLIGATORIO ⚠
          </motion.p>
        </motion.div>
      </div>

      {/* Containment tubes grid */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-5">
          {microbes.map((microbe, index) => (
            <ContainmentTube
              key={microbe.id}
              microbe={microbe}
              index={index}
              onClick={() => setSelectedMicrobe(microbe)}
            />
          ))}
        </div>
      </div>

      {/* Security Guard NPC */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="max-w-md">
          <SecurityGuard />
        </div>
      </div>

      {/* 3D Model Viewer — Yersinia pestis (Black Plague) in its containment tube */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <STLModelViewer modelType="plague" height={320} />
        </motion.div>
      </div>

      {/* Navigation buttons — Flow: Hall → Vector Room → Body Scanner → Doctor Hub */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button
            onClick={onGoToVectors}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(168,85,247,0.15)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-sm
                     transition-all duration-300 group overflow-hidden w-full sm:w-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.03) 100%)',
              border: '1px solid rgba(168,85,247,0.2)',
              color: '#a855f7',
              boxShadow: '0 0 30px rgba(168,85,247,0.05)',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at center, rgba(168,85,247,0.1) 0%, transparent 70%)' }}
            />
            <span className="relative z-10 flex items-center gap-3 justify-center">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🪳
              </motion.span>
              SIGUIENTE SALA: VECTORES
              <span className="text-purple-400/50">▶</span>
            </span>
            <span className="relative z-10 block text-xs text-neutral-500 mt-1 tracking-wider normal-case font-normal">
              Anatomía de la pulga • Xenopsylla cheopis • Modelo 3D
            </span>
          </motion.button>

          <motion.button
            onClick={onGoToHub}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(250,204,21,0.15)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="relative px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-sm
                     transition-all duration-300 group overflow-hidden w-full sm:w-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(250,204,21,0.08) 0%, rgba(250,204,21,0.03) 100%)',
              border: '1px solid rgba(250,204,21,0.2)',
              color: '#facc15',
              boxShadow: '0 0 30px rgba(250,204,21,0.05)',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at center, rgba(250,204,21,0.1) 0%, transparent 70%)' }}
            />
            <span className="relative z-10 flex items-center gap-3 justify-center">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔬
              </motion.span>
              DRA. MICRA
              <span className="text-emergency/50">▶</span>
            </span>
            <span className="relative z-10 block text-xs text-neutral-500 mt-1 tracking-wider normal-case font-normal">
              Expedientes secretos • Exámenes de 3 niveles • Insignias
            </span>
          </motion.button>

          <motion.button
            onClick={onGoToMap}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(239,68,68,0.15)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="relative px-8 py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-sm
                     transition-all duration-300 group overflow-hidden w-full sm:w-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.03) 100%)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#ef4444',
              boxShadow: '0 0 30px rgba(239,68,68,0.05)',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at center, rgba(239,68,68,0.1) 0%, transparent 70%)' }}
            />
            <span className="relative z-10 flex items-center gap-3 justify-center">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌐
              </motion.span>
              MAPA GLOBAL
              <span className="text-red-400/50">▶</span>
            </span>
            <span className="relative z-10 block text-xs text-neutral-500 mt-1 tracking-wider normal-case font-normal">
              Red de vigilancia epidemiológica • Misión Hantavirus
            </span>
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-800/50 py-6 text-center">
        <p className="text-neutral-700 tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
        >
          Micropia v8.0: El Zoo Invisible • Instalación BSL-4 • Todos los organismos están contenidos
        </p>
      </div>

      {/* Modal */}
      {selectedMicrobe && (
        <MicrobeCard
          microbe={selectedMicrobe}
          onClose={() => setSelectedMicrobe(null)}
        />
      )}
    </div>
  );
}
