import { useState, useEffect } from 'react'
import { API_FCC_PREFIX } from '../utils/consts.js'
import { fetchData } from '../utils/functions.js'
import { useDisableScroll } from './useDisableScroll.js'

export function useInfoModal({ id, isOpen }) {
  const [data, setData] = useState(null)
  const [actualImage, setActualImage] = useState('front_default')

  useDisableScroll({ isOpen })

  useEffect(() => {
    if (id) {
      const url = API_FCC_PREFIX + id
      try {
        fetchData(url).then((newData) => setData(newData))
      } catch (error) {
        throw new Error('Error fetching data: ' + error)
      }
    }
    return () => setData(null)
  }, [id])

  const changeImage = (next) => {
    if (data?.sprites) {
      const spriteKeys = Object.keys(data.sprites)
      const currentKey = spriteKeys.indexOf(actualImage)
      const newKey = next
        ? (currentKey + 1) % spriteKeys.length
        : (currentKey - 1 + spriteKeys.length) % spriteKeys.length
      setActualImage(spriteKeys[newKey])
    }
  }

  const nextImage = () => changeImage(true)
  const prevImage = () => changeImage(false)

  return { data, actualImage, nextImage, prevImage }
}
