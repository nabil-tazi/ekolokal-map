import { createContext, useState } from 'react'
import { LANGUAGES } from '../Configuration/LanguagesConfig'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setLanguage] = useState(
        (
            (navigator.languages && navigator.languages[0]) ||
            navigator.language ||
            navigator.userLanguage
        ).includes('ja')
            ? LANGUAGES.JAPANESE
            : LANGUAGES.ENGLISH
    )

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}
