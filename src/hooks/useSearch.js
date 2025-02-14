import { useContext } from 'react'
import { SearchContext } from '../contexts/Search'
import { useFilters } from './useFilters'
import { FILTERS_INITIAL_STATE } from '../utils/consts'

export function useSearch() {
  const { search, setSearch, resetSearch } = useContext(SearchContext)
  const { filters, checkFiltersActive } = useFilters()

  const checkSearchInFilters = (result) => {
    if (!result.id) return []
    if (!checkFiltersActive()) return [result]
    const typeInFilters =
      filters.type === FILTERS_INITIAL_STATE.type
        ? true
        : result.types.find((type) => type.type.name === filters.type)
    if (
      result.id >= filters.minId &&
      result.id <= filters.maxId &&
      typeInFilters
    )
      return [result]
    return []
  }

  return { search, setSearch, resetSearch, checkSearchInFilters }
}
