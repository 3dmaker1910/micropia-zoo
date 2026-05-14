import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import ContainmentHall from './components/ContainmentHall';
import DoctorHub from './components/DoctorHub';
import QuizSystem from './components/QuizSystem';
import GlobalIntelligenceMap from './components/GlobalIntelligenceMap';
import HantavirusMission from './components/HantavirusMission';
import VectorRoom from './components/VectorRoom';
import BodyScanner from './components/BodyScanner';
import CyanobacteriaRoom from './components/CyanobacteriaRoom';
import AutofagiaRoom from './components/AutofagiaRoom'; // New component to create

function App() {
  const [screen, setScreen] = useState('landing');

  const handleNavigate = useCallback((target) => {
    setScreen(target);
  }, []);

  return (
    <div className="scanlines">
      <AnimatePresence mode="wait">
        {screen === 'landing' && <LandingScreen key="landing" onEnter={() => setScreen('hall')} />}
        {screen === 'hall' && <ContainmentHall key="hall" onGoToHub={() => setScreen('hub')} onGoToMap={() => setScreen('map')} onNavigate={handleNavigate} />}
        {screen === 'hub' && <DoctorHub key="hub" onBack={() => setScreen('hall')} onStartQuiz={() => setScreen('quiz')} />}
        {screen === 'quiz' && <QuizSystem key="quiz" onBack={() => setScreen('hub')} />}
        {screen === 'map' && <GlobalIntelligenceMap key="map" onNavigate={handleNavigate} />}
        {screen === 'mission' && <HantavirusMission key="mission" onNavigate={handleNavigate} />}
        {screen === 'vectors' && <VectorRoom key="vectors" onNavigate={handleNavigate} />}
        {screen === 'bodyscan' && <BodyScanner key="bodyscan" onNavigate={handleNavigate} />}
        {screen === 'cyanobacteria' && <CyanobacteriaRoom key="cyanobacteria" onNavigate={handleNavigate} />}
        {screen === 'autofagia' && <AutofagiaRoom key="autofagia" onNavigate={handleNavigate} />}
      </AnimatePresence>
    </div>
  );
}

export default App;