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
// Temporarily disabling BiotecnofilosRoom to debug build error
// import BiotecnofilosRoom from './components/BiotecnofilosRoom';

function App() {
  const [screen, setScreen] = useState('landing');

  const handleEnter = useCallback(() => {
    setScreen('hall');
  }, []);

  const handleGoToHub = useCallback(() => {
    setScreen('hub');
  }, []);

  const handleBackToHall = useCallback(() => {
    setScreen('hall');
  }, []);

  const handleStartQuiz = useCallback(() => {
    setScreen('quiz');
  }, []);

  const handleBackToHub = useCallback(() => {
    setScreen('hub');
  }, []);

  const handleGoToMap = useCallback(() => {
    setScreen('map');
  }, []);

  const handleGoToVectors = useCallback(() => {
    setScreen('vectors');
  }, []);

  const handleNavigate = useCallback((target) => {
    setScreen(target);
  }, []);

  return (
    <div className="scanlines">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onEnter={handleEnter} />
        )}
        {screen === 'hall' && (
          <ContainmentHall
            key="hall"
            onGoToHub={handleGoToHub}
            onGoToMap={handleGoToMap}
            onGoToVectors={handleGoToVectors}
            onNavigate={handleNavigate}
          />
        )}
        {screen === 'hub' && (
          <DoctorHub key="hub" onBack={handleBackToHall} onStartQuiz={handleStartQuiz} />
        )}
        {screen === 'quiz' && (
          <QuizSystem key="quiz" onBack={handleBackToHub} />
        )}
        {screen === 'map' && (
          <GlobalIntelligenceMap key="map" onNavigate={handleNavigate} />
        )}
        {screen === 'mission' && (
          <HantavirusMission key="mission" onNavigate={handleNavigate} />
        )}
        {screen === 'vectors' && (
          <VectorRoom key="vectors" onNavigate={handleNavigate} />
        )}
        {screen === 'bodyscan' && (
          <BodyScanner key="bodyscan" onNavigate={handleNavigate} />
        )}
        {screen === 'cyanobacteria' && (
          <CyanobacteriaRoom key="cyanobacteria" onNavigate={handleNavigate} />
        )}
        {/* screen === 'biotecnofilos' && (
          <BiotecnofilosRoom key="biotecnofilos" onNavigate={handleNavigate} />
        )*/}
      </AnimatePresence>
    </div>
  );
}

export default App;