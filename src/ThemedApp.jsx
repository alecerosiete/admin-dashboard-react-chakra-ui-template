/*
  ============================================
  ThemedApp.jsx — App con tema dinámico
  ============================================
  Lee el preset de color seleccionado desde
  ThemePresetContext, construye el tema de Chakra
  y renderiza la app con ese tema.

  key={presetId} en ChakraProvider fuerza un
  remount completo al cambiar de color, asegurando
  que todos los componentes se actualicen.
*/

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { useThemePreset } from './contexts/ThemePresetContext'
import { buildTheme } from './theme'
import App from './App.jsx'

export default function ThemedApp() {
  const { presetId, preset } = useThemePreset()
  const theme = useMemo(() => buildTheme(preset), [preset])

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <ChakraProvider key={presetId} theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </>
  )
}
