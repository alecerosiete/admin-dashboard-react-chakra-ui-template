/*
  ============================================
  App.jsx — Configuración de rutas (Router)
  ============================================
  Aquí se definen las páginas de la aplicación.
  Cada <Route> apunta a un componente que se muestra en esa URL.

  🧠 Conceptos:
  - <Routes>: Contenedor de todas las rutas
  - <Route>: Define una URL y qué componente mostrar
  - element: El componente que se renderiza en esa ruta
  - index: La ruta principal "/"
  - path="*": Cualquier ruta no definida → redirige a "/"
  - <Navigate>: Redirecciona a otra ruta

  📂 Estructura de rutas:
  /              → DashboardHome (página principal)
  /tendencias    → DashboardHome (placeholder)
  /explorar      → DashboardHome (placeholder)
  /favoritos     → DashboardHome (placeholder)
  /configuracion → DashboardHome (placeholder)
  cualquier otra → Redirige a /

  💡 El <Route> con element={<DashboardLayout />} es un layout padre.
  Las rutas hijas se renderizan dentro de él gracias a <Outlet />
*/

import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import DashboardHome from './components/pages/DashboardHome'

function App() {
  return (
    <Routes>
      {/*
        DashboardLayout es el LAYOUT que envuelve todas las páginas.
        Tiene el sidebar, navbar y footer.
        Las páginas hijas se renderizan donde está <Outlet /> en DashboardLayout.
      */}
      <Route element={<DashboardLayout />}>
        {/*
          index → ruta "/" (la página principal)
          Todas las demás rutas usan el mismo componente DashboardHome
          porque aún no tienen su propia página (es un template).
        */}
        <Route index element={<DashboardHome />} />
        <Route path="tendencias" element={<DashboardHome />} />
        <Route path="explorar" element={<DashboardHome />} />
        <Route path="favoritos" element={<DashboardHome />} />
        <Route path="configuracion" element={<DashboardHome />} />

        {/*
          Ruta comodín: cualquier URL que no coincida redirige a "/"
          replace={true} significa que no guarda la URL errónea en el historial
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
