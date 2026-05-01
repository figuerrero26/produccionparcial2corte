import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Esto simula el navegador automáticamente
    globals: true,       // Permite usar 'describe', 'it', 'expect' sin importarlos
  },
});
