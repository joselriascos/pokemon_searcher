import { useContext } from 'react'
import { FiltersContext } from '../contexts/Filters'

export function useFilters() {
  const useFilters = useContext(FiltersContext)
  const { filters, setFilters, resetFilters, checkFiltersActive } = useFilters

  const filterResults = (results) => {
    return results.filter((result) => {
      const { pokemon } = result
      const { url } = pokemon ? pokemon : result
      const id = parseInt(
        url?.slice(url.lastIndexOf('pokemon/') + 8, url.lastIndexOf('/'))
      )
      return id >= filters.minId && id <= filters.maxId
    })
  }

  return {
    filters,
    setFilters,
    resetFilters,
    filterResults,
    checkFiltersActive,
  }
}
