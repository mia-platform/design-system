import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsConfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
    tsConfigPaths(),
    visualizer(),
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: pkg.name,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
      ],
      output: [
        {
          dir: 'dist/cjs',
          format: 'cjs',
          sourcemap: false,
        },
        {
          dir: 'dist/es',
          format: 'es',
          sourcemap: false,
        },
      ],
    },
  },
})
