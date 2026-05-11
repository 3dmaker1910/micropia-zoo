import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { secretFiles } from '../data/secretFiles.js';

export default function DoctorHub({ onBack, onStartQuiz }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #1a1520 0%, #0a0a0a 70%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '24px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(147,51,234,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.5rem' }}>🧑‍🔬</span>
          <div>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
              color: '#c084fc', margin: 0
            }}>
              Oficina de la Dra. Micra
            </h2>
            <p style={{
              fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
              color: '#888', margin: '2px 0 0',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              Expedientes Secretos • Nivel de Acceso: Máximo
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem',
            color: '#c084fc', background: 'rgba(147,51,234,0.1)',
            border: '1px solid rgba(147,51,234,0.3)',
            borderRadius: '6px', padding: '6px 14px', cursor: 'pointer'
          }}
        >
          ← Contención
        </motion.button>
      </div>

      {/* Desk area */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '16px', marginBottom: '30px'
      }}>
        <motion.div
          animate={{ filter: ['drop-shadow(0 0 10px rgba(147,51,234,0.3))', 'drop-shadow(0 0 20px rgba(147,51,234,0.6))', 'drop-shadow(0 0 10px rgba(147,51,234,0.3))'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: '3rem' }}
        >
          🔬
        </motion.div>
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(0.55rem, 1vw, 0.7rem)',
          color: '#a78bfa',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          "Cada microorganismo tiene una historia que contar. Haz clic en los expedientes para descubrir la verdad."
        </p>
      </div>

      {/* Quiz CTA */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(250,204,21,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartQuiz}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
            color: '#facc15',
            background: 'rgba(250,204,21,0.1)',
            border: '1px solid rgba(250,204,21,0.4)',
            borderRadius: '10px',
            padding: '10px 24px',
            cursor: 'pointer',
            letterSpacing: '0.1em'
          }}
        >
          🧪 Iniciar Examen de Bioseguridad
        </motion.button>
      </div>

      {/* Secret files grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {secretFiles.map((file, idx) => (
          <motion.div
            key={file.microbeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${file.color}30` }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFile(file)}
            style={{
              background: '#1a1a1a',
              border: `1px solid ${file.color}40`,
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute', top: 0, right: 0,
              background: `${file.color}20`,
              padding: '4px 10px',
              borderRadius: '0 12px 0 8px',
              fontSize: '0.45rem',
              fontFamily: "'Orbitron', sans-serif",
              color: file.color,
              fontWeight: 700
            }}>
              {file.classification}
            </div>
            <span style={{ fontSize: '1.5rem' }}>📂</span>
            <h4 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
              color: file.color,
              margin: '8px 0 4px'
            }}>
              {file.codeName}
            </h4>
            <p style={{
              fontSize: '0.55rem', color: '#888',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              {file.facts.length} hechos clasificados
            </p>
          </motion.div>
        ))}
      </div>

      {/* File modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFile(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#1a1a1a',
                border: `2px solid ${selectedFile.color}`,
                borderRadius: '16px',
                padding: '24px',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto'
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div>
                  <span style={{
                    fontSize: '0.5rem', color: selectedFile.color,
                    fontFamily: "'Orbitron', sans-serif",
                    background: `${selectedFile.color}20`,
                    padding: '2px 8px', borderRadius: '4px'
                  }}>
                    {selectedFile.classification}
                  </span>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                    color: selectedFile.color,
                    margin: '8px 0 0'
                  }}>
                    {selectedFile.codeName}
                  </h3>
                  <p style={{
                    fontSize: '0.6rem', color: '#aaa',
                    fontFamily: "'Orbitron', sans-serif",
                    margin: '4px 0 0'
                  }}>
                    {selectedFile.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%', width: '32px', height: '32px',
                    color: '#888', cursor: 'pointer', fontSize: '0.9rem',
                    flexShrink: 0
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedFile.facts.map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    style={{
                      background: '#262626',
                      borderLeft: `3px solid ${selectedFile.color}`,
                      borderRadius: '0 8px 8px 0',
                      padding: '10px 14px'
                    }}
                  >
                    <div style={{
                      fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                      color: selectedFile.color,
                      fontWeight: 700,
                      marginBottom: '4px',
                      fontFamily: "'Orbitron', sans-serif"
                    }}>
                      #{i + 1} — {fact.title}
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                      color: '#d4d4d4',
                      lineHeight: 1.5
                    }}>
                      {fact.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div style={{
        textAlign: 'center', marginTop: '30px',
        fontSize: '0.5rem', color: '#555',
        fontFamily: "'Orbitron', sans-serif"
      }}>
        MICROPIA v8.0 • Oficina de la Dra. Micra
      </div>
    </div>
  );
}
