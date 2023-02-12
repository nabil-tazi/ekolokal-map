import { createContext, useState, useEffect } from 'react'
import { INITIAL_SCOPE, SCOPES } from '../Configuration/ScopeConfig'
import { useLocalStorage } from '../Hooks/LocalStorage'

export const ScopeContext = createContext()

export const ScopeProvider = ({ children }) => {
    const [currentScope, setScope] = useState({
        ...INITIAL_SCOPE,
        DATA: [],
    })

    function initScope(initialData) {
        setScope({ ...INITIAL_SCOPE, DATA: initialData })
    }

    const [allShops, setAllShops] = useState([])
    const initAllShops = (data) => {
        setAllShops(data)
    }

    const [allEvents, setAllEvents] = useState([])
    const initAllEvents = (data) => {
        setAllEvents(data)
    }

    const [favoriteShops, saveFavoriteShops] = useLocalStorage('favorites', [])

    console.log('ScopeContext')
    console.log(favoriteShops)

    // const [favoriteShops, setfav] = useState(storedFavorites)

    // const [favoriteShops, setfav] = useState(
    //     localStorage.getItem('favorites') != null
    //         ? JSON.parse(localStorage.getItem('favorites'))
    //         : []
    // )

    // function saveFavoriteShops(newfav) {
    //     setfav(newfav)
    // }

    function isFavorite(shop) {
        return favoriteShops
            ? favoriteShops.some((favshop) => favshop.id === shop.id)
            : false
    }

    function switchScope(clickedScope) {
        switch (clickedScope.ID) {
            case SCOPES.NONE:
                clickedScope.DATA = allShops
                break
            case SCOPES.BROWSE.ID:
                clickedScope.DATA = allShops
                break
            case SCOPES.EVENTS.ID:
                clickedScope.DATA = allEvents
                break
            case SCOPES.FAVORITES.ID:
                clickedScope.DATA = favoriteShops
                break
            default:
                clickedScope.DATA = allShops
        }
        console.log(clickedScope)
        setScope(clickedScope)
    }
    return (
        <ScopeContext.Provider
            value={{
                currentScope,
                switchScope,
                initScope,
                allShops,
                initAllShops,
                allEvents,
                initAllEvents,
                favoriteShops,
                saveFavoriteShops,
                isFavorite,
            }}
        >
            {children}
        </ScopeContext.Provider>
    )
}
