import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { TarefasProvider } from './contexts/TarefasContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TarefasProvider>
        <App />
      </TarefasProvider>
    </BrowserRouter>
  </StrictMode>,
)
