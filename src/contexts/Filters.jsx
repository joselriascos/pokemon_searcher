import { createContext, useState } from 'react'
import { FILTERS_INITIAL_STATE } from '../utils/consts'

export const FiltersContext = createContext()

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    minId: 1,
    maxId: 10279,
    type: 'all',
  })

  const resetFilters = () => {
    setFilters(FILTERS_INITIAL_STATE)
  }

  const checkFiltersActive = () => {
    return !(
      filters.minId === FILTERS_INITIAL_STATE.minId &&
      filters.maxId === FILTERS_INITIAL_STATE.maxId &&
      filters.type === FILTERS_INITIAL_STATE.type
    )
  }

  return (
    <FiltersContext.Provider
      value={{ filters, setFilters, resetFilters, checkFiltersActive }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
