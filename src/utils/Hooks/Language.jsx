import { useContext } from 'react'
import { LanguageContext } from '../Context/LanguageContext'

export function useLanguage() {
    const { currentLanguage, setLanguage } = useContext(LanguageContext)
    return { currentLanguage, setLanguage }
}
