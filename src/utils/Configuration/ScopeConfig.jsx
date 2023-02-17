import eat from '../../assets/eat.png'
import shop from '../../assets/shop.png'
import discover from '../../assets/discover.png'
import favorites from '../../assets/favorites.png'

export const SCOPES = {
    NONE: {
        ID: '',
        IMG: null,
        LOCALIZED: true,
        ENGLISH: '',
    },
    EATING: {
        ID: 'eating',
        IMG: eat,
        LOCALIZED: true,
        ENGLISH: 'Eat',
        JAPANESE: 'Eat',
    },
    SHOPPING: {
        ID: 'shopping',
        IMG: shop,
        LOCALIZED: true,
        ENGLISH: 'Shop',
        JAPANESE: 'Shop',
    },
    DISCOVER: {
        ID: 'discover',
        IMG: discover,
        LOCALIZED: false,
        ENGLISH: 'Discover',
        JAPANESE: 'Discover',
    },
    FAVORITES: {
        ID: 'favorites',
        IMG: favorites,
        LOCALIZED: false,
        ENGLISH: 'Favorites',
        JAPANESE: 'Favorites',
    },
}

export const ScopesMenu = [
    SCOPES.EATING,
    SCOPES.SHOPPING,
    SCOPES.DISCOVER,
    SCOPES.FAVORITES,
]

export const INITIAL_SCOPE = SCOPES.NONE
