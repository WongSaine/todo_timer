/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
})
