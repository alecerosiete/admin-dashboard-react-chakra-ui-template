# Admin Dashboard — React + Chakra UI

## Descripción

Template de dashboard admin construido con React 19 + Vite 8 + Chakra UI v2.
Diseño responsive con sidebar colapsable, navbar superior, footer fijo y enrutamiento SPA.

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | React | 19.x |
| Build | Vite | 8.x |
| UI Components | Chakra UI | 2.10.x |
| Animaciones | Framer Motion | 12.x |
| Íconos | react-icons (Feather) | 5.x |
| Enrutamiento | react-router-dom | 7.x |
| Testing | Vitest + @testing-library/react + jsdom | 4.x |
| Linting | ESLint + react-hooks + react-refresh | 10.x |
| Fuentes | Inter + JetBrains Mono (Google Fonts) | — |

## Estructura del Proyecto

```
react-project/
├── index.html                    # HTML entry (carga Google Fonts)
├── package.json                  # Dependencias y scripts
├── vite.config.js                # Configuración de Vite
├── vitest.config.js              # Configuración de Vitest
├── eslint.config.js              # Reglas de ESLint
├── nginx.conf                    # Config NGINX para producción
├── Dockerfile                    # Build multi-etapa (node → nginx)
├── docker-compose.yml            # Deploy con Docker
├── .env.example                  # Variables de entorno
├── .gitignore
├── .dockerignore
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  # Entry Point
    ├── ThemedApp.jsx             # App con tema dinámico (preset + ChakraProvider)
    ├── App.jsx                   # Router principal
    ├── index.css                 # Estilos globales mínimos
    ├── theme/
    │   ├── index.js              # buildTheme(preset) → genera tema Chakra
    │   └── presets.js            # 5 paletas de color: Default, Esmeralda, Amatista, Rosa, Ámbar
    ├── contexts/
    │   ├── SidebarContext.jsx     # Contexto para estado colapsado del sidebar
    │   └── ThemePresetContext.jsx # Contexto para selección de paleta de color
    ├── components/
    │   ├── layout/
    │   │   ├── DashboardLayout.jsx  # Layout principal (sidebar + navbar + footer + outlet)
    │   │   ├── Sidebar.jsx          # Sidebar colapsable con navegación
    │   │   ├── Navbar.jsx           # Topbar con perfil, notificaciones y selector de tema
    │   │   ├── ThemeSwitcher.jsx    # Menú desplegable para elegir paleta de color
    │   │   └── Footer.jsx           # Footer fijo y responsive
    │   └── pages/
    │       └── DashboardHome.jsx    # Página principal placeholder
    └── test/
        ├── setup.js              # Configuración de tests (matchMedia mock)
        └── App.test.jsx          # Smoke test
```

## Arquitectura de Componentes

```
<BrowserRouter>                         # react-router-dom
  <ChakraProvider theme={theme}>        # Chakra UI (tema personalizado)
    <App>                               # Define las rutas
      <Routes>
        <Route element={<DashboardLayout />}>  # Provider del SidebarContext
          <SidebarProvider>
            <LayoutContent>
              <Sidebar />               # Barra lateral (fija en desktop, drawer en móvil)
              <Navbar />                # Barra superior con perfil
              <Flex>
                <main>
                  <Outlet />            # ← Aquí se renderiza la página activa
                </main>
                <Footer />              # Pie de página fijo
              </Flex>
            </LayoutContent>
          </SidebarProvider>
        </Route>
      </Routes>
    </App>
  </ChakraProvider>
</BrowserRouter>
```

### Árbol de páginas (rutas)

```
/                  → DashboardHome
/tendencias        → DashboardHome (placeholder)
/explorar          → DashboardHome (placeholder)
/favoritos         → DashboardHome (placeholder)
/configuracion     → DashboardHome (placeholder)
*                  → Redirige a /
```

## Comandos

```bash
npm run dev        # Desarrollo (puerto 3000, host 0.0.0.0)
npm run build      # Build producción → dist/
npm run preview    # Vista previa del build
npm run lint       # ESLint
npm run test       # Tests (modo watch)
npm run test:run   # Tests (single run)
npm run test:ui    # Tests con UI Vitest
```

## Patrones y Convenciones

### Componentes
- Cada componente en su propio archivo dentro de `components/`
- Layouts en `components/layout/`, páginas en `components/pages/`
- Todos los estilos vía props de Chakra UI (sin CSS modules ni styled-components)
- `_dark` para variantes en modo oscuro
- `transition` para animaciones suaves

### SidebarContext
- Estado global compartido vía React Context
- `SidebarProvider` envuelve el layout
- `useSidebar()` hook retorna `{ isCollapsed, toggle }`
- Navbar, Footer y DashboardLayout consumen el contexto para ajustar offsets

### Responsive Design
- Breakpoints Chakra: base (< 30em), sm (30em), md (48em), lg (62em), xl (80em)
- Sidebar: drawer en móvil, fijo en desktop
- Navbar: hamburguesa en móvil, perfil expandido en desktop, toggle claro/oscuro
- Footer: columna en móvil, fila en desktop

### Temas y Fuentes
- Inter (Google Fonts) para headings y body
- JetBrains Mono para código
- Color mode: `system` (respeta preferencia del SO)
- Configurado vía `src/theme/index.js` con `extendTheme()`

### Presets de Color
- 5 paletas: **Default** (azul), **Esmeralda** (verde), **Amatista** (púrpura), **Rosa**, **Ámbar**
- Definidos en `src/theme/presets.js` como arreglo de objetos `{ id, name, colors }`
- Cada preset sobrescribe la paleta `blue` de Chakra (todos los componentes usan `blue.*`)
- `ThemePresetContext` almacena el preset activo
- `ThemeSwitcher` en Navbar muestra un menú con círculos de color
- `ThemedApp.jsx` usa `key={presetId}` en ChakraProvider para forzar remount al cambiar

## Despliegue

### Docker
```bash
docker compose up -d     # Construye y levanta en puerto 80
docker compose down      # Detiene
```

### Producción (sin Docker)
```bash
npm run build
# Sirve dist/ con cualquier servidor estático
```

## Variables de Entorno

Ver `.env.example`:

```
VITE_APP_TITLE=react-project
VITE_API_URL=http://localhost:4000
```

Las variables deben empezar con `VITE_` para ser expuestas al frontend.

## Testing

- Framework: Vitest con entorno jsdom
- Setup: `src/test/setup.js` (mock de matchMedia para Chakra UI)
- Test de humo: verifica que los componentes del sidebar rendericen
- Para correr: `npm run test:run`

## ESLint

- Configuración plana (formato nuevo de ESLint v10)
- Plugins: react-hooks, react-refresh
- Globals: browser + vitest
- Ignora: dist/, coverage/
