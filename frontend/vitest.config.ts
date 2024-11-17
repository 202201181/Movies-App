// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
//import 'vitest-extended';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Use jsdom for simulating browser behavior
    setupFiles: './src/setupTests.ts', // Optional: for global test setups
  },
});