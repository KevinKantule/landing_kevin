# Testing Guide

Este proyecto incluye una suite de pruebas configurada con **Vitest** y **React Testing Library**.

## Instalación

Las dependencias de testing ya están incluidas en `package.json`:

```bash
npm install
```

## Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests una sola vez
```bash
npm test -- --run
```

### Ver interfaz visual de tests
```bash
npm run test:ui
```

Esto abre una interfaz web en `http://localhost:51204/__vitest__/`

### Cobertura de tests
```bash
npm run test:coverage
```

## Estructura de Tests

Los tests están organizados en directorios `__tests__` junto a los componentes:

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── __tests__/
│   │   └── Navbar.test.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── __tests__/
│   │   │   └── Hero.test.tsx
│   │   └── ...
└── test/
    └── setup.ts         # Configuración global de tests
```

## Escribir Tests

### Ejemplo Básico

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders text correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
```

### Testing con Mocks

```typescript
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

it('handles click events', async () => {
  const mockFn = vi.fn();
  const user = userEvent.setup();
  
  render(<Button onClick={mockFn}>Click me</Button>);
  
  await user.click(screen.getByText('Click me'));
  expect(mockFn).toHaveBeenCalled();
});
```

## Funcionalidades Soportadas

- ✅ Componentes React 19
- ✅ Hooks personalizados
- ✅ Motion/Framer Motion
- ✅ Tailwind CSS
- ✅ Eventos de usuario
- ✅ Mocking de módulos y APIs

## Referencias

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Próximos Pasos

1. Aumentar cobertura de tests a >80%
2. Agregar tests para hooks personalizados
3. Agregar tests de integración
4. Configurar CI/CD para ejecutar tests automáticamente
