Object.defineProperty(window, 'document', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    appendChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
  })),
});