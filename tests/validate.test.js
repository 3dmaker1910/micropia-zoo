import { describe, it, expect } from 'vitest';
import { microbes } from '../src/data/microbes.js';
import { secretFiles } from '../src/data/secretFiles.js';
import { quizLevels } from '../src/data/quizData.js';

describe('Microbes Data', () => {
  it('has exactly 5 containment microbes', () => {
    expect(microbes).toHaveLength(5);
  });

  it('each microbe has required fields', () => {
    const requiredFields = ['id', 'name', 'scientific', 'type', 'icon', 'image', 'color', 'letalidad', 'peligrosidad', 'descubrimiento', 'vectorTransmision', 'impacto', 'misterio', 'stats'];
    microbes.forEach(m => {
      requiredFields.forEach(field => {
        expect(m).toHaveProperty(field);
      });
    });
  });

  it('has correct microbe names', () => {
    const names = microbes.map(m => m.name);
    expect(names).toContain('Peste Negra');
    expect(names).toContain('Viruela');
    expect(names).toContain('Gripe Espa\u00f1ola');
    expect(names).toContain('C\u00f3lera');
    expect(names).toContain('Tuberculosis');
  });

  it('all microbes have image URLs', () => {
    microbes.forEach(m => {
      expect(m.image).toBeTruthy();
      expect(m.image).toContain('http');
    });
  });

  it('stats have valid numeric values', () => {
    microbes.forEach(m => {
      expect(m.stats.letal).toBeGreaterThanOrEqual(0);
      expect(m.stats.letal).toBeLessThanOrEqual(100);
      expect(m.stats.contagio).toBeGreaterThanOrEqual(0);
      expect(m.stats.contagio).toBeLessThanOrEqual(100);
    });
  });
});

describe('Secret Files', () => {
  it('has 5 secret files', () => {
    expect(secretFiles).toHaveLength(5);
  });

  it('each file has valid structure', () => {
    secretFiles.forEach(f => {
      expect(f.classification).toBeTruthy();
      expect(f.codeName).toBeTruthy();
      expect(f.color).toBeTruthy();
      expect(f.name).toBeTruthy();
      expect(f.microbeId).toBeDefined();
    });
  });

  it('each file has at least 3 facts', () => {
    secretFiles.forEach(f => {
      expect(f.facts.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('each fact has title and content', () => {
    secretFiles.forEach(f => {
      f.facts.forEach(fact => {
        expect(fact.title).toBeTruthy();
        expect(fact.content).toBeTruthy();
        expect(fact.content.length).toBeGreaterThan(10);
      });
    });
  });

  it('each file links to a valid microbe', () => {
    const microbeIds = microbes.map(m => m.id);
    secretFiles.forEach(f => {
      expect(microbeIds).toContain(f.microbeId);
    });
  });
});

describe('Quiz System', () => {
  it('has 3 levels', () => {
    expect(quizLevels).toHaveLength(3);
  });

  it('levels are Bronce, Plata, Oro', () => {
    expect(quizLevels[0].name).toBe('Bronce');
    expect(quizLevels[1].name).toBe('Plata');
    expect(quizLevels[2].name).toBe('Oro');
  });

  it('level 1 (Bronce) has 3 questions', () => {
    expect(quizLevels[0].questions).toHaveLength(3);
  });

  it('level 2 (Plata) has 5 questions', () => {
    expect(quizLevels[1].questions).toHaveLength(5);
  });

  it('level 3 (Oro) has 10 questions', () => {
    expect(quizLevels[2].questions).toHaveLength(10);
  });

  it('Oro level has Hantavirus questions', () => {
    const goldQuestions = quizLevels[2].questions.map(q => q.question);
    const hasHanta = goldQuestions.some(q => q.toLowerCase().includes('hantavirus'));
    expect(hasHanta).toBe(true);
  });

  it('all questions have valid structure', () => {
    quizLevels.forEach(level => {
      level.questions.forEach(q => {
        expect(q.question).toBeTruthy();
        expect(q.options).toHaveLength(4);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(4);
        expect(q.explanation).toBeTruthy();
      });
    });
  });

  it('each level has badge info', () => {
    quizLevels.forEach(level => {
      expect(level.badge).toBeTruthy();
      expect(level.badgeColor).toBeTruthy();
      expect(level.requiredCorrect).toBeGreaterThan(0);
    });
  });
});

describe('Stability checks', () => {
  it('no escaped unicode sequences in microbes data', () => {
    const jsonStr = JSON.stringify(microbes);
    expect(jsonStr).not.toMatch(/\\ud83e/i);
  });

  it('no escaped unicode sequences in quiz data', () => {
    const jsonStr = JSON.stringify(quizLevels);
    expect(jsonStr).not.toMatch(/\\ud83e/i);
  });

  it('no escaped unicode sequences in secret files', () => {
    const jsonStr = JSON.stringify(secretFiles);
    expect(jsonStr).not.toMatch(/\\ud83e/i);
  });
});
