import { useEffect, useState } from 'react'
import { FILTERS_INITIAL_STATE, IL18N } from '../utils/consts.js'
import { useFilters } from './useFilters.js'
import { useDisableScroll } from './useDisableScroll.js'
import { useSearch } from './useSearch.js'
import { useAppContext } from './useAppContext.js'

export function useFiltersModal({ isOpen, onClose }) {
  const { lang } = useAppContext()
  const { resetSearch } = useSearch()
  const { filters, setFilters, resetFilters } = useFilters()
  const [errors, setErrors] = useState([])
  const [selectedRange, setSelectedRange] = useState([
    filters.minId,
    filters.maxId,
  ])
  const [selectedType, setSelectedType] = useState(filters.type)
  const il18n = IL18N[lang]

  const minIdValue = FILTERS_INITIAL_STATE.minId
  const maxIdValue = FILTERS_INITIAL_STATE.maxId

  useDisableScroll({ isOpen })

  useEffect(() => {
    setSelectedRange([filters.minId, filters.maxId])
    setSelectedType(filters.type)
  }, [isOpen])

  useEffect(() => {
    setErrors((prevErrors) => {
      let newErrors = [...prevErrors]

      if (
        selectedRange[0] > selectedRange[1] &&
        !newErrors.includes(il18n.error1)
      ) {
        newErrors.push(il18n.error1)
      }

      if (selectedRange[0] <= FILTERS_INITIAL_STATE.minId - 1) {
        const errorMsg = `${il18n.error2} ${FILTERS_INITIAL_STATE.minId - 1}`
        if (!newErrors.includes(errorMsg)) newErrors.push(errorMsg)
      }

      if (selectedRange[1] > FILTERS_INITIAL_STATE.maxId) {
        const errorMsg = `${il18n.error3} ${FILTERS_INITIAL_STATE.maxId}`
        if (!newErrors.includes(errorMsg)) newErrors.push(errorMsg)
      }

      return newErrors
    })
    return () => setErrors([])
  }, [selectedRange])

  const handleMinIdChange = (e) => {
    const newValue = Number(e.target.value)
    setSelectedRange((prevState) => [newValue, prevState[1]])
  }

  const handleMaxIdChange = (e) => {
    const newValue = Number(e.target.value)
    setSelectedRange((prevState) => [prevState[0], newValue])
  }

  const handleRangeChange = (e, newRange) => {
    setSelectedRange(newRange)
  }

  const handleFilter = () => {
    if (errors.length) return

    setFilters({
      minId: selectedRange[0],
      maxId: selectedRange[1],
      type: selectedType,
    })

    setErrors([])
    resetSearch()
    onClose()
  }

  const resetSelection = () => {
    resetFilters()
    setSelectedRange([FILTERS_INITIAL_STATE.minId, FILTERS_INITIAL_STATE.maxId])
    setSelectedType(FILTERS_INITIAL_STATE.type)
  }

  return {
    handleRangeChange,
    handleFilter,
    resetSelection,
    setSelectedType,
    handleMinIdChange,
    handleMaxIdChange,
    minIdValue,
    maxIdValue,
    errors,
    selectedType,
    selectedRange,
  }
}
