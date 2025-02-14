import Modal from 'react-modal'
import './FiltersModal.css'
import { useAppContext } from '../../hooks/useAppContext'
import { IL18N } from '../../utils/consts'
import { useFiltersModal } from '../../hooks/useFilterModal'

export default function FiltersModal({ isOpen, onClose }) {
  const { lang } = useAppContext()
  const il18n = IL18N[lang]

  const {
    errors,
    handleMinChange,
    handleMaxChange,
    handleFilter,
    resetSelection,
    setSelectedType,
    selectedMin,
    selectedMax,
    selectedType,
  } = useFiltersModal({ isOpen, onClose })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="filters-modal-content"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div id="filters-modal">
        <h2>{il18n.filters}</h2>

        <span className="close-btn" onClick={onClose}>
          x
        </span>

        <div id="filters-container">
          <h3>{il18n.filter_by_id}</h3>
          <div className="id-range-filter-container">
            <div className="range-container">
              <label htmlFor="min-id-range">
                {il18n.min}
                <input
                  type="range"
                  min="1"
                  max={selectedMax}
                  placeholder="min"
                  value={selectedMin}
                  id="min-id-range"
                  onChange={handleMinChange}
                />
              </label>
            </div>

            <div className="range-container">
              <label htmlFor="max-id-range">
                {il18n.max}
                <input
                  type="range"
                  min={selectedMin}
                  max="10279"
                  placeholder="max"
                  value={selectedMax}
                  id="max-id-range"
                  onChange={handleMaxChange}
                />
              </label>
            </div>
          </div>

          <div className="selected-range-display">
            <input
              type="number"
              id="min-display"
              max={selectedMax}
              value={selectedMin}
              onChange={handleMinChange}
            />
            -
            <input
              type="number"
              id="max-display"
              min={selectedMin}
              value={selectedMax}
              onChange={handleMaxChange}
            />
          </div>

          <h3>{il18n.filter_by_type}</h3>
          <div className="type-selector-container">
            <select
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">{il18n.all}</option>
              <option value="normal">Normal</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="electric">Electric</option>
              <option value="grass">Grass</option>
              <option value="ice">Ice</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
              <option value="shadow">Shadow</option>
              <option value="unknown">Unknown</option>
            </select>

            <div className="buttons-container">
              <button onClick={handleFilter}>{il18n.filter}</button>
              <button onClick={resetSelection}>{il18n.reset_filters}</button>
            </div>
          </div>
        </div>
        {errors &&
          errors.map((error, index) => (
            <p key={index} className="error">
              {error}
            </p>
          ))}
      </div>
    </Modal>
  )
}
