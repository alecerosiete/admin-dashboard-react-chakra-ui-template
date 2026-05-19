/*
  ============================================
  DashboardHome.jsx — Página principal del dashboard
  ============================================
  Este es el componente que se muestra en la ruta "/".
  Por ahora es un placeholder (espacio reservado) donde irá
  el contenido real del dashboard (gráficas, tablas, etc.).

  🧠 Conceptos importantes:
  - useColorModeValue: Hook de Chakra que devuelve un valor
    diferente según el modo claro/oscuro.
    Ej: useColorModeValue('gray.200', 'gray.700')
    → en modo claro: 'gray.200'
    → en modo oscuro: 'gray.700'

  📝 Cuando quieras agregar contenido real:
  1. Reemplaza este componente con tus gráficas, tablas, etc.
  2. Puedes crear más páginas en components/pages/
  3. Conéctalas en App.jsx con una nueva ruta
*/

import { Box, Text, useColorModeValue } from '@chakra-ui/react'

export default function DashboardHome() {
  return (
    <Box
      /*
        borderWidth: Ancho del borde
        borderStyle: "dashed" = borde punteado
        borderRadius: "lg" = esquinas redondeadas grandes
        h="96" = altura fija (96 * 4px = 384px)
        display="flex" + alignItems + justifyContent = centra el contenido
      */
      borderWidth="2px"
      borderStyle="dashed"
      borderRadius="lg"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      h="96"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Text color="gray.500" fontSize="xl" fontWeight="medium">
        Tu Contenido Principal Aquí
      </Text>
    </Box>
  )
}
