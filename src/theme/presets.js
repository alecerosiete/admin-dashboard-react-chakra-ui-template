/*
  ============================================
  theme/presets.js — Paletas de color para el dashboard
  ============================================
  Cada preset define una paleta de color que reemplaza
  el color "blue" de Chakra UI. Como todos los componentes
  usan "blue.500", "blue.50", etc., al cambiar el preset
  se cambia el color de toda la app automáticamente.

  🎨 Cómo crear un nuevo preset:
  1. Agrega un objeto con name + colors.blue
  2. Los valores 50→900 son la escala completa del color
  3. Agrégala al arreglo presets
*/

const presets = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },
  {
    id: 'emerald',
    name: 'Esmeralda',
    colors: {
      blue: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
    },
  },
  {
    id: 'amethyst',
    name: 'Amatista',
    colors: {
      blue: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
    },
  },
  {
    id: 'rose',
    name: 'Rosa',
    colors: {
      blue: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
      },
    },
  },
  {
    id: 'amber',
    name: 'Ámbar',
    colors: {
      blue: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
    },
  },
]

export default presets
