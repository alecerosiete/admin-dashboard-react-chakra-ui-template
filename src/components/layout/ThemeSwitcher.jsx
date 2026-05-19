/*
  ============================================
  ThemeSwitcher.jsx — Selector de tema de color
  ============================================
  Muestra un botón con un ícono de paleta que al
  hacer clic despliega un menú con los presets
  de color disponibles. Cada preset se muestra
  como un círculo con su color primario.

  📦 ¿Cómo agregar un nuevo color?
  1. Ve a theme/presets.js
  2. Agrega un nuevo objeto al arreglo presets
  3. El nombre y los colores aparecerán automáticamente aquí
*/

import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Circle,
} from '@chakra-ui/react'
import { FiDroplet } from 'react-icons/fi'
import { useThemePreset } from '../../contexts/ThemePresetContext'

/*
  Obtiene el color primario (500) de cada preset
  para mostrarlo como círculo de muestra.
  Si no encuentra el color, usa gray.300 por defecto.
*/
function getPresetColor(preset) {
  return preset.colors?.blue?.[500] || '#CBD5E0'
}

export default function ThemeSwitcher() {
  const { presetId, setPreset, presets } = useThemePreset()

  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        as={IconButton}
        size="md"
        variant="ghost"
        aria-label="Cambiar tema de color"
        icon={<FiDroplet size="18" />}
        color="gray.500"
        _hover={{ color: 'blue.500', bg: 'blue.50' }}
        _dark={{ _hover: { color: 'blue.200', bg: 'blue.900' } }}
      />
      <MenuList
        py="2"
        shadow="lg"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.700' }}
        minW="180px"
      >
        {presets.map((p) => (
          <MenuItem
            key={p.id}
            onClick={() => setPreset(p.id)}
            bg={presetId === p.id ? 'blue.50' : 'transparent'}
            _dark={{
              bg: presetId === p.id ? 'blue.900' : 'transparent',
            }}
          >
            <Flex align="center" gap="3">
              {/*
                Círculo de muestra con el color primario del preset.
                Circle es un componente de Chakra que dibuja un círculo.
                size="4" = 16px de diámetro.
              */}
              <Circle size="4" bg={getPresetColor(p)} />
              <Text fontSize="sm">{p.name}</Text>
              {/*
                Indicador de selección: se muestra cuando el preset
                está activo.
              */}
              {presetId === p.id && (
                <Text fontSize="xs" color="blue.500" ml="auto">
                  ✓
                </Text>
              )}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
