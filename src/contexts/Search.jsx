import { createContext } from 'react'
import { useState } from 'react'

export const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [search, setSearch] = useState('')

  const resetSearch = () => setSearch('')

  return (
    <SearchContext.Provider value={{ search, setSearch, resetSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
