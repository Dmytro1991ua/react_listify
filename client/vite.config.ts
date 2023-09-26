/// <reference types="vitest" />
/// <reference types="vite/client" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      all: true,
      exclude: [
        'node_modules/**',
        'coverage',
        'vite.config.ts',
        'assets/**',
        '**/*.interfaces.ts',
        '**/*.d.ts',
        '**/*.interfaces.d.ts',
        '**/*.configs.{ts,tsx}',
        '**/*.schema.{ts,tsx}',
        '**/*.styled.tsx',
        '**/*.constants.ts',
      ],
    },
  },
};

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  server: {
    port: 5500,
  },
  test: vitestConfig.test,
});
