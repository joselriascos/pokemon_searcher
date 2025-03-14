import './InfoModal.css'
import Modal from 'react-modal'
import { ThreeDot } from 'react-loading-indicators'
import { useAppContext } from '../../hooks/useAppContext.js'
import { NextImage, PrevImage } from '../Icons.jsx'
import { useInfoModal } from '../../hooks/useInfoModal.js'
import { FALLBACK_IMG, IL18N } from '../../utils/consts.js'
import { StatDisplay } from './StatDisplay.jsx'

Modal.setAppElement('#root')

export default function InfoModal({ isOpen, onClose, id }) {
  const { data, actualImage, nextImage, prevImage } = useInfoModal({
    id,
    isOpen,
  })

  const stats = data?.stats.length ? data.stats : []
  const maxStat = Math.max(...stats?.map((stat) => stat.base_stat))
  const maxLimit = Math.max(maxStat, 100)
  const statBarsSize = stats
    .map((stat) => stat.base_stat)
    .map((stat) => (stat / maxLimit) * 100)

  const { theme, lang } = useAppContext()
  const il18n = IL18N[lang]

  const statsLabels = [
    'HP',
    il18n.attack,
    il18n.defense,
    il18n.sp_attack,
    il18n.sp_defense,
    il18n.speed,
  ]

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`info-modal-content ${!data ? 'loading' : ''}`}
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
          <div className="stats-container">
            {/* <h3 className="stats">{il18n.base_stats}</h3> */}
            {stats.map((_, index) => {
              return (
                <StatDisplay
                  label={statsLabels[index]}
                  value={stats[index].base_stat}
                  barSize={statBarsSize[index]}
                  key={index}
                />
              )
            })}
          </div>
        </div>
      )}
    </Modal>
  )
}
