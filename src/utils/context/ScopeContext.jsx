import { useState, createContext, useRef, useReducer } from 'react'
import { SCOPES } from '../configuration/ScopeConfig'
import { TYPES } from '../configuration/TypeConfig'

import { updateShops } from '../maputils'

export const ScopeContext = createContext()

export const ScopeProvider = ({ children }) => {
    const mapRef = useRef()

    const [viewMode, setViewMode] = useState(SCOPES.NONE)
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

    const [filteredType, setFilteredType] = useState(TYPES.ALL)
    const updateType = (newType) => {
        setFilteredType(newType)
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
            viewMode: viewMode,
            localize: false,
            openModal: false,
        }

        switch (action.type) {
            case ACTIONS.MOVE_MAP:
                params.map = action.param
                break
            case ACTIONS.CHANGE_SCOPE:
                params.viewMode = action.param
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

    //Comme viewMode sera utilisé par le ScopeContext et le Menu/Category/Type Context, il devrait être son propre Hook,
    //et les deux contextes le consomment
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
                ACTIONS,
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
        </ScopeContext.Provider>
    )
}
