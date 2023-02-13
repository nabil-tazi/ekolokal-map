import { useEffect, useState } from 'react'

export const useLocalStorage = (key, defaultValue) => {
    const [isLoadingStorage, setLoadingStorage] = useState(true)

    const [value, setValue] = useState(() => {
        setLoadingStorage(true)
        try {
            console.log('reading')

            const saved = localStorage.getItem(key)
            if (saved !== null) {
                return JSON.parse(saved)
            }
            return defaultValue
        } catch {
            return defaultValue
        } finally {
            setLoadingStorage(false)
        }
    })

    useEffect(() => {
        const rawValue = JSON.stringify(value)
        localStorage.setItem(key, rawValue)
    }, [value])

    return [isLoadingStorage, value, setValue]
}
