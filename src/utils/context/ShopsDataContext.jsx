import { useState, createContext, useRef, useReducer } from 'react'
import { SCOPES } from '../configuration/ScopeConfig'
import { TYPES } from '../configuration/TypeConfig'

import { updateShops } from '../maputils'

export const ShopsDataContext = createContext()

export const ShopsDataProvider = ({ children }) => {
    const mapRef = useRef()

    const [currentScope, switchScope] = useState(SCOPES.NONE)

    const [allShops, setAllShops] = useState([])
    const initAllShops = (data) => {
        setAllShops(data)
    }

    const [allEvents, setAllEvents] = useState([])
    const initAllEvents = (data) => {
        setAllEvents(data)
    }

    const [favoriteShops, saveFavoriteShops] = useState(
        localStorage.getItem('favorites') != null
            ? JSON.parse(localStorage.getItem('favorites'))
            : []
    )
    const [research, setResearch] = useState('')
    const [filteredCategories, saveFilteredCategories] = useState([])
    const [filteredType, saveFilteredType] = useState(TYPES.ALL)

    const noResearch = research === ''

    function isFavorite(shop) {
        return favoriteShops.some((favshop) => favshop.id === shop.id)
    }

    const initialState = {
        displayedShops: [],
    }

    const ACTIONS = {
        MOVE_MAP: 'MOVE_MAP',
        CHANGE_SCOPE: 'CHANGE_SCOPE',
        CHANGE_SEARCH_INPUT: 'CHANGE_SEARCH_INPUT',
        CHANGE_TYPE: 'CHANGE_TYPE',
        CHANGE_CATEGORIES: 'CHANGE_CATEGORIES',
        CHANGE_FAVORITES: 'CHANGE_FAVORITES',
        INIT: 'INIT',
    }

    const reducer = (state, action) => {
        const params = {
            allShops: allShops,
            allEvents: allEvents,
            favoriteShops: favoriteShops,
            research: research,
            filteredCategories: filteredCategories,
            filteredType: filteredType,
            map: mapRef.current,
            scope: currentScope,
            localize: false,
            openModal: false,
        }

        switch (action.type) {
            case ACTIONS.MOVE_MAP:
                params.map = action.param
                break
            case ACTIONS.CHANGE_SCOPE:
                params.scope = action.param
                break
            case ACTIONS.CHANGE_SEARCH_INPUT:
                params.research = action.param
                params.localize = true
                params.openModal = true
                break
            case ACTIONS.CHANGE_TYPE:
                params.filteredType = action.param
                break
            case ACTIONS.CHANGE_CATEGORIES:
                params.filteredCategories = action.param
                break
            case ACTIONS.CHANGE_FAVORITES:
                params.favoriteShops = action.param
                break
            case ACTIONS.INIT:
                params.allShops = action.allShops
                params.allEvents = action.allEvents
                params.favoriteShops = action.favorites
                params.research = ''
                break
        }

        return {
            displayedShops: updateShops(params),
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    //Comme scope sera utilisé par le ShopsDataContext et le Menu/Category/Type Context, il devrait être son propre Hook,
    //et les deux contextes le consomment
    return (
        <ShopsDataContext.Provider
            value={{
                mapRef,
                currentScope,
                switchScope,
                allShops,
                initAllShops,
                allEvents,
                initAllEvents,
                favoriteShops,
                saveFavoriteShops,
                research,
                setResearch,
                filteredCategories,
                saveFilteredCategories,
                filteredType,
                saveFilteredType,
                ACTIONS,
                noResearch,
                isFavorite,
                displayedShops: state.displayedShops,

                updateDisplayedShops: (actionType, param) => {
                    dispatch({ type: actionType, param: param })
                },

                initDisplayedShops: (allShops, allEvents, favorites) => {
                    dispatch({
                        type: ACTIONS.INIT,
                        allShops: allShops,
                        allEvents: allEvents,
                        favorites: favorites,
                    })
                },
            }}
        >
            {children}
        </ShopsDataContext.Provider>
    )
}
