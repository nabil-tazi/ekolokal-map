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
        JAPANESE: '食べる',
    },
    SHOPPING: {
        ID: 'shopping',
        IMG: shop,
        LOCALIZED: false,
        ENGLISH: 'Shop',
        JAPANESE: 'お買い物する',
    },
    DISCOVER: {
        ID: 'discover',
        IMG: discover,
        LOCALIZED: false,
        ENGLISH: 'Discover',
        JAPANESE: '出会う',
    },
    FAVORITES: {
        ID: 'favorites',
        IMG: favorites,
        LOCALIZED: false,
        ENGLISH: 'Favorites',
        JAPANESE: 'お気に入り',
    },
}

export const ScopesMenu = [
    SCOPES.EATING,
    SCOPES.SHOPPING,
    SCOPES.DISCOVER,
    SCOPES.FAVORITES,
]

export const INITIAL_SCOPE = SCOPES.NONE
