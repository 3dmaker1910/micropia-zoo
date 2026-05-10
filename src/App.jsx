import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import ContainmentHall from './components/ContainmentHall';
import DoctorHub from './components/DoctorHub';
import QuizSystem from './components/QuizSystem';

function App() {
  const [screen, setScreen] = useState('landing'); // landing, hall, hub, quiz

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

  return (
    <div className="scanlines">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onEnter={handleEnter} />
        )}
        {screen === 'hall' && (
          <ContainmentHall key="hall" onGoToHub={handleGoToHub} />
        )}
        {screen === 'hub' && (
          <DoctorHub key="hub" onBack={handleBackToHall} onStartQuiz={handleStartQuiz} />
        )}
        {screen === 'quiz' && (
          <QuizSystem key="quiz" onBack={handleBackToHub} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
