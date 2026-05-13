import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAP_BG_URL = 'https://customer-assets.emergentagent.com/wingman/b09505ba-190e-4ca7-9d47-23f73249f18b/attachments/87091cecb05a4c829ff1f8ff5c875ff2_MAPA%20(1).jpg';

const HOTSPOTS = [
  {
    id: 'argentina',
    x: '22%',
    y: '78%',
    label: 'ARGENTINA \u2014 Ushuaia',
    sublabel: 'Brote Hantavirus \u2022 MV Hondius',
    icon: '\ud83d\ude22',
    color: '#ef4444',
    critical: true,
    navigateTo: 'mission',
  },
  {
    id: 'brazil',
    x: '30%',
    y: '52%',
    label: 'BRASIL \u2014 R\u00edo de Janeiro',
    sublabel: 'Corcovado \u2022 Pr\u00f3ximamente',
    icon: '\ud83d\uddff',
    color: '#eab308',
    critical: false,
    navigateTo: null,
  },
  {
    id: 'cyanobacteria',
    x: '72%',
    y: '68%',
    label: 'AUSTRALIA \u2014 Shark Bay',
    sublabel: 'Sala 3 \u2022 Cianobacterias: El Primer Aliento',
    icon: '\ud83e\udda0',
    color: '#00c896',
    critical: true,
    navigateTo: 'cyanobacteria',
  },
  {
    id: 'biotecnofilos',
    x: '55%',
    y: '85%',
    label: 'ISLA DE LOS BIOTECN\u00d3FILOS',
    sublabel: 'Sala 4 \u2022 Biopel\u00edculas y Bacterias Sociales',
    icon: '\ud83e\uddeb',
    color: '#a855f7',
    critical: true,
    navigateTo: 'biotecnofilos',
  },
];
