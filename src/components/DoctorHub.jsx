import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { secretFiles } from '../data/secretFiles.js';

export default function DoctorHub({ onBack, onStartQuiz }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 border-b border-purple-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧑‍🔬</span>
          <h1 className="text-xl font-black italic uppercase text-purple-500">Oficina de la Dra. Micra</h1>
        </div>
        <button onClick={onBack} className="px-6 py-2 bg-purple-900/20 border border-purple-500/30 rounded-full text-[10px] font-black text-purple-400 uppercase">◀ SALIR</button>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {secretFiles.map((file) => (
          <motion.div
            key={file.microbeId}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedFile(file)}
            className="bg-neutral-900/50 border border-white/10 rounded-[2rem] p-6 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-4 right-6 text-[8px] font-black text-white/20 uppercase tracking-widest">{file.classification}</div>
            <span className="text-3xl mb-4 block">📂</span>
            <h3 className="text-sm font-black uppercase italic" style={{ color: file.color }}>{file.codeName}</h3>
            <p className="text-[10px] text-white/40 uppercase mt-1">Expediente del Patógeno</p>
          </motion.div>
        ))}
      </div>

      {/* File Detail Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => { setSelectedFile(null); setIsImageZoomed(false); }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-900 border-2 rounded-[3rem] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
              style={{ borderColor: selectedFile.color }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image with Click to Zoom */}
              <div className="relative group cursor-zoom-in" onClick={() => setIsImageZoomed(true)}>
                <img src={selectedFile.imageUrl} alt="Microbe" className="w-full aspect-square object-contain mb-6 rounded-3xl bg-black/40 border border-white/5 transition-transform group-hover:scale-[1.02]" />
                <div className="absolute bottom-10 right-4 bg-black/60 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">🔍 Clic para Ampliar</div>
              </div>

              <h2 className="text-2xl font-black uppercase italic mb-2" style={{ color: selectedFile.color }}>{selectedFile.name}</h2>
              <div className="space-y-3">
                {selectedFile.facts.map((f, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <h4 className="text-[10px] font-black uppercase mb-1 opacity-40">{f.title}</h4>
                    <p className="text-xs leading-relaxed">{f.content}</p>
                  </div>
                ))}
              </div>
              
              <button onClick={() => { setSelectedFile(null); setIsImageZoomed(false); }} className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all italic">Cerrar Expediente</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN ZOOMED IMAGE */}
      <AnimatePresence>
        {isImageZoomed && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-2 md:p-10 cursor-zoom-out"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={selectedFile.imageUrl} 
              className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              alt="Zoomed Microbe"
            />
            <div className="absolute top-6 right-6">
              <button className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white text-2xl">✕</button>
            </div>
            <div className="absolute bottom-8 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
               Modo de Lectura Detallada — Toca cualquier lugar para salir
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}