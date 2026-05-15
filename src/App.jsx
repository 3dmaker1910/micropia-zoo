import { useState, useCallback, useEffect } from 'react';
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
import AutofagiaRoom from './components/AutofagiaRoom';
import ConanRoom from './components/ConanRoom';
import HolobionteRoom from './components/HolobionteRoom';
import ProbioticosRoom from './components/ProbioticosRoom';
import FluRoom from './components/FluRoom'; // New
import ViruelaRoom from './components/ViruelaRoom'; // New

function App() {
  const [screen, setScreen] = useState('landing');
  const [badges, setBadges] = useState([]);

  const handleNavigate = useCallback((target) => {
    setScreen(target);
  }, []);

  const addBadge = useCallback((badgeId) => {
    setBadges(prev => {
      if (prev.includes(badgeId)) return prev;
      return [...prev, badgeId];
    });
  }, []);

  return (
    <div className="scanlines">
      <AnimatePresence mode="wait">
        {screen === 'landing' && <LandingScreen key="landing" onEnter={() => setScreen('hall')} />}
        {screen === 'hall' && (
          <ContainmentHall 
            key="hall" 
            onGoToHub={() => setScreen('hub')} 
            onGoToMap={() => setScreen('map')} 
            onNavigate={handleNavigate} 
            badges={badges}
          />
        )}
        {screen === 'hub' && <DoctorHub key="hub" onBack={() => setScreen('hall')} onStartQuiz={() => setScreen('quiz')} />}
        {screen === 'quiz' && <QuizSystem key="quiz" onBack={() => setScreen('hub')} />}
        {screen === 'map' && <GlobalIntelligenceMap key="map" onNavigate={handleNavigate} />}
        {screen === 'mission' && <HantavirusMission key="mission" onNavigate={handleNavigate} onComplete={() => addBadge('hanta')} />}
        {screen === 'vectors' && <VectorRoom key="vectors" onNavigate={handleNavigate} onComplete={() => addBadge('vector')} />}
        {screen === 'bodyscan' && <BodyScanner key="bodyscan" onNavigate={handleNavigate} onComplete={() => addBadge('scan')} />}
        {screen === 'cyanobacteria' && <CyanobacteriaRoom key="cyanobacteria" onNavigate={handleNavigate} onComplete={() => addBadge('oxygen')} />}
        {screen === 'autofagia' && <AutofagiaRoom key="autofagia" onNavigate={handleNavigate} onComplete={() => addBadge('recycle')} />}
        {screen === 'conan' && <ConanRoom key="conan" onNavigate={handleNavigate} onComplete={() => addBadge('conan')} />}
        {screen === 'holobionte' && <HolobionteRoom key="holobionte" onNavigate={handleNavigate} onComplete={() => addBadge('holo')} />}
        {screen === 'probioticos' && <ProbioticosRoom key="probioticos" onNavigate={handleNavigate} onComplete={() => addBadge('vip')} />}
        {screen === 'flu' && <FluRoom key="flu" onNavigate={handleNavigate} onComplete={() => addBadge('ice')} />}
        {screen === 'viruela' && <ViruelaRoom key="viruela" onNavigate={handleNavigate} onComplete={() => addBadge('crown')} />}
      </AnimatePresence>
    </div>
  );
}

export default App;