/*
  ============================================
  main.jsx — Punto de entrada de la aplicación
  ============================================
  Este archivo es el PRIMERO que se ejecuta.
  Aquí se renderiza (pinta) la app dentro del HTML.

  🎨 ThemePresetProvider:
  Envuelve la app para permitir cambiar entre presets
  de color. Al cambiar de preset, ChakraProvider se
  remonta con el nuevo tema gracias a key={presetId}.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemePresetProvider } from './contexts/ThemePresetContext'
import ThemedApp from './ThemedApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      ThemePresetProvider está fuera de ChakraProvider porque
      no necesita estilos de Chakra, solo estado de React.
    */}
    <ThemePresetProvider>
      <ThemedApp />
    </ThemePresetProvider>
  </StrictMode>,
)
