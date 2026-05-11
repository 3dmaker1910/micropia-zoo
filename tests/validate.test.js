import { describe, it, expect } from 'vitest';
import { microbes } from '../src/data/microbes.js';
import { secretFiles } from '../src/data/secretFiles.js';
import { quizLevels } from '../src/data/quizData.js';

describe('Microbes Data', () => {
  it('should have exactly 5 microbes', () => {
    expect(microbes).toHaveLength(5);
  });

  it('should have correct names', () => {
    const names = microbes.map(m => m.name);
    expect(names).toContain('Peste Negra');
    expect(names).toContain('Cólera');
    expect(names).toContain('Viruela');
    expect(names).toContain('Gripe Española');
    expect(names).toContain('Tuberculosis');
  });

  it('should use new monster image URLs', () => {
    const expectedImages = {
      'Peste Negra': '32104501fe995adf86c86deeaa20caae221e62eea98e4b85bbc78f771ef5e2e7',
      'Cólera': '2fc5aff6de6cb1d48839513c95163ace01405d9668b550c24a8ec2e473f87a3a',
      'Viruela': '1defcada4f509c188bec817b7bfe014f0d9128b7ca3e6876c8bc077f56a5c1ed',
      'Gripe Española': '776e651c75d0c799cadef8a437adab0003cbee8e1ff8e9ae4b9ee6e9c10ca17f',
      'Tuberculosis': '8e51f22799e8d7d0021725828178b656db5e1340ce7b848f933e971efbb69e0a',
    };
    for (const microbe of microbes) {
      const expectedHash = expectedImages[microbe.name];
      expect(microbe.image).toContain(expectedHash);
    }
  });

  it('each microbe should have all required fields', () => {
    for (const m of microbes) {
      expect(m).toHaveProperty('id');
      expect(m).toHaveProperty('name');
      expect(m).toHaveProperty('scientific');
      expect(m).toHaveProperty('type');
      expect(m).toHaveProperty('image');
      expect(m).toHaveProperty('color');
      expect(m).toHaveProperty('stats');
      expect(m).toHaveProperty('letalidad');
      expect(m).toHaveProperty('vectorTransmision');
      expect(m).toHaveProperty('misterio');
      expect(m.stats).toHaveProperty('letal');
      expect(m.stats).toHaveProperty('contagio');
      expect(m.stats).toHaveProperty('resistencia');
      expect(m.stats).toHaveProperty('mutacion');
    }
  });
});

describe('Secret Files Data', () => {
  it('should have 5 secret files (one per microbe)', () => {
    expect(secretFiles).toHaveLength(5);
  });

  it('each file should link to a valid microbe', () => {
    const microbeIds = microbes.map(m => m.id);
    for (const file of secretFiles) {
      expect(microbeIds).toContain(file.microbeId);
    }
  });

  it('each file should have at least 3 facts', () => {
    for (const file of secretFiles) {
      expect(file.facts.length).toBeGreaterThanOrEqual(3);
      for (const fact of file.facts) {
        expect(fact).toHaveProperty('title');
        expect(fact).toHaveProperty('content');
        expect(fact.title.length).toBeGreaterThan(0);
        expect(fact.content.length).toBeGreaterThan(0);
      }
    }
  });

  it('each file should have classification and color', () => {
    for (const file of secretFiles) {
      expect(file).toHaveProperty('classification');
      expect(file).toHaveProperty('color');
      expect(file).toHaveProperty('codeName');
    }
  });
});

describe('Quiz Data', () => {
  it('should have exactly 3 levels', () => {
    expect(quizLevels).toHaveLength(3);
  });

  it('Level 1 (Bronze) should have 3 questions', () => {
    expect(quizLevels[0].level).toBe(1);
    expect(quizLevels[0].name).toBe('Bronce');
    expect(quizLevels[0].questions).toHaveLength(3);
  });

  it('Level 2 (Silver) should have 5 questions', () => {
    expect(quizLevels[1].level).toBe(2);
    expect(quizLevels[1].name).toBe('Plata');
    expect(quizLevels[1].questions).toHaveLength(5);
  });

  it('Level 3 (Gold) should have 10 questions (5 original + 5 Hantavirus)', () => {
    expect(quizLevels[2].level).toBe(3);
    expect(quizLevels[2].name).toBe('Oro');
    expect(quizLevels[2].questions).toHaveLength(10);
  });

  it('Gold tier should contain Hantavirus questions', () => {
    const goldQuestions = quizLevels[2].questions;
    const hantaQuestions = goldQuestions.filter(q =>
      q.question.toLowerCase().includes('hantavirus') ||
      q.explanation.toLowerCase().includes('hantavirus')
    );
    expect(hantaQuestions.length).toBeGreaterThanOrEqual(5);
  });

  it('each question should have valid structure', () => {
    for (const level of quizLevels) {
      for (const q of level.questions) {
        expect(q).toHaveProperty('question');
        expect(q).toHaveProperty('options');
        expect(q).toHaveProperty('correct');
        expect(q).toHaveProperty('explanation');
        expect(q.options).toHaveLength(4);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(4);
      }
    }
  });

  it('each level should have requiredCorrect less than or equal to total questions', () => {
    for (const level of quizLevels) {
      expect(level.requiredCorrect).toBeLessThanOrEqual(level.questions.length);
      expect(level.requiredCorrect).toBeGreaterThan(0);
    }
  });

  it('each level should have badge info', () => {
    for (const level of quizLevels) {
      expect(level).toHaveProperty('badge');
      expect(level).toHaveProperty('badgeColor');
      expect(level).toHaveProperty('title');
    }
  });
});

describe('v6.0 Components - File Existence', () => {
  it('GlobalIntelligenceMap component should be importable', async () => {
    const mod = await import('../src/components/GlobalIntelligenceMap.jsx');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('HantavirusMission component should be importable', async () => {
    const mod = await import('../src/components/HantavirusMission.jsx');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('App should import all 6 screen components', async () => {
    const fs = await import('fs');
    const appContent = fs.readFileSync('src/App.jsx', 'utf-8');
    expect(appContent).toContain("import GlobalIntelligenceMap from './components/GlobalIntelligenceMap'");
    expect(appContent).toContain("import HantavirusMission from './components/HantavirusMission'");
    expect(appContent).toContain("screen === 'map'");
    expect(appContent).toContain("screen === 'mission'");
  });
});

describe('v6.0 Navigation', () => {
  it('App should support 6 screens: landing, hall, hub, quiz, map, mission', async () => {
    const fs = await import('fs');
    const appContent = fs.readFileSync('src/App.jsx', 'utf-8');
    const screens = ['landing', 'hall', 'hub', 'quiz', 'map', 'mission'];
    for (const screen of screens) {
      expect(appContent).toContain(`screen === '${screen}'`);
    }
  });

  it('ContainmentHall should have onGoToMap prop', async () => {
    const fs = await import('fs');
    const hallContent = fs.readFileSync('src/components/ContainmentHall.jsx', 'utf-8');
    expect(hallContent).toContain('onGoToMap');
    expect(hallContent).toContain('MAPA DE INTELIGENCIA GLOBAL');
  });
});

describe('v6.0 Version Update', () => {
  it('ContainmentHall footer should say v6.0', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('src/components/ContainmentHall.jsx', 'utf-8');
    expect(content).toContain('v6.0');
  });

  it('DoctorHub footer should say v6.0', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('src/components/DoctorHub.jsx', 'utf-8');
    expect(content).toContain('v6.0');
  });
});
