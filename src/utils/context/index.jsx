import { useState, createContext } from 'react'

export const ScopeContext = createContext()

export const ScopeProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('')
    const switchViewMode = (newViewMode) => {
        setViewMode(newViewMode)
    }

    return (
        <ScopeContext.Provider value={{ viewMode, switchViewMode }}>
            {children}
        </ScopeContext.Provider>
    )
}
