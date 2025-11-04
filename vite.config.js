import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ IMPORTANTE: cambia 'ELECTION-MAD' por el nombre EXACTO de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/ELECTION-MAD/', // 👈 si tu repo se llama distinto, cámbialo aquí
})