import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { secretFiles } from '../data/secretFiles';
import { microbes } from '../data/microbes';

function SecretFileModal({ file, onClose }) {
  const [activeFactIndex, setActiveFactIndex] = useState(0);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl"
        initial={{ scale: 0.7, opacity: 0, rotateY: -20 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.7, opacity: 0, rotateY: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        style={{
          background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)',
          border: `1px solid ${file.color}40`,
          boxShadow: `0 0 80px ${file.color}30, inset 0 1px 0 ${file.color}20`,
        }}
      >
        {/* Top bar */}
        <div className="h-1.5 rounded-t-xl" style={{ background: `linear-gradient(90deg, transparent, ${file.color}, transparent)` }} />

        {/* Header */}
        <div className="p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white text-xl font-bold z-10"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs tracking-[0.3em] font-bold uppercase"
              style={{ background: `${file.color}20`, color: file.color, border: `1px solid ${file.color}30` }}
            >
              {file.classification}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              📁
            </motion.span>
            <div>
              <h2 className="font-bold text-lg" style={{ color: file.color }}>{file.codeName}</h2>
              <p className="text-neutral-400 text-sm italic">{file.name}</p>
            </div>
          </div>

          {/* Redacted stamp */}
          <div className="mt-3 p-2 rounded border border-red-500/20 bg-red-500/5 text-center">
            <span className="text-red-400/70 text-xs tracking-[0.4em] font-bold uppercase">
              ⚠ DOCUMENTO CLASIFICADO — SOLO PERSONAL AUTORIZADO ⚠
            </span>
          </div>
        </div>

        {/* Fact tabs */}
        <div className="px-6 flex gap-2 overflow-x-auto pb-2">
          {file.facts.map((fact, i) => (
            <button
              key={i}
              onClick={() => setActiveFactIndex(i)}
              className="shrink-0 px-3 py-1.5 rounded-md text-xs tracking-wider font-bold uppercase transition-all duration-200"
              style={{
                background: activeFactIndex === i ? `${file.color}25` : 'rgba(255,255,255,0.03)',
                color: activeFactIndex === i ? file.color : '#888',
                border: `1px solid ${activeFactIndex === i ? `${file.color}50` : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              Dato #{i + 1}
            </button>
          ))}
        </div>

        {/* Active fact content */}
        <div className="px-6 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFactIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-lg"
              style={{
                background: `${file.color}08`,
                border: `1px solid ${file.color}20`,
              }}
            >
              <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: file.color }}>
                <span className="text-lg">🔬</span>
                {file.facts[activeFactIndex].title}
              </h3>
              <p className="text-neutral-200 leading-relaxed text-sm">
                {file.facts[activeFactIndex].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span className="tracking-[0.2em]">ARCHIVO {activeFactIndex + 1}/{file.facts.length}</span>
            <span className="tracking-[0.2em]">Dr. Micra — Expedientes Secretos</span>
          </div>
        </div>

        <div className="h-0.5 rounded-b-xl" style={{ background: `linear-gradient(90deg, transparent, ${file.color}40, transparent)` }} />
      </motion.div>
    </motion.div>
  );
}

export default function DoctorHub({ onBack, onStartQuiz }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoveredFolder, setHoveredFolder] = useState(null);

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-lab-black/90 backdrop-blur-md border-b border-emergency/20">
        <div className="h-0.5"
          style={{ background: 'repeating-linear-gradient(90deg, #facc15, #facc15 10px, transparent 10px, transparent 20px)' }}
        />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-bio-green/70 hover:text-bio-green text-sm tracking-widest uppercase transition-colors flex items-center gap-1"
            >
              ◀ CONTENCIÓN
            </button>
          </div>
          <div className="text-center">
            <h1 className="font-bold tracking-[0.2em] text-emergency" style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.95rem)' }}>
              OFICINA DE LA DRA. MICRA
            </h1>
            <p className="tracking-[0.3em] text-neutral-600" style={{ fontSize: 'clamp(0.5rem, 1.3vw, 0.65rem)' }}>
              CENTRO DE INVESTIGACIÓN NIVEL 5
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-emergency"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-emergency/60 tracking-[0.2em] hidden sm:inline" style={{ fontSize: '0.65rem' }}>
              SESIÓN ACTIVA
            </span>
          </div>
        </div>
      </div>

      {/* Desk scene */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        {/* Header with microscope glow */}
        <div className="text-center mb-10 relative">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="text-5xl mb-4">
              <motion.span
                animate={{ 
                  filter: ['drop-shadow(0 0 8px #22c55e)', 'drop-shadow(0 0 20px #22c55e)', 'drop-shadow(0 0 8px #22c55e)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🔬
              </motion.span>
            </div>
            <h2 className="font-bold tracking-[0.15em] text-emergency mb-2"
              style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', textShadow: '0 0 30px rgba(250,204,21,0.2)' }}
            >
              EXPEDIENTES SECRETOS
            </h2>
            <p className="text-neutral-400 tracking-wider max-w-lg mx-auto" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>
              Archivos clasificados de la Dra. Micra. Cada carpeta contiene datos oscuros y desconocidos sobre los patógenos más letales del planeta.
            </p>
          </motion.div>
        </div>

        {/* Desk surface — folder grid */}
        <div className="relative mb-12">
          {/* Desk surface */}
          <div className="rounded-2xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(180deg, rgba(20,15,10,0.9) 0%, rgba(15,10,5,0.95) 100%)',
              border: '1px solid rgba(139,90,43,0.15)',
              boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(139,90,43,0.1)',
            }}
          >
            {/* Desk lamp glow */}
            <div className="absolute top-0 right-8 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.3) 0%, transparent 70%)' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {secretFiles.map((file, i) => {
                const microbe = microbes.find(m => m.id === file.microbeId);
                return (
                  <motion.div
                    key={file.microbeId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onMouseEnter={() => setHoveredFolder(file.microbeId)}
                    onMouseLeave={() => setHoveredFolder(null)}
                    onClick={() => setSelectedFile(file)}
                    className="cursor-pointer group"
                  >
                    <motion.div
                      className="relative rounded-xl p-4 text-center transition-all duration-300"
                      whileHover={{ y: -6, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: hoveredFolder === file.microbeId
                          ? `linear-gradient(180deg, ${file.color}15 0%, ${file.color}08 100%)`
                          : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${hoveredFolder === file.microbeId ? `${file.color}40` : 'rgba(255,255,255,0.05)'}`,
                        boxShadow: hoveredFolder === file.microbeId ? `0 0 30px ${file.color}20` : 'none',
                      }}
                    >
                      {/* Folder icon */}
                      <motion.div
                        className="text-4xl mb-3 relative"
                        animate={hoveredFolder === file.microbeId ? { rotate: [-2, 2, -2] } : {}}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        📂
                        {/* Microbe thumbnail */}
                        {microbe?.image && (
                          <img
                            src={microbe.image}
                            alt=""
                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                            style={{
                              border: `2px solid ${file.color}60`,
                              filter: `drop-shadow(0 0 4px ${file.color})`,
                            }}
                          />
                        )}
                      </motion.div>

                      <h3 className="font-bold text-sm mb-1 tracking-wide" style={{ color: file.color }}>
                        {file.name}
                      </h3>
                      <p className="text-neutral-600 text-xs tracking-wider uppercase">
                        {file.classification}
                      </p>

                      {/* Hover indicator */}
                      <motion.div
                        className="mt-3 text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: file.color }}
                      >
                        ▶ ABRIR
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quiz invitation */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl mx-auto rounded-2xl p-8"
            style={{
              background: 'linear-gradient(180deg, rgba(250,204,21,0.05) 0%, rgba(250,204,21,0.02) 100%)',
              border: '1px solid rgba(250,204,21,0.15)',
              boxShadow: '0 0 40px rgba(250,204,21,0.05)',
            }}
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧪
            </motion.div>
            <h3 className="font-bold tracking-[0.15em] text-emergency mb-3"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}
            >
              ¿LISTO PARA EL EXAMEN?
            </h3>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed max-w-md mx-auto">
              La Dra. Micra ha preparado un examen de 3 niveles. Demuestra tus conocimientos sobre los patógenos más letales de la historia y consigue las insignias de Bronce, Plata y Oro.
            </p>
            <motion.button
              onClick={onStartQuiz}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg font-bold tracking-[0.2em] uppercase text-sm
                       bg-emergency/10 text-emergency border border-emergency/30 
                       hover:bg-emergency/20 hover:border-emergency/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)]
                       transition-all duration-300"
            >
              🏆 INICIAR EXAMEN MULTI-NIVEL
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-800/50 py-6 text-center">
        <p className="text-neutral-700 tracking-[0.3em] uppercase" style={{ fontSize: 'clamp(0.55rem, 1.3vw, 0.7rem)' }}>
          Micropia v5.0 • El Horror Laboratory • Oficina de la Dra. Micra
        </p>
      </div>

      {/* Secret file modal */}
      <AnimatePresence>
        {selectedFile && (
          <SecretFileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
