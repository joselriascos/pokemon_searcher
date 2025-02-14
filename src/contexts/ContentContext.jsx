import { useState, useEffect, useMemo, createContext } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { useFilters } from '../hooks/useFilters.js'
import { fetchData, resetScroll } from '../utils/functions'
import {
  API_ALL_POKEMON,
  API_POKEMON_FILTERED_BY_TYPE_PREFIX,
  FILTERS_INITIAL_STATE,
  API_POKEMON_SEARCH_POKEMON,
  RESULTS_PER_PAGE,
} from '../utils/consts'
import { useSearch } from '../hooks/useSearch'

export const ContentContext = createContext()

export function ContentProvider({ children }) {
  /* Content logic */
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [results, setResults] = useState(null)
  const [resultsNumber, setResultsNumber] = useState(0)
  const { filters, filterResults } = useFilters()
  const { changeIsModalOpen } = useAppContext()
  const { search, checkSearchInFilters } = useSearch()

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      setResults(null)
      if (search.length) {
        const url = `${API_POKEMON_SEARCH_POKEMON}${search}/`
        try {
          const newResult = await fetchData(url)
          const checkedResult = checkSearchInFilters(newResult)
          setResults(checkedResult)
        } catch (error) {
          console.error(error)
        }
      } else {
        const url =
          filters.type === FILTERS_INITIAL_STATE.type
            ? API_ALL_POKEMON
            : API_POKEMON_FILTERED_BY_TYPE_PREFIX + filters.type
        try {
          const newResults = await fetchData(url)
          const filteredResults =
            filters.type === FILTERS_INITIAL_STATE.type
              ? filterResults(newResults?.results)
              : filterResults(newResults?.pokemon)
          setResultsNumber(filteredResults.length || 0)
          setResults(filteredResults)
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchDataAndFilter()
  }, [filters, search])

  const openModal = (id) => {
    if (!id) return
    changeIsModalOpen(true)
    setSelectedPokemon(id)
  }

  const closeModal = () => {
    changeIsModalOpen(false)
    setSelectedPokemon(null)
  }

  /* Paginator logic */
  const [page, setPage] = useState(1)
  const [paginatedResults, setPaginatedResults] = useState([])

  useEffect(() => {
    const newPaginatedResults = results?.slice(
      (page - 1) * RESULTS_PER_PAGE,
      page * RESULTS_PER_PAGE
    )
    setPaginatedResults(newPaginatedResults)
    resetScroll()
  }, [results, page])

  const pages = useMemo(() => {
    if (!results || results.length === 0) return []
    const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE)
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }, [results])

  const visibleButtons = useMemo(() => {
    if (pages.length === 0) return []
    const start = Math.max(1, page - 2)
    const end = Math.min(pages.length, page + 2)
    return pages.slice(start - 1, end)
  }, [pages, page])

  useEffect(() => {
    setPage(1)
  }, [results])

  const goToLastPage = () => setPage(Math.max(1, pages.length))

  const goToFirstPage = () => setPage(1)

  const goToNextPage = () =>
    setPage((prevState) => Math.min(prevState + 1, pages.length))

  const goToPrevPage = () => setPage((prevState) => Math.max(1, prevState - 1))

  return (
    <ContentContext.Provider
      value={{
        selectedPokemon,
        resultsNumber,
        paginatedResults,
        visibleButtons,
        page,
        openModal,
        closeModal,
        setPage,
        goToLastPage,
        goToFirstPage,
        goToNextPage,
        goToPrevPage,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}
