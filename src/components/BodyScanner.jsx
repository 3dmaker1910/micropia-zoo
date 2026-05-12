import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { microbes } from '../data/microbes.js';

const bodyZones = [
  {
    id: 'lungs',
    name: 'Pulmones',
    icon: '🫁',
    color: '#ef4444',
    position: { top: '28%', left: '50%' },
    description: 'Sistema respiratorio — vía de entrada de patógenos aerotransportados.',
    threats: ['Yersinia pestis (neumónica)', 'Influenza A (H1N1)', 'Mycobacterium tuberculosis'],
    factoid: 'Los pulmones tienen ~300 millones de alvéolos con 70m² de superficie — un paraíso para virus respiratorios.'
  },
  {
    id: 'stomach',
    name: 'Estómago',
    icon: '🫃',
    color: '#06b6d4',
    position: { top: '42%', left: '47%' },
    description: 'Sistema digestivo — barrera ácida contra invasores orales.',
    threats: ['Vibrio cholerae', 'Helicobacter pylori', 'Salmonella typhi'],
    factoid: 'El pH del estómago (1.5-3.5) destruye la mayoría de bacterias, pero V. cholerae sobrevive alcalinizando su entorno.'
  },
  {
    id: 'blood',
    name: 'Sangre',
    icon: '🩸',
    color: '#dc2626',
    position: { top: '36%', left: '55%' },
    description: 'Sistema circulatorio — autopista para la diseminación sistémica.',
    threats: ['Plasmodium falciparum', 'Yersinia pestis (septicémica)', 'VIH'],
    factoid: 'La sangre recorre ~96,000 km de vasos al día. Una sola bacteria en el torrente puede colonizar todo el cuerpo en horas.'
  },
  {
    id: 'skin',
    name: 'Piel',
    icon: '🧬',
    color: '#f59e0b',
    position: { top: '22%', left: '38%' },
    description: 'Barrera exterior — primera línea de defensa del sistema inmune.',
    threats: ['Staphylococcus aureus', 'Variola major', 'Rickettsia prowazekii'],
    factoid: 'La piel alberga ~1,000 especies de bacterias. Cada cm² tiene ~1 millón de microorganismos — la mayoría benéficos.'
  },
  {
    id: 'brain',
    name: 'Cerebro',
    icon: '🧠',
    color: '#a855f7',
    position: { top: '8%', left: '50%' },
    description: 'Sistema nervioso central — protegido por la barrera hematoencefálica.',
    threats: ['Virus de la rabia', 'Naegleria fowleri', 'Priones (Kuru/CJD)'],
    factoid: 'La barrera hematoencefálica bloquea el 98% de fármacos. Los patógenos que la cruzan son extremadamente peligrosos.'
  },
  {
    id: 'intestines',
    name: 'Intestinos',
    icon: '🦠',
    color: '#22c55e',
    position: { top: '52%', left: '52%' },
    description: 'Microbioma intestinal — 39 billones de bacterias en equilibrio.',
    threats: ['Clostridioides difficile', 'E. coli O157:H7', 'Entamoeba histolytica'],
    factoid: 'Tu intestino tiene más neuronas que tu médula espinal. El microbioma produce el 95% de la serotonina del cuerpo.'
  }
];

export default function BodyScanner({ onNavigate }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [scanPhase, setScanPhase] = useState('idle');
  const [scanY, setScanY] = useState(0);
  const [discoveredZones, setDiscoveredZones] = useState([]);

  const startScan = useCallback(() => {
    setScanPhase('scanning');
    setScanY(0);
  }, []);

  useEffect(() => {
    if (scanPhase !== 'scanning') return;
    const interval = setInterval(() => {
      setScanY((y) => {
        if (y >= 100) {
          clearInterval(interval);
          setScanPhase('complete');
          setDiscoveredZones(bodyZones.map(z => z.id));
          return 100;
        }
        return y + 1.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [scanPhase]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #0a1520 0%, #0a0a0a 70%)',
        padding: '20px',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(34,197,94,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.5rem' }}>🔬</span>
          <div>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
              color: '#22c55e', margin: 0
            }}>
              Escáner Corporal Biológico
            </h2>
            <p style={{
              fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
              color: '#888', margin: '2px 0 0',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              Análisis de Vulnerabilidades Patogénicas • Nivel Clasificado
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('hall')}
          style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem',
            color: '#22c55e', background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '6px', padding: '6px 14px', cursor: 'pointer'
          }}
        >
          ← Contención
        </motion.button>
      </div>

      {/* Main scanner area */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '20px', maxWidth: '800px', margin: '0 auto'
      }}>
        {/* Body silhouette with scan zones */}
        <div style={{
          position: 'relative',
          width: '280px',
          height: '450px',
          margin: '0 auto'
        }}>
          {/* Body outline */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.08) 0%, transparent 70%)',
            border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: '40% 40% 20% 20%',
            overflow: 'hidden'
          }}>
            {/* Scan line animation */}
            {scanPhase === 'scanning' && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0, right: 0,
                  height: '3px',
                  top: `${scanY}%`,
                  background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
                  boxShadow: '0 0 20px #22c55e, 0 0 40px #22c55e',
                  zIndex: 10
                }}
              />
            )}
          </div>

          {/* Body figure - text art */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '8rem',
            opacity: 0.15,
            filter: 'grayscale(1)',
            userSelect: 'none'
          }}>
            🧍
          </div>

          {/* Hotspot zones */}
          {bodyZones.map((zone) => {
            const discovered = discoveredZones.includes(zone.id);
            return (
              <motion.button
                key={zone.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: discovered ? 1 : 0.5,
                  opacity: discovered ? 1 : (scanPhase === 'idle' ? 0.3 : 0.15)
                }}
                whileHover={discovered ? { scale: 1.2 } : {}}
                whileTap={discovered ? { scale: 0.9 } : {}}
                onClick={() => discovered && setSelectedZone(zone)}
                style={{
                  position: 'absolute',
                  top: zone.position.top,
                  left: zone.position.left,
                  transform: 'translate(-50%, -50%)',
                  width: '44px', height: '44px',
                  borderRadius: '50%',
                  background: discovered ? `${zone.color}20` : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${discovered ? zone.color : '#333'}`,
                  cursor: discovered ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                  zIndex: 5,
                  boxShadow: discovered ? `0 0 15px ${zone.color}40` : 'none'
                }}
              >
                {discovered ? zone.icon : '?'}
              </motion.button>
            );
          })}
        </div>

        {/* Scan button / status */}
        {scanPhase === 'idle' && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,197,94,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={startScan}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
              color: '#22c55e',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: '10px',
              padding: '12px 28px',
              cursor: 'pointer',
              letterSpacing: '0.15em'
            }}
          >
            ⚡ INICIAR ESCANEO BIOLÓGICO
          </motion.button>
        )}

        {scanPhase === 'scanning' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.55rem, 1vw, 0.7rem)',
              color: '#22c55e',
              animation: 'flicker 0.5s infinite'
            }}>
              ESCANEANDO... {Math.round(scanY)}%
            </p>
            <div style={{
              width: '200px', height: '4px',
              background: '#1a1a1a',
              borderRadius: '2px',
              margin: '8px auto',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${scanY}%`, height: '100%',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                borderRadius: '2px',
                transition: 'width 30ms linear'
              }} />
            </div>
          </div>
        )}

        {scanPhase === 'complete' && !selectedZone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
              color: '#22c55e',
              marginBottom: '8px'
            }}>
              ✅ ESCANEO COMPLETO — {bodyZones.length} ZONAS DETECTADAS
            </p>
            <p style={{
              fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
              color: '#888',
              fontFamily: "'Orbitron', sans-serif"
            }}>
              Toca una zona del cuerpo para ver las amenazas biológicas
            </p>
          </motion.div>
        )}
      </div>

      {/* Zone detail modal */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedZone(null)}
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
                border: `2px solid ${selectedZone.color}`,
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{selectedZone.icon}</span>
                  <div>
                    <h3 style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                      color: selectedZone.color,
                      margin: 0
                    }}>
                      {selectedZone.name}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
                      color: '#888', margin: '4px 0 0',
                      fontFamily: "'Orbitron', sans-serif"
                    }}>
                      {selectedZone.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
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

              {/* Threats */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.6rem',
                  color: '#ef4444',
                  margin: '0 0 8px',
                  letterSpacing: '0.1em'
                }}>
                  ⚠ AMENAZAS DETECTADAS
                </h4>
                {selectedZone.threats.map((threat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: '#262626',
                      borderLeft: `3px solid ${selectedZone.color}`,
                      borderRadius: '0 8px 8px 0',
                      padding: '8px 12px',
                      marginBottom: '6px',
                      fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                      color: '#d4d4d4'
                    }}
                  >
                    <span style={{ color: '#ef4444', marginRight: '8px' }}>☣</span>
                    {threat}
                  </motion.div>
                ))}
              </div>

              {/* Factoid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: `${selectedZone.color}10`,
                  border: `1px solid ${selectedZone.color}30`,
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                  color: '#d4d4d4',
                  lineHeight: 1.6
                }}
              >
                <span style={{ color: selectedZone.color, fontWeight: 700, marginRight: '6px' }}>🧬</span>
                {selectedZone.factoid}
              </motion.div>
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
        MICROPIA v8.0 • Escáner Corporal Biológico
      </div>
    </motion.div>
  );
}
