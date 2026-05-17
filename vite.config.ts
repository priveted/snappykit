import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/snappykit.ts'),
      name: 'SnappyKit',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'snappykit.mjs';
        if (format === 'umd') return 'snappykit.umd.js';
        return `snappykit.${format}.js`;
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src'],
      staticImport: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3231,
    cors: true,
    host: true,
    open: '/app/index.html',
  },
});
