import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/sendero.css'
import Sendero from './Sendero'

createRoot(document.getElementById('sendero-root')!).render(
  <StrictMode>
    <Sendero />
  </StrictMode>
)
