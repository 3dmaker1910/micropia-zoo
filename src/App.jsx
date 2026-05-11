import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import ContainmentHall from './components/ContainmentHall';
import DoctorHub from './components/DoctorHub';
import QuizSystem from './components/QuizSystem';
import GlobalIntelligenceMap from './components/GlobalIntelligenceMap';
import HantavirusMission from './components/HantavirusMission';

function App() {
  const [screen, setScreen] = useState('landing'); // landing, hall, hub, quiz, map, mission

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
          <ContainmentHall key="hall" onGoToHub={handleGoToHub} onGoToMap={handleGoToMap} />
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
      </AnimatePresence>
    </div>
  );
}

export default App;
