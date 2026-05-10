import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizLevels } from '../data/quizData';

function QuestionCard({ question, questionIndex, totalQuestions, onAnswer, answered, selectedAnswer, levelColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-[0.3em] uppercase text-neutral-500">
          Pregunta {questionIndex + 1} de {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === questionIndex ? levelColor : i < questionIndex ? `${levelColor}60` : '#333',
              }}
            />
          ))}
        </div>
      </div>

      <h3 className="font-bold text-lg mb-6 leading-relaxed text-white">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correct;
          const isSelected = selectedAnswer === i;
          let optionStyle = {};

          if (answered) {
            if (isCorrect) {
              optionStyle = { background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.5)', color: '#22c55e' };
            } else if (isSelected && !isCorrect) {
              optionStyle = { background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)', color: '#ef4444' };
            } else {
              optionStyle = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#666' };
            }
          } else {
            optionStyle = {
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#ccc',
            };
          }

          return (
            <motion.button
              key={i}
              className="p-4 rounded-lg cursor-pointer transition-all duration-200 text-left w-full font-medium text-sm"
              style={optionStyle}
              onClick={() => !answered && onAnswer(i)}
              whileHover={!answered ? { scale: 1.01 } : {}}
              whileTap={!answered ? { scale: 0.99 } : {}}
              disabled={answered}
            >
              <span className="mr-3 font-bold opacity-50">{String.fromCharCode(65 + i)}.</span>
              {option}
              {answered && isCorrect && <span className="ml-2">✓</span>}
              {answered && isSelected && !isCorrect && <span className="ml-2">✗</span>}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-lg bg-emergency/5 border border-emergency/15"
          >
            <p className="text-sm text-neutral-300 leading-relaxed">
              <span className="text-emergency font-bold mr-1">💡</span>
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BadgeDisplay({ level, badges }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.3 }}
      className="text-center py-8"
    >
      <motion.div
        className="text-7xl mb-4"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          filter: [
            `drop-shadow(0 0 10px ${level.badgeColor})`,
            `drop-shadow(0 0 30px ${level.badgeColor})`,
            `drop-shadow(0 0 10px ${level.badgeColor})`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {level.badge}
      </motion.div>
      <h3 className="font-bold text-xl mb-2" style={{ color: level.badgeColor }}>
        ¡INSIGNIA DE {level.name.toUpperCase()} OBTENIDA!
      </h3>
      <p className="text-neutral-400 text-sm mb-2">{level.title}</p>

      <div className="flex justify-center gap-4 mt-6">
        {quizLevels.map((lvl) => (
          <div key={lvl.level} className="text-center">
            <div className="text-3xl mb-1" style={{ opacity: badges.includes(lvl.level) ? 1 : 0.2 }}>
              {lvl.badge}
            </div>
            <span className="text-xs tracking-wider uppercase"
              style={{ color: badges.includes(lvl.level) ? lvl.badgeColor : '#444' }}
            >
              {lvl.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LevelFailure({ level, correctCount, onRetry }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
      <motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        ☠️
      </motion.div>
      <h3 className="font-bold text-xl mb-2 text-red-400">CONTENCIÓN FALLIDA</h3>
      <p className="text-neutral-400 text-sm mb-4">
        Acertaste {correctCount} de {level.questions.length} — necesitabas {level.requiredCorrect}.
      </p>
      <p className="text-neutral-500 text-xs mb-6">
        Revisa los expedientes secretos de la Dra. Micra y vuelve a intentarlo.
      </p>
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-3 rounded-lg font-bold text-sm tracking-[0.2em] uppercase
                 bg-red-500/10 text-red-400 border border-red-500/30
                 hover:bg-red-500/20 transition-all duration-200"
      >
        🔄 REINTENTAR NIVEL {level.name.toUpperCase()}
      </motion.button>
    </motion.div>
  );
}

export default function QuizSystem({ onBack }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [phase, setPhase] = useState('intro');
  const [badges, setBadges] = useState([]);
  const correctRef = useRef(0);

  const level = quizLevels[currentLevel];

  const handleAnswer = useCallback((answerIndex) => {
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    if (answerIndex === level.questions[currentQuestion].correct) {
      correctRef.current += 1;
    }
  }, [level, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < level.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      if (correctRef.current >= level.requiredCorrect) {
        setBadges(prev => [...prev, level.level]);
        if (currentLevel < quizLevels.length - 1) {
          setPhase('passed');
        } else {
          setPhase('complete');
        }
      } else {
        setPhase('failed');
      }
    }
  }, [currentQuestion, level, currentLevel]);

  const handleNextLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    correctRef.current = 0;
    setPhase('playing');
  }, []);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    correctRef.current = 0;
    setPhase('playing');
  }, []);

  const startQuiz = useCallback(() => {
    setPhase('playing');
  }, []);

  return (
    <motion.div className="min-h-screen relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-lab-black/90 backdrop-blur-md border-b border-emergency/20">
        <div className="h-0.5"
          style={{ background: `repeating-linear-gradient(90deg, ${level.badgeColor}, ${level.badgeColor} 10px, transparent 10px, transparent 20px)` }}
        />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-bio-green/70 hover:text-bio-green text-sm tracking-widest uppercase transition-colors"
          >
            ◀ DRA. MICRA
          </button>
          <div className="text-center">
            <h1 className="font-bold tracking-[0.2em]" style={{ color: level.badgeColor, fontSize: 'clamp(0.7rem, 2.5vw, 0.95rem)' }}>
              EXAMEN NIVEL {level.level} — {level.name.toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {badges.map(b => (
              <span key={b} className="text-lg">{quizLevels[b - 1].badge}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8 pb-16">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {level.badge}
              </motion.div>
              <h2 className="font-bold text-2xl mb-2" style={{ color: level.badgeColor }}>
                NIVEL {level.level}: {level.name.toUpperCase()}
              </h2>
              <p className="text-neutral-300 text-lg mb-2">{level.title}</p>
              <p className="text-neutral-500 text-sm mb-2">{level.description}</p>
              <p className="text-neutral-600 text-xs mb-8">
                {level.questions.length} preguntas • Necesitas acertar {level.requiredCorrect} para pasar
              </p>
              <motion.button
                onClick={startQuiz}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-lg font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300"
                style={{
                  background: `${level.badgeColor}15`,
                  color: level.badgeColor,
                  border: `1px solid ${level.badgeColor}40`,
                }}
              >
                ▶ COMENZAR EXAMEN
              </motion.button>
            </motion.div>
          )}

          {phase === 'playing' && (
            <motion.div key={`q-${currentQuestion}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
                  border: `1px solid ${level.badgeColor}20`,
                }}
              >
                <QuestionCard
                  question={level.questions[currentQuestion]}
                  questionIndex={currentQuestion}
                  totalQuestions={level.questions.length}
                  onAnswer={handleAnswer}
                  answered={answered}
                  selectedAnswer={selectedAnswer}
                  levelColor={level.badgeColor}
                />

                {answered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-right">
                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-lg font-bold text-sm tracking-[0.2em] uppercase transition-all duration-200"
                      style={{
                        background: `${level.badgeColor}15`,
                        color: level.badgeColor,
                        border: `1px solid ${level.badgeColor}40`,
                      }}
                    >
                      {currentQuestion < level.questions.length - 1 ? 'SIGUIENTE ▶' : 'VER RESULTADO ▶'}
                    </motion.button>
                  </motion.div>
                )}
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-neutral-600 tracking-widest">
                  ACIERTOS: {correctRef.current} / {level.requiredCorrect} necesarios
                </span>
              </div>
            </motion.div>
          )}

          {phase === 'passed' && (
            <motion.div key="passed">
              <div className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
                  border: `1px solid ${level.badgeColor}30`,
                  boxShadow: `0 0 40px ${level.badgeColor}15`,
                }}
              >
                <BadgeDisplay level={level} badges={badges} />
                <div className="text-center">
                  <motion.button
                    onClick={handleNextLevel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-lg font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300"
                    style={{
                      background: `${quizLevels[currentLevel + 1]?.badgeColor || '#FFD700'}15`,
                      color: quizLevels[currentLevel + 1]?.badgeColor || '#FFD700',
                      border: `1px solid ${quizLevels[currentLevel + 1]?.badgeColor || '#FFD700'}40`,
                    }}
                  >
                    ▶ AVANZAR AL NIVEL {quizLevels[currentLevel + 1]?.name.toUpperCase()}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'failed' && (
            <motion.div key="failed">
              <div className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                <LevelFailure level={level} correctCount={correctRef.current} onRetry={handleRetry} />
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="rounded-xl p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,215,0,0.05) 0%, rgba(255,215,0,0.02) 100%)',
                  border: '1px solid rgba(255,215,0,0.25)',
                  boxShadow: '0 0 60px rgba(255,215,0,0.1)',
                }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                    filter: [
                      'drop-shadow(0 0 15px #FFD700)',
                      'drop-shadow(0 0 40px #FFD700)',
                      'drop-shadow(0 0 15px #FFD700)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  🏆
                </motion.div>

                <h2 className="font-bold text-2xl mb-2 text-yellow-400">¡MAESTRO VIRÓLOGO!</h2>
                <p className="text-neutral-300 mb-4">
                  Has completado los 3 niveles del examen de la Dra. Micra.
                </p>

                <div className="flex justify-center gap-6 my-8">
                  {quizLevels.map((lvl) => (
                    <motion.div
                      key={lvl.level}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: lvl.level * 0.2, type: 'spring' }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-2">{lvl.badge}</div>
                      <span className="text-xs tracking-wider font-bold" style={{ color: lvl.badgeColor }}>
                        {lvl.name.toUpperCase()}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: '#FFD700',
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, (Math.random() - 0.5) * 40, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-6 py-3 rounded-lg font-bold text-sm tracking-[0.2em] uppercase
                           bg-emergency/10 text-emergency border border-emergency/30 hover:bg-emergency/20 transition-all duration-200"
                >
                  ◀ VOLVER A LA OFICINA
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
