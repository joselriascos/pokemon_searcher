import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export function AppContextProvider({ children }) {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'dark'
  )
  const [lang, setLang] = useState(window.localStorage.getItem('lang') || 'en')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const changeLang = (lang) => {
    setLang(lang)
  }

  const changeIsModalOpen = (newModalState) => {
    setIsModalOpen(newModalState)
  }

  useEffect(() => {
    window.localStorage.setItem('theme', theme)
    window.localStorage.setItem('lang', lang)

    return () => {
      window.localStorage.removeItem('theme')
      window.localStorage.removeItem('lang')
    }
  }, [theme, lang])

  return (
    <AppContext.Provider
      value={{
        lang,
        changeLang,
        theme,
        toggleTheme,
        isModalOpen,
        changeIsModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
