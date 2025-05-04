import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/infinite-runner',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
