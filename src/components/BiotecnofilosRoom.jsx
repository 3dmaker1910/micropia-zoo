import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BiofilmCluster = ({ id, x, y, size, color, onInteraction }) => {
  const [isDisturbed, setIsDisturbed] = useState(false);

  const handleClick = () => {
    setIsDisturbed(true);
    onInteraction();
    setTimeout(() => setIsDisturbed(false), 2000);
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        filter: 'blur(8px)',
        boxShadow: `0 0 ${size / 2}px ${color}`,
      }}
      animate={{
        scale: isDisturbed ? [1, 1.4, 1.2] : [1, 1.1, 0.9, 1],
        rotate: isDisturbed ? [0, 90, 180] : [0, 5, -5, 0],
        opacity: isDisturbed ? 0.9 : 0.6,
      }}
      transition={{
        duration: isDisturbed ? 0.5 : 4 + (id % 3),
        repeat: isDisturbed ? 0 : Infinity,
        ease: "easeInOut"
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.2, filter: 'blur(4px)', opacity: 0.8 }}
    />
  );
};

const BiotecnofilosRoom = ({ handleNavigate }) => {
  const [alertVisible, setAlertVisible] = useState(true);
  const [interactionCount, setInteractionCount] = useState(0);

  const clusters = [
    { id: 1, x: 20, y: 30, size: 250, color: 'rgba(0, 255, 100, 0.4)' },
    { id: 2, x: 60, y: 20, size: 300, color: 'rgba(150, 0, 255, 0.3)' },
    { id: 3, x: 40, y: 60, size: 200, color: 'rgba(0, 200, 255, 0.4)' },
    { id: 4, x: 75, y: 70, size: 180, color: 'rgba(255, 255, 0, 0.2)' },
    { id: 5, x: 10, y: 75, size: 220, color: 'rgba(255, 50, 50, 0.2)' },
  ];

  const handleInteraction = useCallback(() => {
    setInteractionCount(prev => prev + 1);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-screen h-screen bg-black overflow-hidden font-sans"
    >
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(#111 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <motion.header 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="p-8 text-center bg-gradient-to-b from-green-900/40 to-transparent border-b border-green-500/30"
        >
          <h1 className="text-4xl md:text-6xl font-black text-green-400 tracking-tighter uppercase italic">
            Sector Biotecnófilos
          </h1>
          <p className="text-green-200/60 mt-2 font-mono uppercase tracking-widest text-sm">
            Biofilms: Resistencia Colectiva Detectada
          </p>
        </motion.header>

        {/* Interaction Area */}
        <div className="flex-1 relative">
          {clusters.map(c => (
            <BiofilmCluster 
              key={c.id} 
              {...c} 
              onInteraction={handleInteraction}
            />
          ))}

          {/* Floating Instructions */}
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-center pointer-events-none"
          >
            <p className="text-2xl font-bold uppercase">Toca las colonias para analizar la matriz</p>
          </motion.div>
        </div>

        {/* Dra. Micra Panel */}
        <AnimatePresence>
          {alertVisible && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute bottom-24 right-8 max-w-md bg-black/80 border-2 border-green-500 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,255,0,0.3)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex-shrink-0 animate-pulse border-2 border-white/50 flex items-center justify-center text-3xl">
                  👩‍🔬
                </div>
                <div>
                  <h3 className="text-green-400 font-bold uppercase text-lg">Dra. Micra - Alerta</h3>
                  <p className="text-white/90 text-sm leading-relaxed mt-1">
                    "Nando, observa cómo estas bacterias se comunican. No son individuos aislados, ¡son una superestructura! Este biofilm las protege incluso de los desinfectantes más potentes."
                  </p>
                  <button 
                    onClick={() => setAlertVisible(false)}
                    className="mt-4 text-[10px] text-green-500 hover:text-white uppercase tracking-tighter"
                  >
                    [ Cerrar Transmisión ]
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <footer className="p-8 flex justify-center gap-6 bg-gradient-to-t from-black to-transparent">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,197,94,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate('hall')}
            className="px-8 py-3 bg-green-600 text-black font-black rounded-full uppercase tracking-widest hover:bg-green-400 transition-colors"
          >
            Volver al Pabellón
          </motion.button>
        </footer>
      </div>

      {/* Counter UI */}
      <div className="absolute top-32 left-8 font-mono text-green-500/50">
        <p>DATOS RECOLECTADOS: {interactionCount * 128} MB</p>
        <p>ESTADO: {interactionCount > 10 ? 'MATRIZ DEBILITADA' : 'ESTABLE'}</p>
      </div>
    </motion.div>
  );
};

export default BiotecnofilosRoom;