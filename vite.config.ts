import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsConfigPaths from 'vite-tsconfig-paths'

import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: pkg.name,
      formats: ['es', 'umd'],
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'antd',
        'react',
        'react-dom',
      ],
      output: {
        globals: {
          antd: 'antd',
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
