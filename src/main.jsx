import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './contexts/AppContext.jsx'
import { FiltersProvider } from './contexts/Filters.jsx'
import { SearchProvider } from './contexts/Search.jsx'
import { ContentProvider } from './contexts/ContentContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <SearchProvider>
      <FiltersProvider>
        <ContentProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </ContentProvider>
      </FiltersProvider>
    </SearchProvider>
  </AppContextProvider>
)
