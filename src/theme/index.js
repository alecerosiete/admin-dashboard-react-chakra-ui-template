/*
  ============================================
  theme/index.js — Tema personalizado de Chakra UI
  ============================================
  buildTheme(preset) genera un tema dinámico a partir
  de un preset de color. El preset define la paleta "blue"
  que usan todos los componentes del dashboard.

  Si no se pasa preset, usa los colores por defecto de Chakra.
*/

import { extendTheme } from '@chakra-ui/react'

export function buildTheme(preset) {
  const colorOverrides = preset?.colors || {}

  return extendTheme({
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },

    fonts: {
      heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
      body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
      mono: `'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace`,
    },

    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    colors: {
      ...colorOverrides,
    },

    styles: {
      global: {
        body: {
          margin: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#root': {
          minHeight: '100svh',
        },
      },
    },
  })
}
