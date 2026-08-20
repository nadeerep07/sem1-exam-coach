/**
 * @file main.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/main.tsx
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
