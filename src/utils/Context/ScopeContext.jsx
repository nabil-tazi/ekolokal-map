import { createContext, useState, useEffect } from 'react'
import { INITIAL_SCOPE, SCOPES } from '../Configuration/ScopeConfig'
import { useFetch } from '../Hooks/Fetch'
import { useLocalStorage } from '../Hooks/LocalStorage'
import { recursiveCategoryFilter } from '../FiltersFunctions/maputils'
import { TYPES } from '../Configuration/TypeConfig'

import { isContained } from '../FiltersFunctions/maputils'

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

    const { isLoadingFetch, fetchedData } = useFetch(
        `https://ekolokal.com/wp-json/wl/v1/shops`
    )

    useEffect(() => {
        initAllShops(fetchedData)
        initAllEvents(recursiveCategoryFilter([TYPES.EVENT], fetchedData))
        initScope(fetchedData)
        console.log('init scope and data')
    }, [fetchedData])

    const [isLoadingStorage, favoriteShops, saveFavoriteShops] =
        useLocalStorage('favorites', [])

    const isLoading = isLoadingStorage || isLoadingFetch

    function isFavorite(shop) {
        return isContained(shop, favoriteShops)
    }

    // function isFavorite(shop) {
    //     return favoriteShops
    //         ? favoriteShops.some((favshop) => favshop.id === shop.id)
    //         : false
    // }

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
                fetchedData,
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
                isLoading,
            }}
        >
            {children}
        </ScopeContext.Provider>
    )
}
