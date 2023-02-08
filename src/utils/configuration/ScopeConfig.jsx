import browse from '../../assets/browse.png'
import events from '../../assets/temporary.png'
import favorites from '../../assets/favorites.png'

export const SCOPES = {
    NONE: {
        ID: '',
        IMG: null,
        LOCALIZED: true,
        ENGLISH: '',
    },
    BROWSE: {
        ID: 'browse',
        IMG: browse,
        LOCALIZED: true,
        ENGLISH: 'Browse',
    },
    EVENTS: {
        ID: 'events',
        IMG: events,
        LOCALIZED: false,
        ENGLISH: 'Events',
    },
    FAVORITES: {
        ID: 'favorites',
        IMG: favorites,
        LOCALIZED: false,
        ENGLISH: 'Favorites',
    },
}

export const ScopesMenu = [SCOPES.BROWSE, SCOPES.EVENTS, SCOPES.FAVORITES]

export const INITIAL_SCOPE = SCOPES.NONE
