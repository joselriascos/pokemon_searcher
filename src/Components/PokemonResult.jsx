import { useState } from 'react'
import { ThreeDot } from 'react-loading-indicators'
import { FALLBACK_IMG, POKEMON_IMG_PREFIX } from '../utils/consts'

export function PokemonResult({ result, theme, onClick }) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgError, setImgError] = useState(false)
  const { pokemon } = result
  const { name, url } = pokemon ? pokemon : result
  const id =
    result.id ||
    url?.slice(url.lastIndexOf('pokemon') + 8, url.lastIndexOf('/'))
  const imgUrl = imgError ? FALLBACK_IMG : `${POKEMON_IMG_PREFIX}${id}.png`

  return (
    <div
      className={`result ${theme === 'dark' ? 'dark-mode' : ''}`}
      onClick={() => onClick(id)}
    >
      {isLoading && (
        <div className="loading-container">
          <ThreeDot
            variant="bounce"
            size="medium"
            text=""
            textColor=""
            color={theme === 'dark' ? '#000' : '#fff'}
          />
        </div>
      )}
      <img
        src={imgUrl}
        alt={`${name} sprite`}
        onLoad={() => setIsLoading(false)}
        onError={() => setImgError(true)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <h3>{name}</h3>
      <h4>{`# ${id}`}</h4>
    </div>
  )
}
