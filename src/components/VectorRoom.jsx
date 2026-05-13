import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/a71221b6a3784df6992d997f37ccb83e_PULGA.jpg';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '15%',
    y: '38%',
    color: '#ef4444',
    icon: '🦷',
    title: 'APARATO BUCAL — Sistema de Alimentación',
    description: 'La pulga posee un aparato bucal altamente especializado de tipo picador-chupador (sifón). Está diseñado para perforar la piel del huésped e inyectar saliva anticoagulante mientras succiona sangre.',
    facts: [
      'La saliva contiene enzimas que impiden la coagulación de la sangre del huésped.',
      'Durante la picadura, la pulga puede regurgitar bacterias como Yersinia pestis directamente al torrente sanguíneo.',
      'Este mecanismo de "regurgitación bloqueada" es la principal vía de transmisión de la Peste Negra.',
    ],
  },
  {
    id: 'patas',
    label: 'Patas Saltarinas',
    x: '45%',
    y: '82%',
    color: '#22c55e',
    icon: '🦿',
    title: 'PATAS SALTARINAS — Propulsión Extrema',
    description: 'Las patas traseras de la pulga contienen resilina, una proteína elástica que funciona como un resorte biológico. Esto les permite saltar hasta 150 veces su propio tamaño corporal.',
    facts: [
      'Un salto de pulga equivaldría a un humano saltando sobre un edificio de 30 pisos.',
      'La aceleración durante el salto supera 100 veces la gravedad (100 G).',
      'Las patas traseras actúan como catapultas, almacenando energía en la resilina antes de liberarla explosivamente.',
    ],
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    x: '72%',
    y: '42%',
    color: '#f97316',
    icon: '🫘',
    title: 'ABDOMEN — Reservorio Biológico',
    description: 'El abdomen de la pulga se expande dramáticamente después de alimentarse, pudiendo aumentar hasta 3 veces su tamaño original. Es aquí donde se alojan los patógenos que transmite.',
    facts: [
      'Una pulga hembra puede consumir hasta 15 veces su peso corporal en sangre en un solo día.',
      'El sistema digestivo de la pulga crea un ambiente ideal para que Yersinia pestis se multiplique.',
      'Cuando el tracto digestivo se bloquea con bacterias, la pulga "regurgita" patógenos al próximo huésped que pica.',
    ],
  },
];

const pesteNegraFacts = [
  'La pulga Xenopsylla cheopis es el vector principal de Yersinia pestis.',
  'Cuando el proventrículo se bloquea, la pulga no puede alimentarse y pica frenéticamente, regurgitando bacterias en cada intento.',
  'Una sola pulga infectada puede transmitir miles de bacterias en una sola picadura.',
  'Las ratas negras (Rattus rattus) eran el reservorio: las pulgas saltaban a humanos cuando las ratas morían.',
  'La Peste Negra viajó por las rutas comerciales de la Seda y las rutas marítimas, llevada por ratas y sus pulgas.',
];

export default function VectorRoom({ onNavigate }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showPesteNegra, setShowPesteNegra] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1a1208 0%, #0a0a0a 70%)'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(234,88,12,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.3rem' }}>🪳</span>
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
            color: '#ea580c', fontWeight: 700, letterSpacing: '2px'
          }}>
            SALA DE VECTORES
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('hall')}
          style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem',
            color: '#ea580c', background: 'rgba(234,88,12,0.1)',
            border: '1px solid rgba(234,88,12,0.3)',
            borderRadius: '6px', padding: '6px 14px', cursor: 'pointer'
          }}
        >
          ← Contención
        </motion.button>
      </div>

      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
          color: '#ea580c',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Anatomía de la Pulga (Xenopsylla cheopis)
        </h3>
        <p style={{
          textAlign: 'center', fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
          color: '#888', marginBottom: '24px'
        }}>
          Haz clic en los puntos para explorar cada parte del vector
        </p>

        {/* Flea image with hotspots */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #0d0906 0%, #1a1208 50%, #0d0906 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(234,88,12,0.25)',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(234,88,12,0.08), inset 0 0 60px rgba(0,0,0,0.5)'
        }}>
          <img
            src={FLEA_IMAGE_URL}
            alt="Xenopsylla cheopis — Pulga vector de la Peste Negra"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'brightness(0.9) contrast(1.1)',
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          {/* Interactive hotspots */}
          {HOTSPOTS.map((spot) => (
            <motion.div
              key={spot.id}
              style={{
                position: 'absolute',
                left: spot.x, top: spot.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 10, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
              }}
              whileHover={{ scale: 1.3 }}
              onClick={() => setSelectedHotspot(spot)}
            >
              {/* Outer pulse ring */}
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  width: '30px', height: '30px',
                  borderRadius: '50%',
                  border: `2px solid ${spot.color}`,
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '24px', height: '24px',
                  borderRadius: '50%',
                  background: `${spot.color}40`,
                  border: `2px solid ${spot.color}`,
                  boxShadow: `0 0 12px ${spot.color}60`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem'
                }}
              >
                {spot.icon}
              </motion.div>
              <span style={{
                fontSize: '0.5rem',
                color: spot.color,
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                textShadow: `0 1px 4px rgba(0,0,0,0.9), 0 0 8px ${spot.color}40`,
                whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.6)',
                padding: '1px 6px',
                borderRadius: '4px',
              }}>
                {spot.label}
              </span>
            </motion.div>
          ))}

          {/* Corner HUD */}
          <div style={{
            position: 'absolute', top: '8px', left: '10px',
            fontSize: '0.45rem', color: 'rgba(234,88,12,0.5)',
            fontFamily: "'Orbitron', sans-serif",
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            letterSpacing: '1px'
          }}>
            VECTOR SCAN • XENOPSYLLA CHEOPIS
          </div>
          <div style={{
            position: 'absolute', bottom: '8px', right: '10px',
            fontSize: '0.4rem', color: 'rgba(234,88,12,0.4)',
            fontFamily: "'Orbitron', sans-serif",
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}>
            IMG: NANDO • MICROPIA v10.5
          </div>
        </div>

        {/* Hotspot detail panel */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                marginTop: '16px',
                background: '#1a1a1a',
                border: `1px solid ${selectedHotspot.color}40`,
                borderRadius: '12px',
                padding: '16px',
                maxWidth: '700px',
                margin: '16px auto 0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{selectedHotspot.icon}</span>
                  <h4 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
                    color: selectedHotspot.color, margin: 0
                  }}>
                    {selectedHotspot.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%', width: '28px', height: '28px',
                    color: '#888', cursor: 'pointer', fontSize: '0.8rem'
                  }}
                >
                  ✕
                </button>
              </div>
              <p style={{
                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                color: '#d4d4d4', lineHeight: 1.6, marginBottom: '12px'
              }}>
                {selectedHotspot.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedHotspot.facts.map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: '#262626',
                      borderLeft: `3px solid ${selectedHotspot.color}`,
                      borderRadius: '0 8px 8px 0',
                      padding: '8px 12px',
                      fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
                      color: '#bbb', lineHeight: 1.5
                    }}
                  >
                    <span style={{ color: selectedHotspot.color, marginRight: '6px' }}>⚬</span>
                    {fact}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Link to Peste Negra */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(147,51,234,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPesteNegra(true)}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
              color: '#c084fc',
              background: 'rgba(147,51,234,0.1)',
              border: '1px solid rgba(147,51,234,0.3)',
              borderRadius: '8px',
              padding: '12px 24px',
              cursor: 'pointer',
              letterSpacing: '1px'
            }}
          >
            ☠️ Conexión con la Peste Negra
          </motion.button>
        </div>

        {/* Peste Negra connection modal */}
        <AnimatePresence>
          {showPesteNegra && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPesteNegra(false)}
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
                  border: '2px solid #9333ea',
                  borderRadius: '16px',
                  padding: '24px',
                  maxWidth: '500px', width: '100%',
                  maxHeight: '80vh', overflow: 'auto'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '2rem' }}>☠️</span>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                    color: '#9333ea', margin: 0
                  }}>
                    Conexión: Peste Negra
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pesteNegraFacts.map((fact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        background: '#262626',
                        borderLeft: '3px solid #9333ea',
                        borderRadius: '0 8px 8px 0',
                        padding: '10px 14px',
                        fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
                        color: '#d4d4d4', lineHeight: 1.5
                      }}
                    >
                      {fact}
                    </motion.div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowPesteNegra(false)}
                    style={{
                      fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem',
                      color: '#888', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid #333', borderRadius: '6px',
                      padding: '8px 16px', cursor: 'pointer'
                    }}
                  >
                    Cerrar
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '20px',
        fontSize: '0.5rem', color: '#555',
        fontFamily: "'Orbitron', sans-serif"
      }}>
        MICROPIA v10.5 • Sala de Vectores
      </div>
    </motion.div>
  );
}
