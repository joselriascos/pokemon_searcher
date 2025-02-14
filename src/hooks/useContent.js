import { useContext } from 'react'
import { ContentContext } from '../contexts/ContentContext'

export function useContent() {
  const useContent = useContext(ContentContext)

  return useContent
}
