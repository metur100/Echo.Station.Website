/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

// The site is served from https://metur100.github.io/Echo.Station.Website/.
// With a custom domain (see docs/DEPLOYMENT.md) change this to '/'.
export const BASE_PATH = '/Echo.Station.Website/';

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        privacy: resolve(root, 'privacy.html'),
        notFound: resolve(root, '404.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
