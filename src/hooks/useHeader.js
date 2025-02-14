import { useState } from 'react'
import { useAppContext } from './useAppContext.js'
import { useSearch } from './useSearch.js'
import { useFilters } from './useFilters.js'
import { names } from '../utils/names.js'
import { checkVisibilityAndScroll, resetScroll } from '../utils/functions.js'
import { useContent } from '../hooks/useContent.js'
import { useEffect } from 'react'

export function useHeader({
  searchRef,
  suggestionRef,
  suggestionContainerRef,
}) {
  const { changeLang } = useAppContext()
  const { goToFirstPage } = useContent()
  const [inputFocused, setInputFocuesed] = useState(false)
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { resetSearch, setSearch, search } = useSearch()
  const { resetFilters } = useFilters()

  useEffect(() => {
    if (search === '') searchRef.current.value = ''
  }, [search])

  const openFiltersModal = () => {
    setIsFiltersModalOpen(true)
  }

  const closeFiltersModal = () => {
    setIsFiltersModalOpen(false)
  }

  const handleLangChange = (event) => {
    changeLang(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      searchRef.current.value = ''
      searchRef.current.blur()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (selectedIndex < suggestions.length - 1) {
        setSelectedIndex(selectedIndex + 1)
        checkVisibilityAndScroll({
          container: suggestionContainerRef.current,
          element: suggestionRef.current[selectedIndex + 1],
        })
      }
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1)
        checkVisibilityAndScroll({
          container: suggestionContainerRef.current,
          element: suggestionRef.current[selectedIndex - 1],
        })
      }
    }
    if (event.key === 'Enter') {
      if (suggestions.length > 0 && selectedIndex >= 0) {
        handleSuggestionSelect(suggestions[selectedIndex])
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newSearch = searchRef.current.value.trim()
    if (!parseInt(newSearch)) {
      setSearch(newSearch.toLowerCase())
    } else {
      setSearch(newSearch)
    }
    searchRef.current.select()
    resetFilters()
    setSuggestions([])
    setSelectedIndex(0)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    searchRef.current.value = newSearch
    if (!newSearch) {
      resetSearch()
      setSuggestions([])
      return
    }
    const newSuggesitions = names.filter((name) =>
      name.toLowerCase().includes(newSearch.toLowerCase())
    )
    setSuggestions(newSuggesitions)
    setSelectedIndex(0)
  }

  const handleFiltersOpen = (event) => {
    event.preventDefault()
    openFiltersModal()
  }

  const handleClickHome = () => {
    resetSearch()
    resetFilters()
    goToFirstPage()
    resetScroll()
    setSuggestions([])
    searchRef.current.value = ''
    setSelectedIndex(0)
  }

  const handleSuggestionSelect = (text) => {
    const newSearch = text.toLowerCase().trim()
    setSearch(newSearch)
    searchRef.current.value = newSearch
    searchRef.current.select()
    resetFilters()
    setSuggestions([])
    setSelectedIndex(0)
  }

  const handleInputFocus = (event) => {
    setInputFocuesed(true)
    handleChange(event)
  }

  const handleInputBlur = () => {
    setInputFocuesed(false)
    setSuggestions([])
  }

  return {
    inputFocused,
    isFiltersModalOpen,
    closeFiltersModal,
    handleLangChange,
    handleKeyDown,
    handleSubmit,
    handleChange,
    handleFiltersOpen,
    handleClickHome,
    handleSuggestionSelect,
    handleInputFocus,
    handleInputBlur,
    suggestions,
    selectedIndex,
    setSelectedIndex,
  }
}
