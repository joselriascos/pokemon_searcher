import './App.css'
import { Header } from './Components/Header/Header.jsx'
import { ThreeDot } from 'react-loading-indicators'
import { useAppContext } from './hooks/useAppContext.js'
import { lazy, Suspense } from 'react'

const Content = lazy(() => import('./Components/Content/Content.jsx'))

function App() {
  const { theme } = useAppContext()
  const className = `app-container ${theme === 'dark' ? 'dark-mode' : ''}`

  return (
    <div className={className}>
      <Header />
      <Suspense
        fallback={
          <div className="loading-container">
            <ThreeDot
              variant="bounce"
              size="medium"
              text=""
              textColor=""
              color={theme === 'dark' ? '#fff' : '#000'}
            />
          </div>
        }
      >
        <Content />
      </Suspense>
    </div>
  )
}

export default App
