import './InfoModal.css'
import Modal from 'react-modal'
import { ThreeDot } from 'react-loading-indicators'
import { useAppContext } from '../../hooks/useAppContext.js'
import { NextImage, PrevImage } from '../Icons.jsx'
import { useInfoModal } from '../../hooks/useInfoModal.js'
import { FALLBACK_IMG, IL18N } from '../../utils/consts.js'

Modal.setAppElement('#root')

export default function InfoModal({ isOpen, onClose, id }) {
  const { data, actualImage, nextImage, prevImage } = useInfoModal({
    id,
    isOpen,
  })

  const { theme, lang } = useAppContext()
  const il18n = IL18N[lang]

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="info-modal-content"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      {!data ? (
        <div className="loading-container">
          <ThreeDot
            variant="bounce"
            size="medium"
            text=""
            textColor=""
            color={theme === 'dark' ? '#fff' : '#000'}
          />
        </div>
      ) : (
        <div id="info-container">
          <span className="close-btn" onClick={onClose}>
            x
          </span>
          <div id="img-container">
            <h3>
              <span id="pokemon-name">{data?.name.toUpperCase()}</span>
              <span id="pokemon-id">#{id}</span>
            </h3>
            <p>
              <span id="weight">
                {il18n.weight}: {data?.weight}
              </span>
              <span id="height">
                {il18n.height}: {data?.height}
              </span>
            </p>
            <button className="next-img-container" onClick={nextImage}>
              <NextImage />
            </button>
            <button className="prev-img-container" onClick={prevImage}>
              <PrevImage />
            </button>

            <div id="sprite-container">
              <img
                src={
                  data?.sprites[actualImage]
                    ? data?.sprites[actualImage]
                    : FALLBACK_IMG
                }
                alt={`${data?.name} sprite`}
                id="sprite"
              />
            </div>
            <div id="types">
              {data?.types?.map((element) => {
                const type = element.type.name
                return (
                  <span key={type} className={`type ${type}`}>
                    {type.toUpperCase()}
                  </span>
                )
              })}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>{il18n.base}</th>
                <th>{il18n.stats}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HP:</td>
                <td id="hp">
                  {data.stats.length
                    ? data.stats[0].base_stat
                    : il18n.not_found}
                </td>
              </tr>
              <tr>
                <td>{il18n.attack}:</td>
                <td id="attack">
                  {data.stats.length
                    ? data.stats[1].base_stat
                    : il18n.not_found}
                </td>
              </tr>
              <tr>
                <td>{il18n.defense}:</td>
                <td id="defense">
                  {data.stats.length
                    ? data.stats[2].base_stat
                    : il18n.not_found}
                </td>
              </tr>
              <tr>
                <td>{il18n.sp_attack}:</td>
                <td id="special-attack">
                  {data.stats.length
                    ? data.stats[3].base_stat
                    : il18n.not_found}
                </td>
              </tr>
              <tr>
                <td>{il18n.sp_defense}:</td>
                <td id="special-defense">
                  {data.stats.length
                    ? data.stats[4].base_stat
                    : il18n.not_found}
                </td>
              </tr>
              <tr>
                <td>{il18n.speed}:</td>
                <td id="speed">
                  {data.stats.length
                    ? data.stats[5].base_stat
                    : il18n.not_found}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  )
}
