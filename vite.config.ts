import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': resolve(__dirname, './src/components'),
      'utils': resolve(__dirname, './src/utils'),
      'hooks': resolve(__dirname, './src/hooks'),
      'types': resolve(__dirname, './src/types')
    }
  }
})
