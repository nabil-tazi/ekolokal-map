import { useState, createContext, useRef, useReducer, useContext } from 'react'

import { UserInterfaceContext } from './UserInterfaceContext'
import { ScopeContext } from './ScopeContext'

import { TYPES } from '../Configuration/TypeConfig'

import { updateShops } from '../maputils'

export const ShopsDataContext = createContext()

export const ShopsDataProvider = ({ children }) => {
    const { resetLazyLoad } = useContext(UserInterfaceContext)
    const { currentScope } = useContext(ScopeContext)

    const mapRef = useRef()

    const [research, setResearch] = useState('')
    const [filteredCategories, saveFilteredCategories] = useState([])
    const [filteredType, saveFilteredType] = useState(TYPES.ALL)

    const noResearch = research === ''

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
                resetLazyLoad()
                break
            case ACTIONS.CHANGE_TYPE:
                params.filteredType = action.param
                resetLazyLoad()
                break
            case ACTIONS.CHANGE_CATEGORIES:
                params.filteredCategories = action.param
                resetLazyLoad()
                break
            case ACTIONS.CHANGE_FAVORITES:
                params.favoriteShops = action.param
                resetLazyLoad()
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
                research,
                setResearch,
                filteredCategories,
                saveFilteredCategories,
                filteredType,
                saveFilteredType,
                ACTIONS,
                noResearch,
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
