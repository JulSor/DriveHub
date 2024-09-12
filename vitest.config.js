import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.jsx'],
    globals: true,
    environment: 'jsdom', // Tämä asetus varmistaa, että jsdom-ympäristöä käytetään
  },
});
