import './Header.css'
import { MoonIcon } from '../Icons.jsx'
import { SunIcon } from '../Icons.jsx'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'
import { useRef } from 'react'
import FiltersModal from '../FiltersModal/FiltersModal.jsx'
import { useHeader } from '../../hooks/useHeader.js'
import { useSearch } from '../../hooks/useSearch.js'
import { useFilters } from '../../hooks/useFilters.js'

export function Header() {
  const { theme, toggleTheme, lang, isModalOpen } = useAppContext()
  const { search } = useSearch()
  const { checkFiltersActive } = useFilters()
  const searchRef = useRef()
  const suggestionContainerRef = useRef()
  const suggestionRef = useRef([])
  const {
    inputFocused,
    isFiltersModalOpen,
    suggestions,
    selectedIndex,
    setSelectedIndex,
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
  } = useHeader({ searchRef, suggestionRef, suggestionContainerRef })
  const il18n = IL18N[lang]

  return (
    <div
      className={`header-container 
        ${theme === 'dark' ? 'dark-mode' : ''} ${
        inputFocused ? 'input-focused' : ''
      } 
        ${isModalOpen ? 'hidden' : ''} 
        ${isFiltersModalOpen ? 'hidden' : ''} `}
    >
      <h1 onClick={handleClickHome}>Pokemon Searcher</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pikachu, 154, Bulbasaur, 87..."
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={searchRef}
        />
        {suggestions && (
          <ul
            ref={suggestionContainerRef}
            className={`suggestion-list ${theme === 'dark' ? 'dark-mode' : ''}`}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                ref={(element) => (suggestionRef.current[index] = element)}
                className={`suggestion 
                  ${theme === 'dark' ? 'dark-mode' : ''} 
                  ${selectedIndex === index ? 'selected' : ''}`}
                onMouseDown={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className={`search-btn ${theme === 'dark' ? 'dark-mode' : ''} ${
            search !== '' ? 'search-active' : ''
          }`}
        >
          {il18n.search}
        </button>
        <button
          onClick={handleFiltersOpen}
          className={`filters-btn ${theme === 'dark' ? 'dark-mode' : ''} ${
            checkFiltersActive() ? 'filters-active' : ''
          } `}
        >
          {il18n.filters}
        </button>
      </form>

      <div className="global-conf-container">
        <div className="theme-container" onClick={toggleTheme}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>

        <select
          name="language-select"
          id="language-select"
          defaultValue={lang}
          className={theme === 'dark' ? 'dark-mode' : ''}
          onChange={handleLangChange}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="pt">Português</option>
        </select>
      </div>
      <FiltersModal isOpen={isFiltersModalOpen} onClose={closeFiltersModal} />
    </div>
  )
}
