import { useEffect, useState } from 'react'
import { FILTERS_INITIAL_STATE, IL18N } from '../utils/consts.js'
import { useFilters } from './useFilters.js'
import { useAppContext } from './useAppContext.js'
import { useDisableScroll } from './useDisableScroll.js'
import { useSearch } from './useSearch.js'

export function useFiltersModal({ isOpen, onClose }) {
  const { resetSearch } = useSearch()
  const { filters, setFilters, resetFilters } = useFilters()
  const [errors, setErrors] = useState([])
  const [selectedMin, setSelectedMin] = useState(filters.minId)
  const [selectedMax, setSelectedMax] = useState(filters.maxId)
  const [selectedType, setSelectedType] = useState(filters.type)
  const { lang } = useAppContext()
  const il18n = IL18N[lang]

  useDisableScroll({ isOpen })

  useEffect(() => {
    setSelectedMin(filters.minId)
    setSelectedMax(filters.maxId)
    setSelectedType(filters.type)
  }, [isOpen])

  useEffect(() => {
    setErrors((prevErrors) => {
      let newErrors = [...prevErrors]

      if (selectedMin > selectedMax && !newErrors.includes(il18n.error1)) {
        newErrors.push(il18n.error1)
      }

      if (selectedMin <= FILTERS_INITIAL_STATE.minId - 1) {
        const errorMsg = `${il18n.error2} ${FILTERS_INITIAL_STATE.minId - 1}`
        if (!newErrors.includes(errorMsg)) newErrors.push(errorMsg)
      }

      if (selectedMax > FILTERS_INITIAL_STATE.maxId) {
        const errorMsg = `${il18n.error3} ${FILTERS_INITIAL_STATE.maxId}`
        if (!newErrors.includes(errorMsg)) newErrors.push(errorMsg)
      }

      return newErrors
    })

    return () => setErrors([])
  }, [selectedMin, selectedMax])

  const handleMinChange = (e) => {
    const newValue = Number(e.target.value)
    setSelectedMin(newValue)
  }

  const handleMaxChange = (e) => {
    const newValue = Number(e.target.value)
    setSelectedMax(newValue)
  }

  const handleFilter = () => {
    if (errors.length) return

    setFilters({
      minId: selectedMin,
      maxId: selectedMax,
      type: selectedType,
    })

    setErrors([])
    resetSearch()
    onClose()
  }

  const resetSelection = () => {
    resetFilters()
    setSelectedMin(FILTERS_INITIAL_STATE.minId)
    setSelectedMax(FILTERS_INITIAL_STATE.maxId)
    setSelectedType(FILTERS_INITIAL_STATE.type)
  }

  return {
    errors,
    handleMinChange,
    handleMaxChange,
    handleFilter,
    resetSelection,
    selectedMin,
    selectedMax,
    selectedType,
    setSelectedType,
  }
}
