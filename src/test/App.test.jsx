import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { buildTheme } from '../theme'
import { ThemePresetProvider } from '../contexts/ThemePresetContext'
import App from '../App'

const theme = buildTheme()

test('renders the dashboard template', () => {
  render(
    <ThemePresetProvider>
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    </ThemePresetProvider>,
  )
  expect(screen.getByText('Inicio')).toBeInTheDocument()
  expect(screen.getByText('Configuración')).toBeInTheDocument()
})
