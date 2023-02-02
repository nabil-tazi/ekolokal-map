import Leaflet from 'leaflet'

import restaurantImg from '../assets/restaurant.png'
import localStoreImg from '../assets/local-store.png'
import supermarketImg from '../assets/supermarket.png'
import warningImg from '../assets/warning.png'
import favoriteImg from '../assets/loveMarker.png'
import { SCOPES } from './configuration/ScopeConfig'

export function toRad(Value) {
    return (Value * Math.PI) / 180
}

export function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371 // km
    var dLat = toRad(lat2 - lat1)
    var dLon = toRad(lon2 - lon1)
    var lat1 = toRad(lat1)
    var lat2 = toRad(lat2)

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return d
}

export function alphabetical(a, b) {
    let comparison = 0
    if (a.title > b.title) {
        comparison = 1
    } else if (a.title < b.title) {
        comparison = -1
    }
    return comparison
}

export function sortById(a, b) {
    let comparison = 0
    if (a.id > b.id) {
        comparison = 1
    } else if (a.id < b.id) {
        comparison = -1
    }
    return comparison
}

function filterShopsByMapBounds(bounds, shops) {
    // console.log(bounds)
    return shops.filter(
        (shop) =>
            parseFloat(shop.geolocation_lat[0]) > bounds.getSouthWest().lat &&
            parseFloat(shop.geolocation_lat[0]) < bounds.getNorthEast().lat &&
            parseFloat(shop.geolocation_long[0]) > bounds.getSouthWest().lng &&
            parseFloat(shop.geolocation_long[0]) < bounds.getNorthEast().lng
    )
}

export function updateMarkerFromBounds(bounds, center, allShops) {
    // function distanceToCenter(a, b) {
    //     const latA = parseFloat(a.geolocation_lat[0])
    //     const longA = parseFloat(a.geolocation_long[0])
    //     const latB = parseFloat(b.geolocation_lat[0])
    //     const longB = parseFloat(b.geolocation_long[0])

    //     const latCenter = center.lat
    //     const longCenter = center.lng

    //     let distanceAC = calcCrow(latA, longA, latCenter, longCenter)
    //     let distanceBC = calcCrow(latB, longB, latCenter, longCenter)

    //     let comparison = 0
    //     if (distanceAC > distanceBC) {
    //         comparison = 1
    //     } else if (distanceAC < distanceBC) {
    //         comparison = -1
    //     }
    //     return comparison
    // }

    // return filterShopsByMapBounds(
    //     bounds.pad(-0.9), //Remove the markers close to the edges (10%)
    //     filterShopsByMapBounds(bounds, allShops).sort(distanceToCenter) //Sort the markers by their distance to the center
    // )

    return filterShopsByMapBounds(bounds.pad(-0.9), allShops) //.sort(distanceToCenter) //Remove the markers close to the edges (10%)
}

export function localizeSearch(filteredShops, map) {
    if (filteredShops.length === 0) return
    map.fitBounds(getNewBounds(filteredShops), {
        paddingTopLeft: L.point(500, 200),
        paddingBottomRight: L.point(200, 0),
    })
}

export function initShopFromBounds(map, viewMode, research, shopList) {
    if (
        (viewMode === SCOPES.NONE || viewMode === SCOPES.BROWSE) &&
        research === ''
    )
        return updateMarkerFromBounds(
            map.getBounds(),
            map.getCenter(),
            shopList
        ).sort(alphabetical)
    else return shopList
}

export function updateShops2(
    allShops,
    allEvents,
    favoriteShops,
    research,
    categories,
    type,
    map,
    viewMode
) {
    const filteredShops = filterShopsBySearch(
        research,
        recursiveCategoryFilter(
            categories,
            filterByType(
                type,
                initShopFromBounds(
                    map,
                    viewMode,
                    research,
                    getAllShopsFromScope(
                        viewMode,
                        allShops,
                        favoriteShops,
                        allEvents
                    )
                )
            )
        )
    )
        .sort(alphabetical)
        .slice(0, 100)

    return filteredShops
}

export function updateShops({
    allShops,
    allEvents,
    favoriteShops,
    research,
    filteredCategories,
    filteredType,
    map,
    viewMode,
    localize,
}) {
    const filteredShops = filterShopsBySearch(
        research,
        recursiveCategoryFilter(
            filteredCategories,
            filterByType(
                filteredType,
                initShopFromBounds(
                    map,
                    viewMode,
                    research,
                    getAllShopsFromScope(
                        viewMode,
                        allShops,
                        favoriteShops,
                        allEvents
                    )
                )
            )
        )
    )
        .sort(alphabetical)
        .slice(0, 100)

    console.log(`localize : ${localize}`)
    if (localize) {
        localizeSearch(filteredShops, map)
    }

    return filteredShops
}

export function positionShopForModal(map, shopLatLng, targetZoom) {
    const overlayWidth = 1000

    var targetPoint = map
        .project(shopLatLng, targetZoom)
        .subtract([overlayWidth / 2, 0])

    var targetLatLng = map.unproject(targetPoint, targetZoom)

    map.flyTo(targetLatLng, targetZoom, { duration: 0.5 })
}

export function openModal(
    map,
    shopLatLng,
    shopId,
    setModalShopId,
    setOverview,
    zoomLevel
) {
    console.log('open modal')
    setOverview(shopId)
    setModalShopId(shopId)

    positionShopForModal(map, shopLatLng, zoomLevel)
    // positionShopForModal(map, shopLatLng, 14)
}

export function closeModal(setOverview, setDropdownOpen, setModalShopId) {
    setOverview(0)
    setDropdownOpen(false)
    setModalShopId(0)
}

export function getNewBounds(displayedShops) {
    const maxLat = Math.max(
        ...displayedShops.map((shop) => {
            return shop.geolocation_lat[0]
                ? parseFloat(shop.geolocation_lat[0])
                : 0
        })
    )
    const maxLong = Math.max(
        ...displayedShops.map((shop) => {
            return shop.geolocation_long[0]
                ? parseFloat(shop.geolocation_long[0])
                : 0
        })
    )
    const minLat = Math.min(
        ...displayedShops.map((shop) => {
            return shop.geolocation_lat[0]
                ? parseFloat(shop.geolocation_lat[0])
                : 9999
        })
    )
    const minLong = Math.min(
        ...displayedShops.map((shop) => {
            return shop.geolocation_long[0]
                ? parseFloat(shop.geolocation_long[0])
                : 9999
        })
    )

    console.log([
        [minLat, minLong],
        [maxLat, maxLong],
    ])

    // console.log(displayedShops)

    return [
        [minLat, minLong],
        [maxLat, maxLong],
    ]
}

export function recursiveCategoryFilter(filters, shopList) {
    if (!shopList) {
        return []
    } else if (filters.length == 0) {
        return shopList
    } else {
        const newShopList = shopList.filter((shop) => {
            if (shop.categories)
                return shop.categories.some((cat) => cat.slug === filters[0].ID)
            else return false
        })
        return recursiveCategoryFilter(filters.slice(1), newShopList)
    }
}

export function filterByType(type, shops) {
    console.log(type)
    return type.ID === 'all'
        ? shops
        : shops.filter((shop) => {
              if (shop.categories)
                  return shop.categories.some((cat) => cat.slug === type.ID)
              else return false
          })
}

export function filterShopsBySearch(searchInput, shopList) {
    if (searchInput == '') {
        return shopList
    }
    const wordsArray = searchInput.split(' ')
    return shopList.filter((shop) => recursiveWordsSearch(wordsArray, shop))
}

function singleWordSearch(word, shop) {
    return (
        (shop.city[0] &&
            shop.city[0].toLowerCase().match(word.toLowerCase())) ||
        (shop.title && shop.title.toLowerCase().match(word.toLowerCase())) ||
        (shop.formatted_address[0] &&
            shop.formatted_address[0]
                .toLowerCase()
                .match(word.toLowerCase())) ||
        (shop.content && shop.content.toLowerCase().match(word.toLowerCase()))
    )
}

function recursiveWordsSearch(wordsArray, shop) {
    if (!shop) {
        return false
    } else if (wordsArray.length === 0) {
        return true
    } else if (!singleWordSearch(wordsArray[0], shop)) {
        return false
    } else {
        return recursiveWordsSearch(wordsArray.slice(1), shop)
    }
}

const restaurantIcon = new Leaflet.Icon({
    iconUrl: restaurantImg,
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    iconSize: [35, 35],
})

const localStoreIcon = new Leaflet.Icon({
    iconUrl: localStoreImg,
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    iconSize: [35, 35],
})

const supermarketIcon = new Leaflet.Icon({
    iconUrl: supermarketImg,
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    iconSize: [35, 35],
})

const warningIcon = new Leaflet.Icon({
    iconUrl: warningImg,
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    iconSize: [35, 35],
})

const favoriteIcon = new Leaflet.Icon({
    iconUrl: favoriteImg,
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    iconSize: [35, 35],
})

export function getIconUponCategories(categories, favorite) {
    if (favorite) return favoriteIcon
    else if (
        categories &&
        categories.some(
            (cat) => cat.slug === 'restaurant-cafe' || cat.slug === 'take-out'
        )
    ) {
        return restaurantIcon
    } else if (
        categories &&
        categories.some(
            (cat) => cat.slug === 'supermarket' || cat.slug === 'market'
        )
    ) {
        return supermarketIcon
    } else if (
        categories &&
        categories.some((cat) => cat.slug === 'local-store')
    ) {
        return localStoreIcon
    } else return warningIcon
}

export function formatType(type) {
    switch (type) {
        case 'all':
            return 'All shops...'
        case 'restaurant-cafe':
            return 'Restaurant & Cafe'
        case 'take-out':
            return 'Take out'
        case 'supermarket':
            return 'Supermarket'
        case 'market':
            return 'Market'
        case 'local-store':
            return 'Local Store'
        default:
            return 'All shops...'
    }
}

export function formatCategory(category) {
    switch (category) {
        case 'plant-based':
            return 'Plant based'
        case 'organic':
            return 'Organic'
        case 'fairtrade':
            return 'Fair trade'
        case 'plastic-free':
            return 'No plastic'
        case 'zero-waste':
            return 'Zero waste'
        case 'take-out':
            return 'Take out'
        default:
            return ''
    }
}

export function isFavorite(shop, favorites) {
    return favorites.some((favshop) => favshop.id === shop.id)
}

export function getAllShopsFromScope(
    viewMode,
    allShops,
    favoriteShops,
    allEvents
) {
    switch (viewMode) {
        case SCOPES.NONE:
            return allShops
        case SCOPES.BROWSE:
            return allShops
        case SCOPES.EVENTS:
            return allEvents
        case SCOPES.FAVORITES:
            return favoriteShops
        default:
            return allShops
    }
}
