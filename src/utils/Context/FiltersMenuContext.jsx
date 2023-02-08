import { createContext, useReducer } from 'react'
import { TYPES } from '../Configuration/TypeConfig'
import { CATEGORIES } from '../Configuration/CategoriesConfig'

export const FiltersMenuContext = createContext()

export const FiltersMenuProvider = ({ children }) => {
    const initialStateTypes = {
        TypesMenu: [
            TYPES.ALL,
            TYPES.RESTAURANTCAFE,
            TYPES.SUPERMARKET,
            TYPES.LOCALSTORE,
        ],
    }

    const scopes = {
        NONE: '',
        BROWSE: 'browse',
        EVENT: 'events',
        FAVORITES: 'favorites',
    }
    const reducerTypes = (state, action) => {
        // console.log(action.scope)

        switch (action.scope.ID) {
            case scopes.NONE.ID:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            case scopes.BROWSE.ID:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            case scopes.EVENT.ID:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            case scopes.FAVORITES.ID:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            default:
                return state
        }
    }

    const [stateTypes, dispatchTypes] = useReducer(
        reducerTypes,
        initialStateTypes
    )

    const initialStateCategories = {
        CategoriesMenu: [
            CATEGORIES.PLANTBASED,
            CATEGORIES.ORGANIC,
            CATEGORIES.FAIRTRADE,
            CATEGORIES.ZEROWASTE,
            // CATEGORIES.TAKEOUT,
        ],
    }

    const reducerCategories = (state, action) => {
        console.log(action.type)
        switch (action.type) {
            case TYPES.ALL:
                return {
                    CategoriesMenu: [
                        CATEGORIES.PLANTBASED,
                        CATEGORIES.ORGANIC,
                        CATEGORIES.FAIRTRADE,
                        CATEGORIES.ZEROWASTE,
                        // CATEGORIES.TAKEOUT,
                    ],
                }
            case TYPES.RESTAURANTCAFE:
                return {
                    CategoriesMenu: [
                        CATEGORIES.PLANTBASED,
                        CATEGORIES.ORGANIC,
                        CATEGORIES.FAIRTRADE,
                        CATEGORIES.ZEROWASTE,
                        CATEGORIES.TAKEOUT,
                    ],
                }
            default:
                return {
                    CategoriesMenu: [
                        CATEGORIES.PLANTBASED,
                        CATEGORIES.ORGANIC,
                        CATEGORIES.FAIRTRADE,
                        CATEGORIES.ZEROWASTE,
                        // CATEGORIES.TAKEOUT,
                    ],
                }
        }
    }

    const [stateCategories, dispatchCategories] = useReducer(
        reducerCategories,
        initialStateCategories
    )

    return (
        <FiltersMenuContext.Provider
            value={{
                TypesMenu: stateTypes.TypesMenu,
                updateTypesMenu: (scope) => {
                    dispatchTypes({
                        scope: scope,
                    })
                },
                CategoriesMenu: stateCategories.CategoriesMenu,
                updateCategoriesMenu: (type) => {
                    dispatchCategories({
                        type: type,
                    })
                },
            }}
        >
            {children}
        </FiltersMenuContext.Provider>
    )
}
