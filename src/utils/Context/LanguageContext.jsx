import { createContext, useState } from 'react'
import { LANGUAGES } from '../Configuration/LanguagesConfig'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setLanguage] = useState(LANGUAGES.JAPANESE)
    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}
