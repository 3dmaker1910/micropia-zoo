import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import ContainmentHall from './components/ContainmentHall';

function App() {
  const [entered, setEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  return (
    <div className="scanlines">
      <AnimatePresence mode="wait">
        {!entered ? (
          <LandingScreen key="landing" onEnter={handleEnter} />
        ) : (
          <ContainmentHall key="hall" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
