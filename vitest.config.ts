import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['**/src/**/(*.)+(spec|test).+(ts|tsx|js)'],
    coverage: {
      include: ['**/src/api/*/**', '**/src/index.ts'],
      reporter: ['html', 'text'],
    },
  },
});
