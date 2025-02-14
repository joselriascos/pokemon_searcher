import './Content.css'
import { ThreeDot } from 'react-loading-indicators'
import InfoModal from '../InfoModal/InfoModal.jsx'
import { PokemonResult } from '../PokemonResult.jsx'
import { useContent } from '../../hooks/useContent.js'
import { useAppContext } from '../../hooks/useAppContext.js'
import { IL18N } from '../../utils/consts.js'
import { useFilters } from '../../hooks/useFilters.js'
import { useSearch } from '../../hooks/useSearch.js'
import { Paginator } from '../Paginator/Paginator.jsx'

export default function Content() {
  const {
    openModal,
    closeModal,
    selectedPokemon,
    resultsNumber,
    paginatedResults,
    page,
  } = useContent()

  //TODO: se está actualizando en el hook pero no aquí -> solucionar

  const { theme, lang, isModalOpen } = useAppContext()
  const { checkFiltersActive } = useFilters()
  const { search } = useSearch()
  const il18n = IL18N[lang]

  return !paginatedResults ? (
    <div className="content-loading-container">
      <ThreeDot
        variant="bounce"
        size="medium"
        text=""
        textColor=""
        color={theme === 'dark' ? '#fff' : '#000'}
      />
    </div>
  ) : paginatedResults.length > 0 ? (
    <div className="results-container">
      <h2
        className={`${theme === 'dark' ? 'dark-mode' : ''} ${
          checkFiltersActive() && search === '' ? '' : 'hidden'
        }`}
      >
        {`${il18n.results_found} ${resultsNumber}`}
      </h2>

      <div className="results-grid">
        {paginatedResults.map((result, index) => {
          return (
            <PokemonResult
              result={result}
              key={`${page}-${index}`}
              theme={theme}
              onClick={openModal}
            />
          )
        })}

        {selectedPokemon && (
          <InfoModal
            isOpen={isModalOpen}
            onClose={closeModal}
            id={selectedPokemon}
          />
        )}
      </div>
      <Paginator />
    </div>
  ) : (
    <div
      className={`no-results-container ${theme === 'dark' ? 'dark-mode' : ''}`}
    >
      {il18n.no_results}
    </div>
  )
}
