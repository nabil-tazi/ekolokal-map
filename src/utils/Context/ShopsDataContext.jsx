import { useState, createContext, useRef, useReducer, useEffect } from 'react'
import { INITIAL_SCOPE, SCOPES } from '../Configuration/ScopeConfig'

import { TYPES } from '../Configuration/TypeConfig'

import { updateShops } from '../maputils'

export const ShopsDataContext = createContext()

export const ShopsDataProvider = ({ children }) => {
    const mapRef = useRef()

    const [currentScope, setScope] = useState({
        ...INITIAL_SCOPE,
        DATA: [],
    })

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

    const [favoriteShops, saveFavoriteShops] = useState(
        localStorage.getItem('favorites') != null
            ? JSON.parse(localStorage.getItem('favorites'))
            : []
    )

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteShops))
    }, [favoriteShops])

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
                break
            default:
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
                initScope,
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

                initDisplayedShops: () => {
                    dispatch({
                        type: ACTIONS.INIT,
                    })
                },
            }}
        >
            {children}
        </ShopsDataContext.Provider>
    )
}
