import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Para GitHub Pages: mude para '/react-firt/' se o repo não for username.github.io
  plugins: [react()],
})
