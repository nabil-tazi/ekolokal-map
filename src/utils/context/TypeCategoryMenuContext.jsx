import { createContext, useReducer } from 'react'
import { TYPES } from '../configuration/TypeConfig'
import { CATEGORIES } from '../configuration/CategoriesConfig'

export const TypeCategoryContext = createContext()

export const TypeCategoryProvider = ({ children }) => {
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
        console.log(action.scope)

        switch (action.scope) {
            case scopes.NONE:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            case scopes.BROWSE:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            case scopes.EVENT:
                return {
                    TypesMenu: [
                        TYPES.ALL,
                        TYPES.RESTAURANTCAFE,
                        TYPES.SUPERMARKET,
                        TYPES.LOCALSTORE,
                    ],
                }
            case scopes.FAVORITES:
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
        <TypeCategoryContext.Provider
            value={{
                TypesMenu: stateTypes.TypesMenu,
                setTypesMenu: (scope) => {
                    dispatchTypes({
                        scope: scope,
                    })
                },
                CategoriesMenu: stateCategories.CategoriesMenu,
                setCategoriesMenu: (type) => {
                    dispatchCategories({
                        type: type,
                    })
                },
            }}
        >
            {children}
        </TypeCategoryContext.Provider>
    )
}
