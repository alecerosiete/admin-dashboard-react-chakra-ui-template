/*
  ============================================
  DashboardLayout.jsx — Layout principal del dashboard
  ============================================
  Este componente es el "esqueleto" de la aplicación.
  Todas las páginas se renderizan DENTRO de este layout.

  📦 Estructura del layout:
  ┌──────────────────────────────┐
  │  Sidebar (izquierda, fijo)   │
  │  Navbar (arriba, fijo)       │
  │  Contenido principal (centro)│
  │  Footer (abajo, fijo)        │
  └──────────────────────────────┘

  🧠 Conceptos importantes:
  - Outlet: Donde se renderizan las páginas hijas (definidas en App.jsx)
  - useDisclosure: Hook de Chakra para manejar modales/drawers (abrir/cerrar)
  - Drawer: Sidebar que se desliza desde un costado (usado en móvil)
  - SidebarProvider: Contexto que comparte el estado colapsado del sidebar

  📱 Responsive:
  - En móvil (< md): sidebar es un Drawer (se abre con el menú hamburguesa)
  - En escritorio (>= md): sidebar está siempre visible
*/

import { Box, Flex, useDisclosure, Drawer, DrawerContent } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../../contexts/SidebarContext'
import { useSidebar } from '../../contexts/SidebarContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'

/*
  LayoutContent es el layout en sí.
  Está separado de DashboardLayout para poder usar useSidebar()
  DENTRO del SidebarProvider (que se declara en DashboardLayout).
*/
function LayoutContent() {
  /*
    useDisclosure() es un hook de Chakra que maneja estados abierto/cerrado.
    Devuelve:
    - isOpen: true/false
    - onOpen: función para abrir
    - onClose: función para cerrar
    Lo usamos para controlar el Drawer del sidebar en móvil.
  */
  const { isOpen, onOpen, onClose } = useDisclosure()

  /*
    isCollapsed viene del SidebarContext.
    Indica si el sidebar está reducido (solo iconos) o expandido.
  */
  const { isCollapsed } = useSidebar()

  return (
    /*
      minH="100vh" → altura mínima de toda la pantalla
      bg: color de fondo (cambia en dark mode con _dark)
    */
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      {/*
        Sidebar en escritorio: siempre visible (display: none en móvil, block en md+)
        onClose se pasa para que los links del sidebar cierren el drawer en móvil
      */}
      <Sidebar onClose={onClose} display={{ base: 'none', md: 'block' }} />

      {/*
        Drawer = sidebar deslizable (solo en móvil)
        - isOpen: controla si está visible
        - placement="left": aparece desde la izquierda
        - size="full": ocupa toda la pantalla en móvil
        - returnFocusOnClose={false}: no devuelve el foco al cerrar
        - onOverlayClick={onClose}: cierra al tocar fuera
      */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        {/*
          DrawerContent es el contenido del Drawer.
          Aquí adentro va el sidebar (igual que en escritorio pero con onClose).
        */}
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/*
        Navbar fijo en la parte superior.
        onOpen se usa para abrir el Drawer en móvil (menú hamburguesa).
      */}
      <Navbar onOpen={onOpen} />

      {/*
        Contenedor del contenido principal + footer.
        - pl (padding-left): se ajusta según el sidebar (60 = 240px, 16 = 64px)
        - pt="16": deja espacio para el navbar fijo (16 = 64px)
        - transition: animación suave al colapsar/expandir el sidebar
      */}
      <Flex
        flexDirection="column"
        minH="100vh"
        pl={{ base: 0, md: isCollapsed ? '16' : '60' }}
        pt="16"
        transition="padding-left 0.2s"
      >
        {/*
          <main> es el contenido principal.
          flex="1" hace que ocupe todo el espacio disponible.
          pb="20" (padding-bottom) evita que el footer tape el contenido.
          <Outlet /> renderiza aquí la página activa (definida en App.jsx).
        */}
        <Box as="main" p="6" flex="1" pb="20">
          <Outlet />
        </Box>

        {/*
          Footer fijo en la parte inferior.
          Se ajusta automáticamente al ancho del sidebar.
        */}
        <Footer />
      </Flex>
    </Box>
  )
}

/*
  DashboardLayout es el export principal.
  Envuelve el layout con SidebarProvider para que todos los componentes
  puedan acceder al estado del sidebar (colapsado/expandido).
*/
export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}
