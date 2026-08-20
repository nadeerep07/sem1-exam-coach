/**
 * @file vite.config.ts
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module vite.config.ts
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
