import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders the logo text', () => {
    const mockSetEcoMode = vi.fn();
    render(<Navbar ecoMode={false} setEcoMode={mockSetEcoMode} />);

    expect(screen.getByText('Kevin Kantule')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    const mockSetEcoMode = vi.fn();
    render(<Navbar ecoMode={false} setEcoMode={mockSetEcoMode} />);

    expect(screen.getByText('Sobre Mí')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    const mockSetEcoMode = vi.fn();
    render(<Navbar ecoMode={false} setEcoMode={mockSetEcoMode} />);

    expect(screen.getByText('Hablemos')).toBeInTheDocument();
  });

  it('toggles eco mode when button is clicked', async () => {
    const mockSetEcoMode = vi.fn();
    const user = userEvent.setup();

    render(<Navbar ecoMode={false} setEcoMode={mockSetEcoMode} />);

    const ecoButton = screen.getByLabelText('Activar modo eco');
    await user.click(ecoButton);

    expect(mockSetEcoMode).toHaveBeenCalledWith(true);
  });

  it('shows eco mode is active when ecoMode prop is true', () => {
    const mockSetEcoMode = vi.fn();
    render(<Navbar ecoMode={true} setEcoMode={mockSetEcoMode} />);

    expect(screen.getByText('Eco: ON')).toBeInTheDocument();
  });

  it('shows eco mode is inactive when ecoMode prop is false', () => {
    const mockSetEcoMode = vi.fn();
    render(<Navbar ecoMode={false} setEcoMode={mockSetEcoMode} />);

    expect(screen.getByText('Eco: OFF')).toBeInTheDocument();
  });

  it('has correct aria-label for eco mode button', () => {
    const mockSetEcoMode = vi.fn();
    const { rerender } = render(<Navbar ecoMode={false} setEcoMode={mockSetEcoMode} />);

    expect(screen.getByLabelText('Activar modo eco')).toBeInTheDocument();

    rerender(<Navbar ecoMode={true} setEcoMode={mockSetEcoMode} />);
    expect(screen.getByLabelText('Desactivar modo eco')).toBeInTheDocument();
  });
});
