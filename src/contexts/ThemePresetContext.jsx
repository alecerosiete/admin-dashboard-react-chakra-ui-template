/*
  ============================================
  ThemePresetContext.jsx — Contexto para cambiar el tema de colores
  ============================================
  Permite seleccionar entre los presets de color definidos
  en theme/presets.js. Al cambiar el preset, se reemplaza
  la paleta "blue" de Chakra y toda la app se actualiza.

  🧠 Cómo funciona:
  - Almacena el id del preset activo (default, emerald, etc.)
  - Cuando cambia, fuerza un remount de ChakraProvider con el nuevo tema
  - useThemePreset() devuelve { presetId, preset, setPreset, presets }
*/

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import presets from '../theme/presets'

const ThemePresetContext = createContext()

export function ThemePresetProvider({ children }) {
  const [presetId, setPresetId] = useState('default')

  const preset = presets.find((p) => p.id === presetId) || presets[0]

  const value = {
    presetId,
    preset,
    setPreset: setPresetId,
    presets,
  }

  return (
    <ThemePresetContext.Provider value={value}>
      {children}
    </ThemePresetContext.Provider>
  )
}

export const useThemePreset = () => {
  const context = useContext(ThemePresetContext)
  if (!context) {
    throw new Error(
      'useThemePreset debe usarse dentro de un ThemePresetProvider',
    )
  }
  return context
}
