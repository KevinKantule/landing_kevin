import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver - must be a class for `new` operator
class MockIntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [0];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

window.IntersectionObserver = MockIntersectionObserver as any;

// Mock navigator.connection
Object.defineProperty(navigator, 'connection', {
  value: {
    effectiveType: '4g',
    type: undefined,
    saveData: false,
    downlink: undefined,
    rtt: undefined,
  },
  configurable: true,
});

// Suppress console.error in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
});
