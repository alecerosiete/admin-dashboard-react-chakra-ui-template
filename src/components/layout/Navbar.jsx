/*
  ============================================
  Navbar.jsx — Barra de navegación superior
  ============================================
  La navbar es la barra horizontal que siempre se ve en la parte de arriba.

  📦 ¿Qué contiene?
  - Botón menú hamburguesa (solo en móvil) para abrir el sidebar
  - Logo "Dashboard" (solo en móvil)
  - Botón de notificaciones
  - Botón de modo claro/oscuro
  - Selector de tema de color (5 paletas)
  - Menú de perfil de usuario (avatar + dropdown)

  🧠 Conceptos importantes:
  - position="fixed": Se queda fijo aunque hagas scroll
  - left={{ base: 0, md: isCollapsed ? '16' : '60' }}: Se ajusta al ancho del sidebar
  - zIndex: Controla qué elemento está encima de otro (mayor número = más arriba)
  - _dark: Estilos para modo oscuro
  - Menu: Componente de Chakra para menús desplegables

  📱 Responsive:
  - En móvil: ocupa todo el ancho (left: 0), muestra hamburguesa
  - En escritorio: se desplaza según el sidebar (left: 60 o 16)
*/

import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useColorMode,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiBell,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi'
import { useSidebar } from '../../contexts/SidebarContext'
import ThemeSwitcher from './ThemeSwitcher'

/*
  Navbar
  ============================================
  📥 Props:
  - onOpen: Función para abrir el drawer del sidebar (solo móvil)
  - ...rest: Props adicionales que se pasan al Flex contenedor
*/
export default function Navbar({ onOpen, ...rest }) {
  /*
    isCollapsed: del SidebarContext.
    Se usa para ajustar el left (posición izquierda) de la navbar.
    Si el sidebar está colapsado, la navbar ocupa más espacio.
  */
  const { isCollapsed } = useSidebar()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      position="fixed"
      top="0"
      right="0"
      /*
        left define desde dónde empieza la navbar.
        En móvil: 0 (empieza desde la izquierda)
        En escritorio: depende del ancho del sidebar
      */
      left={{ base: 0, md: isCollapsed ? '16' : '60' }}
      zIndex="1000"
      height="16"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      px={{ base: 4, md: 6 }}
      /*
        justifyContent:
        - En móvil: space-between (hamburguesa a izq, perfil a der)
        - En escritorio: flex-end (todo a la derecha porque el sidebar tiene el logo)
      */
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      transition="left 0.2s"
      _dark={{ bg: 'gray.900', borderBottomColor: 'gray.700' }}
      {...rest}
    >
      {/*
        Botón hamburguesa: solo visible en móvil.
        display: none en md+ (escritorio).
        onClick={onOpen} abre el Drawer del sidebar.
      */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        aria-label="Abrir menú"
        icon={<FiMenu size="20" />}
      />

      {/*
        Logo: solo visible en móvil (la versión de escritorio está en el sidebar).
        fontFamily="heading" usa la fuente configurada en el tema.
      */}
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="xl"
        fontFamily="heading"
        fontWeight="bold"
        letterSpacing="tight"
      >
        Dashboard
      </Text>

      {/*
        Contenedor de los íconos de la derecha (notificaciones + perfil).
        spacing: separación entre elementos.
      */}
      <Stack direction="row" spacing={{ base: 1, md: 4 }} align="center">
        {/*
          Botón de notificaciones.
          variant="ghost": sin bordes ni fondo (solo ícono).
          _hover: cambia de color al pasar el mouse.
        */}
        <IconButton
          size="md"
          variant="ghost"
          aria-label="Notificaciones"
          icon={<FiBell size="18" />}
          color="gray.500"
          _hover={{ color: 'blue.500', bg: 'blue.50' }}
          _dark={{ _hover: { color: 'blue.200', bg: 'blue.900' } }}
        />

        {/*
          Botón de modo claro/oscuro.
          useColorMode() nos da:
          - colorMode: 'light' | 'dark'
          - toggleColorMode(): cambia entre claro y oscuro
          El ícono cambia según el modo actual:
          - light → FiMoon (para cambiar a oscuro)
          - dark  → FiSun (para cambiar a claro)
        */}
        <IconButton
          size="md"
          variant="ghost"
          aria-label={
            colorMode === 'light'
              ? 'Activar modo oscuro'
              : 'Activar modo claro'
          }
          icon={
            colorMode === 'light' ? <FiMoon size="18" /> : <FiSun size="18" />
          }
          color="gray.500"
          _hover={{ color: 'blue.500', bg: 'blue.50' }}
          _dark={{ _hover: { color: 'blue.200', bg: 'blue.900' } }}
          onClick={toggleColorMode}
        />

        {/*
          Selector de tema de color.
          Muestra un menú con los presets de color disponibles.
          Al seleccionar uno, se cambia la paleta de toda la app.
        */}
        <ThemeSwitcher />

        {/*
          Menu: Componente de Chakra para menú desplegable.
          - placement="bottom-end": se abre hacia abajo alineado a la derecha
          - isLazy: solo renderiza el contenido del menú cuando se abre (mejor rendimiento)
        */}
        <Menu placement="bottom-end" isLazy>
          {/*
            MenuButton: El botón que abre el menú.
            py={2}: padding vertical
            borderRadius="lg": esquinas redondeadas
            _hover: fondo gris al pasar el mouse
          */}
          <MenuButton
            py={2}
            transition="all 0.2s"
            borderRadius="lg"
            _hover={{ bg: 'gray.100' }}
            _dark={{ _hover: { bg: 'gray.800' } }}
            _focus={{ boxShadow: 'none' }}
          >
            {/*
              Contenido del botón: avatar + nombre + rol + flecha.
              En móvil: solo se ve el avatar.
              En escritorio: se ve todo.
            */}
            <Stack direction="row" align="center" spacing="3" px="2">
              {/*
                Avatar: Componente de Chakra para fotos de perfil.
                name: Texto que se muestra si no carga la imagen.
                src: URL de la imagen.
              */}
              <Avatar
                size="sm"
                name="Admin User"
                src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
              {/*
                Nombre y rol: ocultos en móvil (display: none en base, flex en md+).
              */}
              <Box
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                flexDirection="column"
                fontSize="sm"
                lineHeight="1.25"
              >
                <Text fontWeight="semibold">Admin User</Text>
                <Text fontSize="xs" color="gray.500">
                  Administrador
                </Text>
              </Box>
              <Box display={{ base: 'none', md: 'flex' }} color="gray.400">
                <FiChevronDown size="16" />
              </Box>
            </Stack>
          </MenuButton>

          {/*
            MenuList: El contenido desplegable del menú.
            shadow="lg": sombra grande
            borderColor: color del borde
          */}
          <MenuList
            py="2"
            shadow="lg"
            borderColor="gray.200"
            _dark={{ borderColor: 'gray.700' }}
          >
            {/*
              MenuGroup: Agrupa items relacionados.
              title="Mi Cuenta": Título del grupo.
            */}
            <MenuGroup
              title="Mi Cuenta"
              fontSize="xs"
              color="gray.500"
              px="3"
              pb="1"
            >
              {/*
                MenuItem: Cada opción del menú.
                icon: Ícono a la izquierda.
                command: Atajo de teclado (se muestra a la derecha).
              */}
              <MenuItem icon={<FiUser size="16" />} command="⌘P">
                Mi Perfil
              </MenuItem>
              <MenuItem icon={<FiSettings size="16" />} command="⌘S">
                Configuración
              </MenuItem>
            </MenuGroup>
            {/*
              MenuDivider: Línea separadora.
            */}
            <MenuDivider />
            {/*
              Cerrar Sesión en rojo para indicar acción destructiva.
            */}
            <MenuItem
              icon={<FiLogOut size="16" />}
              color="red.500"
              _dark={{ color: 'red.300' }}
            >
              Cerrar Sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  )
}
