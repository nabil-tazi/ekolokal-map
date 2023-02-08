import Leaflet from 'leaflet'

import restaurantImg from '../../assets/restaurant.png'
import localStoreImg from '../../assets/local-store.png'
import supermarketImg from '../../assets/supermarket.png'
import warningImg from '../../assets/warning.png'
import favoriteImg from '../../assets/loveMarker.png'

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
