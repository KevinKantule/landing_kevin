import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

// Mock useAdaptivePreferences hook
vi.mock('../../../hooks/useAdaptivePreferences', () => ({
  useAdaptivePreferences: () => ({
    prefersReducedMotion: false,
    prefersDarkMode: true,
    isTouchDevice: false,
    isSlowConnection: false,
  }),
  useConnectionStatus: () => ({
    type: 'wifi',
    effectiveType: '4g',
    saveData: false,
  }),
}));

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />);
    expect(screen.getByText(/Transformando ideas en/i)).toBeInTheDocument();
  });

  it('renders the subheading with location', () => {
    render(<Hero />);
    expect(screen.getByText(/Panamá/i)).toBeInTheDocument();
  });

  it('renders tech keywords', () => {
    render(<Hero />);
    expect(screen.getByText(/chatbots avanzados/i)).toBeInTheDocument();
    expect(screen.getByText(/agentes autónomos/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);
    expect(screen.getByLabelText(/Ver mis proyectos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ir a la sección de contacto/i)).toBeInTheDocument();
  });

  it('has correct button text', () => {
    render(<Hero />);
    expect(screen.getByText(/Conoce mi trabajo/i)).toBeInTheDocument();
    expect(screen.getByText(/Hablemos de tu proyecto/i)).toBeInTheDocument();
  });

  it('renders role badge', () => {
    render(<Hero />);
    expect(screen.getByText(/Software Developer \| AI \| Autonomous Agents/i)).toBeInTheDocument();
  });
});
