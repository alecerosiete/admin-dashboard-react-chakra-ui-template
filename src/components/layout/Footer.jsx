/*
  ============================================
  Footer.jsx — Pie de página
  ============================================
  El footer es la barra inferior fija que se ve en todas las páginas.

  📦 ¿Qué contiene?
  - Copyright con el año actual
  - Links rápidos (Privacidad, Términos, Soporte)

  🧠 Conceptos importantes:
  - position="fixed": Se queda fijo abajo aunque hagas scroll
  - left: Se ajusta según el ancho del sidebar (igual que Navbar)
  - gap: Espacio entre elementos (propiedad moderna de CSS)
  - _hover: Cambia el color del link al pasar el mouse
  - {new Date().getFullYear()}: Obtiene el año actual automáticamente

  📱 Responsive:
  - Móvil: copyright arriba, links abajo (column)
  - Tablet/escritorio: todo en una línea (row)
*/

import { Box, Flex, Text, Link, Stack } from '@chakra-ui/react'
import { useSidebar } from '../../contexts/SidebarContext'

export default function Footer() {
  const { isCollapsed } = useSidebar()

  return (
    <Box
      as="footer"
      bg="white"
      color="gray.400"
      borderTop="1px"
      borderColor="gray.200"
      py="2"
      px={{ base: 4, md: 6 }}
      position="fixed"
      bottom="0"
      right="0"
      /*
        left se ajusta al ancho del sidebar.
        En móvil: 0 (ocupa todo el ancho)
        En escritorio: '16' (64px) si colapsado, '60' (240px) si expandido
      */
      left={{ base: 0, md: isCollapsed ? '16' : '60' }}
      zIndex="999"
      transition="left 0.2s"
      _dark={{ bg: 'gray.900', color: 'gray.500', borderColor: 'gray.700' }}
    >
      {/*
        Flex: Layout horizontal en desktop, vertical en móvil.
        direction: column en móvil (< sm), row en sm+.
        gap: separación vertical cuando está en columna (móvil).
      */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align="center"
        fontSize="xs"
        gap={{ base: 0.5, sm: 0 }}
      >
        {/*
          Texto de copyright.
          {new Date().getFullYear()} = año actual (2026, 2027, etc.)
          No necesitas actualizarlo manualmente.
        */}
        <Text>
          &copy; {new Date().getFullYear()} Mi Empresa
        </Text>

        {/*
          Links rápidos.
          Stack direction="row" los pone en horizontal.
          spacing="4" = 16px de separación entre cada link.
          _hover: se pone azul al pasar el mouse.
        */}
        <Stack direction="row" spacing="4">
          <Link href="#" _hover={{ color: 'blue.500' }}>
            Privacidad
          </Link>
          <Link href="#" _hover={{ color: 'blue.500' }}>
            Términos
          </Link>
          <Link href="#" _hover={{ color: 'blue.500' }}>
            Soporte
          </Link>
        </Stack>
      </Flex>
    </Box>
  )
}
