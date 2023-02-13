import {
    useState,
    createContext,
    useRef,
    useReducer,
    useContext,
    useEffect,
} from 'react'

import { UserInterfaceContext } from './UserInterfaceContext'
import { ScopeContext } from './ScopeContext'

import { TYPES } from '../Configuration/TypeConfig'

import {
    filterShopsBySearch,
    recursiveCategoryFilter,
    filterShopsByMapBounds,
    alphabetical,
    localizeShops,
} from '../FiltersFunctions/maputils'

export const ShopsDataContext = createContext()

export const ShopsDataProvider = ({ children }) => {
    const mapRef = useRef()

    const { resetLazyLoad, openModal } = useContext(UserInterfaceContext)
    const { fetchedData, currentScope } = useContext(ScopeContext)

    const [research, setResearch] = useState('')
    const [filteredCategories, saveFilteredCategories] = useState([])
    const [filteredType, saveFilteredType] = useState(TYPES.ALL)

    const noResearch = research === ''

    const initialState = {
        displayedShops: [],
    }

    useEffect(() => {
        dispatch({
            type: ACTIONS.INIT,
        })
    }, [fetchedData])

    function updateShops({
        research,
        filteredCategories,
        filteredType,
        map,
        scope,
        localize,
        openSingleResultModal,
    }) {
        const filteredShops = filterShopsBySearch(
            research,
            recursiveCategoryFilter(
                [...filteredCategories, filteredType],
                filterShopsByMapBounds(map, scope, research)
            )
        )
            .sort(alphabetical)
            .slice(0, 100)

        openSingleResultModal && filteredShops.length === 1
            ? openModal(map, filteredShops[0], 16)
            : localize && localizeShops(filteredShops, map)

        return filteredShops
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
            openSingleResultModal: false,
        }

        switch (action.type) {
            case ACTIONS.MOVE_MAP:
                params.map = action.param
                break
            case ACTIONS.CHANGE_SCOPE:
                params.scope = action.param
                params.localize = true
                break
            case ACTIONS.CHANGE_SEARCH_INPUT:
                params.research = action.param
                params.localize = true
                params.openSingleResultModal = true
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
