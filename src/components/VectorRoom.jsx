import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLEA_IMAGE_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/e78b4b60f3e04c1f97af40b8a19b8a7a_pulga%20mapa.png';

const HOTSPOTS = [
  {
    id: 'bucal',
    label: 'Aparato Bucal',
    x: '18%',
    y: '32%',
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
    x: '50%',
    y: '78%',
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
    x: '75%',
    y: '40%',
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