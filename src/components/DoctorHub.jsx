import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { secretFiles } from '../data/secretFiles.js';

export default function DoctorHub({ onBack, onStartQuiz }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 border-b border-purple-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧑‍🔬</span>
          <h1 className="text-xl font-black italic uppercase text-purple-500">Oficina de la Dra. Micra</h1>
        </div>
        <button onClick={onBack} className="px-6 py-2 bg-purple-900/20 border border-purple-500/30 rounded-full text-[10px] font-black text-purple-400 uppercase">◀ SALIR</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {secretFiles.map((file, idx) => (
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

      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-900 border-2 rounded-[3rem] p-8 max-w-lg w-full shadow-2xl relative"
              style={{ borderColor: selectedFile.color }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedFile.imageUrl} alt="Microbe" className="w-full aspect-square object-contain mb-6 rounded-3xl bg-black/40" />
              <h2 className="text-2xl font-black uppercase italic mb-2" style={{ color: selectedFile.color }}>{selectedFile.name}</h2>
              <div className="space-y-3">
                {selectedFile.facts.map((f, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <h4 className="text-[10px] font-black uppercase mb-1 opacity-40">{f.title}</h4>
                    <p className="text-xs leading-relaxed">{f.content}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedFile(null)} className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all italic">Cerrar Expediente</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}