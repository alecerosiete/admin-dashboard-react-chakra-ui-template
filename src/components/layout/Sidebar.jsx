/*
  ============================================
  Sidebar.jsx — Barra lateral de navegación
  ============================================
  El sidebar es el menú de navegación principal.
  Se muestra como:
  - Barra fija a la izquierda en escritorio
  - Drawer (menú deslizable) en móvil

  📦 Componentes internos:
  - Sidebar (export default): El contenedor principal
  - SidebarNavItem: Cada link de navegación individual

  🧠 Conceptos importantes:
  - NavLink: Componente de react-router que detecta automáticamente
    si la ruta actual coincide con su "to", y aplica estilos activos
  - useSidebar(): Hook personalizado que lee el contexto del sidebar
  - _dark: Prop de Chakra para estilos en modo oscuro
  - transition: Animación suave al colapsar/expandir
  - overflowX="hidden": Oculta el texto cuando el sidebar se colapsa

  🎨 Estados visuales:
  - Normal: texto gris, sin fondo
  - Hover: fondo azul claro, texto azul
  - Activo (isActive): fondo azul claro + borde izquierdo azul
  - Colapsado: solo íconos, sin texto, tooltip nativo con title
*/

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Icon,
  IconButton,
  Divider,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { useSidebar } from '../../contexts/SidebarContext'

/*
  linkItems: Arreglo con las páginas del dashboard.
  Cada item tiene:
  - name: Texto visible en el menú
  - icon: Componente de ícono (de react-icons/fi)
  - path: Ruta URL (debe coincidir con las rutas en App.jsx)

  💡 Para agregar una página nueva:
  1. Agrega un item aquí
  2. Agrega una ruta en App.jsx
  3. Crea un componente en components/pages/
*/
const linkItems = [
  { name: 'Inicio', icon: FiHome, path: '/' },
  { name: 'Tendencias', icon: FiTrendingUp, path: '/tendencias' },
  { name: 'Explorar', icon: FiCompass, path: '/explorar' },
  { name: 'Favoritos', icon: FiStar, path: '/favoritos' },
  { name: 'Configuración', icon: FiSettings, path: '/configuracion' },
]

/*
  SidebarNavItem — Un solo link en el sidebar
  ============================================
  📥 Props:
  - icon: El ícono a mostrar (ej: FiHome)
  - children: El texto del link (ej: "Inicio")
  - path: La ruta URL (ej: "/")
  - onClose: Función para cerrar el drawer en móvil
  - isCollapsed: true/false (sidebar reducido)
*/
function SidebarNavItem({ icon, children, path, onClose, isCollapsed }) {
  return (
    /*
      NavLink es de react-router-dom.
      Asigna automáticamente aria-current="page" cuando la ruta coincide.
      La prop "as" hace que Box se comporte como un <a> (link).
    */
    <Box
      as={NavLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={onClose}
    >
      {/*
        Render prop: NavLink proporciona { isActive } a la función children.
        isActive = true cuando la URL actual coincide con "to".
      */}
      {({ isActive }) => (
        <Flex
          align="center"
          justify={isCollapsed ? 'center' : 'flex-start'}
          p="3"
          mx={isCollapsed ? '1' : '2'}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          fontWeight={isActive ? 'semibold' : 'medium'}
          bg={isActive ? 'blue.50' : 'transparent'}
          color={isActive ? 'blue.600' : 'gray.600'}
          /*
            Borde izquierdo: solo se muestra en modo expandido (no collapsed)
            y cuando el item está activo.
            El padding se ajusta para que el texto no se mueva al aparecer el borde.
          */
          borderLeft={isCollapsed ? 'none' : '4px'}
          borderLeftColor={
            isActive && !isCollapsed ? 'blue.500' : 'transparent'
          }
          pl={isCollapsed ? undefined : isActive ? '14px' : '18px'}
          transition="all 0.2s"
          /*
            title: Tooltip nativo del navegador.
            Solo se muestra en modo colapsado para que se vea el nombre al hacer hover.
          */
          title={isCollapsed ? children : undefined}
          _hover={{
            bg: 'blue.50',
            color: 'blue.600',
            borderLeftColor: isCollapsed ? 'transparent' : 'blue.500',
            pl: isCollapsed ? undefined : '14px',
          }}
          _dark={{
            bg: isActive ? 'blue.900' : 'transparent',
            color: isActive ? 'blue.200' : 'gray.400',
            borderLeftColor:
              isActive && !isCollapsed ? 'blue.400' : 'transparent',
            _hover: {
              bg: 'blue.900',
              color: 'blue.200',
              borderLeftColor: isCollapsed ? 'transparent' : 'blue.400',
            },
          }}
        >
          {/*
            Icon: El ícono del item.
            En modo colapsado es más grande y sin margen derecho.
          */}
          <Icon
            mr={isCollapsed ? '0' : '3'}
            fontSize={isCollapsed ? '20' : '18'}
            as={icon}
            transition="color 0.2s"
          />
          {/*
            Texto del link: se oculta completamente en modo colapsado.
            Operador lógico &&: si isCollapsed es false, se renderiza el <Text>.
          */}
          {!isCollapsed && <Text fontSize="sm">{children}</Text>}
        </Flex>
      )}
    </Box>
  )
}

/*
  Sidebar — Componente principal del sidebar
  ============================================
  📥 Props:
  - onClose: Función para cerrar el drawer (viene de DashboardLayout)
  - ...rest: Cualquier otra prop se pasa al Box contenedor (útil para display:none)
*/
export default function Sidebar({ onClose, ...rest }) {
  const { isCollapsed, toggle } = useSidebar()

  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      /*
        Ancho del sidebar:
        - base: full (ocupa todo en móvil, cuando es Drawer)
        - md: '60' (240px) expandido o '16' (64px) colapsado
      */
      w={{ base: 'full', md: isCollapsed ? '16' : '60' }}
      pos="fixed"
      h="full"
      zIndex="1005"
      display="flex"
      flexDirection="column"
      transition="width 0.2s"
      overflowX="hidden"
      _dark={{ bg: 'gray.900', borderRightColor: 'gray.700' }}
      {...rest}
    >
      {/*
        Header del sidebar: contiene el logo/título y el botón de colapsar.
        En modo colapsado, solo se muestra el botón centrado.
      */}
      <Flex
        h="16"
        align="center"
        justify={isCollapsed ? 'center' : 'space-between'}
        px={isCollapsed ? '0' : '6'}
      >
        {/*
          Título: solo visible en modo expandido.
          Heading es el componente de Chakra para títulos.
          whiteSpace="nowrap" evita que el texto se rompa en varias líneas.
        */}
        {!isCollapsed && (
          <Heading
            as="h1"
            size="md"
            fontFamily="heading"
            letterSpacing="tight"
            whiteSpace="nowrap"
          >
            Dashboard
          </Heading>
        )}
        {/*
          Botón para colapsar/expandir el sidebar.
          IconButton es un botón de Chakra con solo un ícono.
          size="sm" lo hace pequeño.
        */}
        <IconButton
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          variant="ghost"
          size="sm"
          onClick={toggle}
          color="gray.500"
          _hover={{ color: 'blue.500', bg: 'blue.50' }}
          _dark={{ _hover: { color: 'blue.200', bg: 'blue.900' } }}
        />
      </Flex>

      {/*
        Divider: línea horizontal separadora.
        Chakra usa <hr> con estilos predeterminados.
      */}
      <Divider borderColor="gray.200" _dark={{ borderColor: 'gray.700' }} />

      {/*
        Links de navegación.
        Stack: layout vertical con spacing="1" (4px de separación).
        flex="1" hace que esta sección ocupe el espacio disponible.
      */}
      <Stack spacing="1" px="3" py="4" flex="1">
        {linkItems.map((link) => (
          <SidebarNavItem
            key={link.name}
            icon={link.icon}
            path={link.path}
            onClose={onClose}
            isCollapsed={isCollapsed}
          >
            {link.name}
          </SidebarNavItem>
        ))}
      </Stack>

      {/*
        Footer del sidebar: muestra la versión de la app.
        borderTop separa visualmente esta sección.
      */}
      <Flex
        px={isCollapsed ? '0' : '6'}
        py="4"
        justify={isCollapsed ? 'center' : undefined}
        borderTop="1px"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.700' }}
      >
        <Text fontSize="xs" color="gray.400">
          {isCollapsed ? '0.1' : 'v0.0.1'}
        </Text>
      </Flex>
    </Box>
  )
}
