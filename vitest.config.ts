import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@wabtechs/ui': path.resolve(__dirname, './packages/ui/src'),
      '@wabtechs/ui/*': path.resolve(__dirname, './packages/ui/src/*'),
      '@wabtechs/sdk': path.resolve(__dirname, './packages/sdk/src'),
      '@wabtechs/utils': path.resolve(__dirname, './packages/utils/src'),
      '@wabtechs/hooks': path.resolve(__dirname, './packages/hooks/src'),
      '@wabtechs/icons': path.resolve(__dirname, './packages/icons/src'),
      '@wabtechs/tokens': path.resolve(__dirname, './packages/tokens/src'),
      '@wabtechs/themes': path.resolve(__dirname, './packages/themes/src'),
    },
  },
});
