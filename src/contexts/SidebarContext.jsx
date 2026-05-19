/*
  ============================================
  SidebarContext.jsx — Estado global del sidebar
  ============================================
  Este archivo crea un "contexto" de React.
  Un contexto permite compartir datos entre componentes
  SIN tener que pasar props manualmente por cada nivel.

  🧠 Conceptos importantes:
  - createContext(): Crea un contenedor de datos global
  - Provider: Componente que "provee" los datos a todos los hijos
  - useContext(): Hook para leer el contexto desde cualquier componente hijo
  - useState(): Hook para crear estado local (isCollapsed)

  📦 ¿Qué datos comparte?
  - isCollapsed: true/false → indica si el sidebar está reducido
  - toggle(): Función para cambiar entre expandido/colapsado

  💡 ¿Dónde se usa?
  - Sidebar.jsx → para cambiar su ancho y mostrar/ocultar texto
  - Navbar.jsx  → para ajustar su posición izquierda
  - Footer.jsx  → para ajustar su posición izquierda
  - DashboardLayout.jsx → para ajustar el padding del contenido
*/

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

/*
  Creamos el contexto con un valor inicial vacío.
  createContext() devuelve un objeto con dos componentes:
  - SidebarContext.Provider (el que da los datos)
  - SidebarContext.Consumer (forma antigua, casi no se usa)
*/
const SidebarContext = createContext()

/*
  SidebarProvider es el componente que envuelve a toda la app
  (o a una parte) y provee el estado del sidebar a todos los hijos.

  📥 Props:
  - children: Los componentes hijos que tendrán acceso al contexto
*/
export function SidebarProvider({ children }) {
  /*
    useState(false) crea una variable de estado:
    - isCollapsed: el valor actual (false = expandido)
    - setIsCollapsed: función para cambiar el valor
    El valor inicial es false (sidebar expandido por defecto)
  */
  const [isCollapsed, setIsCollapsed] = useState(false)

  /*
    toggle() invierte el valor actual.
    Si está expandido → lo colapsa
    Si está colapsado → lo expande
    (prev) => !prev  es una función que recibe el valor anterior y devuelve el opuesto
  */
  const toggle = () => setIsCollapsed((prev) => !prev)

  /*
    El Provider pone los datos a disposición de todos los hijos.
    value = { isCollapsed, toggle } es lo que podrán leer los hijos.
  */
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

/*
  useSidebar() es un "hook personalizado".
  Un hook es una función que empieza con "use" y puede usar otros hooks.

  Este hook:
  1. Lee el contexto con useContext
  2. Si no hay Provider, lanza un error (ayuda a detectar bugs)
  3. Devuelve { isCollapsed, toggle }

  💡 Así se usa en los componentes:
    const { isCollapsed, toggle } = useSidebar()
*/
export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar debe usarse dentro de un SidebarProvider')
  }
  return context
}
