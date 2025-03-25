import { useState, useEffect } from 'react'
import { API_POKEMON_INFO_PREFIX } from '../utils/consts.js'
import { fetchData } from '../utils/functions.js'
import { useDisableScroll } from './useDisableScroll.js'
import { useFilters } from './useFilters.js'
import { useSearch } from './useSearch.js'

export function useInfoModal({ id, isOpen, onClose }) {
  const [data, setData] = useState(null)
  const [sprites, setSprites] = useState([])
  const [actualImage, setActualImage] = useState('')
  const { setFilters } = useFilters()
  const { resetSearch } = useSearch()

  useDisableScroll({ isOpen })

  useEffect(() => {
    if (id) {
      const url = API_POKEMON_INFO_PREFIX + id
      try {
        fetchData(url).then((newData) => {
          const { sprites } = newData

          // deletes if "other" or "versions" in spriteKeys or if sprite is null
          delete sprites['other']
          delete sprites['versions']

          const filteredSprites = Object.keys(sprites).filter(
            (key) => sprites[key] !== null
          )

          setSprites(filteredSprites)
          setActualImage(sprites.front_default ? 'front_default' : sprites[0])
          setData(newData)
        })
      } catch (error) {
        throw new Error('Error fetching data: ' + error)
      }
    }
    return () => setData(null)
  }, [id])

  const changeImage = (next) => {
    if (sprites) {
      const currentKey = sprites.indexOf(actualImage)
      const newKey = next
        ? (currentKey + 1) % sprites.length
        : (currentKey - 1 + sprites.length) % sprites.length
      setActualImage(sprites[newKey])
    }
  }

  const handleClickOnType = (type) => {
    setFilters((prevFilters) => ({ ...prevFilters, type }))
    resetSearch()
    onClose()
  }

  const nextImage = () => changeImage(true)
  const prevImage = () => changeImage(false)

  return { data, actualImage, nextImage, prevImage, handleClickOnType }
}
