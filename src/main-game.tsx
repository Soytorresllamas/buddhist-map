import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/game.css'
import Game from './Game'

createRoot(document.getElementById('game-root')!).render(
  <StrictMode>
    <Game />
  </StrictMode>
)
