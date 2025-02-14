import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext.jsx'

export function useAppContext() {
  const appContext = useContext(AppContext)

  return appContext
}
