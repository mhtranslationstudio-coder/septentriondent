import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Register GSAP plugins once, globally — not per-component
import './lib/gsap'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
