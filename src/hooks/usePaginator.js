import { useEffect, useState, useMemo } from 'react'
import { RESULTS_PER_PAGE } from '../utils/consts'
import { useContent } from './useContent'

export function usePaginator() {
  const [page, setPage] = useState(1)
  const [paginatedResults, setPaginatedResults] = useState([])
  const { results } = useContent()

  useEffect(() => {
    const newPaginatedResults = results?.slice(
      (page - 1) * RESULTS_PER_PAGE,
      page * RESULTS_PER_PAGE
    )
    setPaginatedResults(newPaginatedResults)
  }, [page, results])

  const goToLastPage = () => setPage(pages.length > 1 ? pages.length : 1)

  const goToNextPage = () =>
    page < pages.length
      ? setPage((prevState) => prevState + 1)
      : setPage((prevState) => prevState)

  const goToPreviousPage = () =>
    page > 1 ? setPage((prevState) => prevState - 1) : setPage(1)

  const goToFirstPage = () => setPage(1)

  const pages = useMemo(() => {
    if (!results || results.length === 0) return []
    const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE)
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }, [results])

  const visibleButtons = useMemo(() => {
    if (pages.length === 0) return []
    const start = Math.max(1, page - 2)
    const end = Math.min(pages.length, page + 2)
    return pages.slice(start - 1, end)
  }, [page, pages])

  useEffect(() => {
    if (page > pages.length && pages.length > 0) setPage(1)
  }, [pages.length])

  useEffect(() => {
    setPage(1)
  }, [results])

  return {
    page,
    visibleButtons,
    setPage,
    goToLastPage,
    goToFirstPage,
    goToNextPage,
    goToPreviousPage,
    paginatedResults,
  }
}
