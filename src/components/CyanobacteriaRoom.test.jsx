import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CyanobacteriaRoom from './CyanobacteriaRoom';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: new Proxy(actual.motion, {
      get: (target, prop) => {
        if (typeof prop === 'string' && !['$$typeof', 'render'].includes(prop)) {
          const Component = (props) => {
            const { initial, animate, exit, whileHover, whileTap, transition, variants, ...rest } = props;
            const Tag = prop === 'div' ? 'div' : prop === 'span' ? 'span' : prop === 'p' ? 'p' : prop === 'button' ? 'button' : 'div';
            return <Tag {...rest} />;
          };
          Component.displayName = `motion.${prop}`;
          return Component;
        }
        return target[prop];
      },
    }),
  };
});

describe('CyanobacteriaRoom', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the room title and header', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    const matches = screen.getAllByText(/SALA 3.*CIANOBACTERIAS.*EL PRIMER ALIENTO/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches[0]).toBeInTheDocument();
  });

  it('renders the Ficha Técnica section', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText('Ficha Técnica')).toBeInTheDocument();
    expect(screen.getByText('Cianobacterias (Algas Verde-Azules)')).toBeInTheDocument();
  });

  it('displays ficha técnica fields', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText('Dominio:')).toBeInTheDocument();
    expect(screen.getByText('Bacteria')).toBeInTheDocument();
    expect(screen.getByText('~3.500 millones de años')).toBeInTheDocument();
    expect(screen.getByText('Fotosíntesis oxigénica (¡las primeras en hacerlo!)')).toBeInTheDocument();
  });

  it('renders three stromatolites', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText('Estromatolito Alpha')).toBeInTheDocument();
    expect(screen.getByText('Estromatolito Beta')).toBeInTheDocument();
    expect(screen.getByText('Estromatolito Gamma')).toBeInTheDocument();
  });

  it('renders the historical impact quote', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.getByText(/"Ellas inventaron el aire\."/)).toBeInTheDocument();
  });

  it('renders the four content section headers', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText(/La Fotosíntesis que Cambió Todo/)).toBeInTheDocument();
    expect(screen.getByText(/El Gran Evento de Oxidación/)).toBeInTheDocument();
    expect(screen.getByText(/Estromatolitos: Ciudades Ancestrales/)).toBeInTheDocument();
    expect(screen.getByText(/El Legado Eterno/)).toBeInTheDocument();
  });

  it('renders the oxygen counter starting at 0', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText('O₂ LIBERADO:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('navigates to map when back button is clicked', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    const backButton = screen.getByText('◀ MAPA DE INTELIGENCIA');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('map');
  });

  it('navigates to map when bottom navigation button is clicked', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    const mapButton = screen.getByText(/VOLVER AL MAPA DE INTELIGENCIA GLOBAL/);
    fireEvent.click(mapButton);
    expect(mockNavigate).toHaveBeenCalledWith('map');
  });

  it('renders the timeline with all eras', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText('3.500 Ma')).toBeInTheDocument();
    expect(screen.getByText('2.400 Ma')).toBeInTheDocument();
    expect(screen.getByText('Hoy')).toBeInTheDocument();
  });

  it('renders the era label in the HUD', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText(/HÁBITAT: OCÉANO ARCAICO/)).toBeInTheDocument();
    expect(screen.getByText(/ERA: ARCAICO • 3.500 Ma/)).toBeInTheDocument();
  });

  it('renders the footer with version info', () => {
    render(<CyanobacteriaRoom onNavigate={mockNavigate} />);
    expect(screen.getByText(/Micropia v10 • Sala 3/)).toBeInTheDocument();
  });
});
