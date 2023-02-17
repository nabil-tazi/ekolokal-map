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

    const [allDiscovers, setAllDiscovers] = useState([])
    const initAllDiscovers = (data) => {
        setAllDiscovers(data)
    }

    const [allEatingShops, setAllEatingShops] = useState([])
    const initAllEatingShops = (data) => {
        setAllEatingShops(data)
    }

    const [allShoppingShops, setAllShoppingShops] = useState([])
    const initAllShoppingShops = (data) => {
        setAllShoppingShops(data)
    }

    const { isLoadingFetch, fetchedData } = useFetch(
        `https://ekolokal.com/wp-json/wl/v1/shops`
    )

    useEffect(() => {
        initAllShops(fetchedData)
        initAllDiscovers(recursiveCategoryFilter([TYPES.DISCOVER], fetchedData))
        initAllEatingShops(
            recursiveCategoryFilter([TYPES.RESTAURANTCAFE], fetchedData)
        )
        initAllShoppingShops([
            ...new Set([
                ...recursiveCategoryFilter([TYPES.SUPERMARKET], fetchedData),
                ...recursiveCategoryFilter([TYPES.LOCALSTORE], fetchedData),
            ]),
        ])
        initScope(fetchedData)
        console.log('init scope and data')
    }, [fetchedData])

    const [isLoadingStorage, favoriteShops, saveFavoriteShops] =
        useLocalStorage('favorites', [])

    const isLoading = isLoadingStorage || isLoadingFetch

    function isFavorite(shop) {
        return isContained(shop, favoriteShops)
    }

    function switchScope(clickedScope) {
        switch (clickedScope.ID) {
            case SCOPES.NONE:
                clickedScope.DATA = allShops
                break
            case SCOPES.EATING.ID:
                clickedScope.DATA = allEatingShops
                break
            case SCOPES.SHOPPING.ID:
                clickedScope.DATA = allShoppingShops
                break
            case SCOPES.DISCOVER.ID:
                clickedScope.DATA = allDiscovers
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
