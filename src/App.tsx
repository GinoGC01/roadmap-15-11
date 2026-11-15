import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import { RoadmapProvider } from './context/RoadmapProvider'
import { ProgressProvider } from './context/ProgressProvider'
import { ConfirmProvider } from './context/ConfirmProvider'
import { AppRoutes } from './routes'

import './styles/theme.css'
import './styles/globals.css'
import './styles/components.css'
import './styles/app.css'

function App() {
  return (
    <ThemeProvider>
      <RoadmapProvider>
        <ProgressProvider>
          <ConfirmProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ConfirmProvider>
        </ProgressProvider>
      </RoadmapProvider>
    </ThemeProvider>
  )
}

export default App
