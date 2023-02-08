export function alphabetical(a, b) {
    let comparison = 0
    if (a.title > b.title) {
        comparison = 1
    } else if (a.title < b.title) {
        comparison = -1
    }
    return comparison
}

export function localizeShops(filteredShops, map) {
    if (filteredShops.length === 0) return
    map.fitBounds(getNewBounds(filteredShops), {
        paddingTopLeft: L.point(500, 200),
        paddingBottomRight: L.point(200, 0),
    })
}

export function filterShopsByMapBounds(map, scope, research) {
    if (scope.LOCALIZED && research === '') {
        const adjustedBounds = map.getBounds().pad(-0.9)
        return scope.DATA.filter(
            (shop) =>
                parseFloat(shop.geolocation_lat[0]) >
                    adjustedBounds.getSouthWest().lat &&
                parseFloat(shop.geolocation_lat[0]) <
                    adjustedBounds.getNorthEast().lat &&
                parseFloat(shop.geolocation_long[0]) >
                    adjustedBounds.getSouthWest().lng &&
                parseFloat(shop.geolocation_long[0]) <
                    adjustedBounds.getNorthEast().lng
        )
    } else {
        return scope.DATA
    }
}

export function updateShops({
    research,
    filteredCategories,
    filteredType,
    map,
    scope,
    localize,
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

    // console.log(`localize : ${localize}`)
    if (localize) {
        localizeShops(filteredShops, map)
    }

    return filteredShops
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
    return [
        [minLat, minLong],
        [maxLat, maxLong],
    ]
}

export function recursiveCategoryFilter(filters, shopList) {
    if (!shopList) {
        return []
    } else if (filters.length === 0) {
        return shopList
    } else if (filters[0].ID === 'all') {
        return recursiveCategoryFilter(filters.slice(1), shopList)
    } else {
        const newShopList = shopList.filter((shop) => {
            if (shop.categories)
                return shop.categories.some((cat) => cat.slug === filters[0].ID)
            else return false
        })
        return recursiveCategoryFilter(filters.slice(1), newShopList)
    }
}

// export function filterByType(type, shops) {
//     return type.ID === 'all'
//         ? shops
//         : shops.filter((shop) => {
//               if (shop.categories)
//                   return shop.categories.some((cat) => cat.slug === type.ID)
//               else return false
//           })
// }

export function filterShopsBySearch(searchInput, shopList) {
    if (searchInput === '') {
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
