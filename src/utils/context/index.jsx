import { useState, createContext, useRef, useReducer } from 'react'

import { updateShops } from '../../utils/maputils'

export const ScopeContext = createContext()

export const ScopeProvider = ({ children }) => {
    const mapRef = useRef()

    const [viewMode, setViewMode] = useState('')
    const switchViewMode = (newViewMode) => {
        setViewMode(newViewMode)
    }

    const [allShops, setAllShops] = useState([])
    const initAllShops = (data) => {
        setAllShops(data)
    }

    const [allEvents, setAllEvents] = useState([])
    const initAllEvents = (data) => {
        setAllEvents(data)
    }

    const [favoriteShops, setFavoriteShops] = useState(
        localStorage.getItem('favorites') != null
            ? JSON.parse(localStorage.getItem('favorites'))
            : []
    )
    const updateFavoriteShops = (newFavorites) => {
        setFavoriteShops(newFavorites)
    }

    const [research, setResearch] = useState('')
    const updateResearch = (newResearch) => {
        setResearch(newResearch)
    }

    const [filteredCategories, setFilteredCategories] = useState([])
    const updateCategories = (newCategories) => {
        setFilteredCategories(newCategories)
    }

    const [filteredType, setFilteredType] = useState('all')
    const updateType = (newType) => {
        setFilteredType(newType)
    }

    const initialState = {
        // allShops: allShops,
        // allEvents: allEvents,
        // favoriteShops: favoriteShops,
        // research: research,
        // categories: filteredCategories,
        // type: filteredType,
        // mapRef: mapRef,
        // viewMode: viewMode,
        displayedShops: [],
    }

    const actions = {
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
            viewMode: viewMode,
            localize: false,
            openModal: false,
        }

        switch (action.actionType) {
            case actions.MOVE_MAP:
                params.map = action.map
                break
            case actions.CHANGE_SCOPE:
                params.viewMode = action.scope
                break
            case actions.CHANGE_SEARCH_INPUT:
                params.research = action.researchTerms
                params.localize = true
                params.openModal = true
                break
            case actions.CHANGE_TYPE:
                params.filteredType = action.type
                break
            case actions.CHANGE_CATEGORIES:
                params.filteredCategories = action.categories
                break
            case actions.CHANGE_FAVORITES:
                params.favoriteShops = action.favorites
                break
            case actions.INIT:
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

    return (
        <ScopeContext.Provider
            value={{
                mapRef,
                viewMode,
                switchViewMode,
                allShops,
                initAllShops,
                allEvents,
                initAllEvents,
                favoriteShops,
                updateFavoriteShops,
                research,
                updateResearch,
                filteredCategories,
                updateCategories,
                filteredType,
                updateType,
                displayedShops: state.displayedShops,
                inputSearch: (input) => {
                    dispatch({
                        actionType: actions.CHANGE_SEARCH_INPUT,
                        researchTerms: input,
                    })
                },
                moveMap: (map) => {
                    dispatch({
                        actionType: actions.MOVE_MAP,
                        map: map,
                    })
                },
                changeType: (type) => {
                    dispatch({ actionType: actions.CHANGE_TYPE, type: type })
                },
                changeCategories: (categories) => {
                    dispatch({
                        actionType: actions.CHANGE_CATEGORIES,
                        categories: categories,
                    })
                },
                changeScope: (scope) => {
                    dispatch({
                        actionType: actions.CHANGE_SCOPE,
                        scope: scope,
                    })
                },
                changeFavorites: (favorites) => {
                    dispatch({
                        actionType: actions.CHANGE_FAVORITES,
                        favorites: favorites,
                    })
                },
                init: (allShops, allEvents, favorites) => {
                    dispatch({
                        actionType: actions.INIT,
                        allShops: allShops,
                        allEvents: allEvents,
                        favorites: favorites,
                    })
                },
            }}
        >
            {children}
        </ScopeContext.Provider>
    )
}
