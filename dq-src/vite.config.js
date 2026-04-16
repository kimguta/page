import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/page/dq/',
  plugins: [react()],
  build: {
    outDir: '../dq',
    emptyOutDir: true,
  },
});
