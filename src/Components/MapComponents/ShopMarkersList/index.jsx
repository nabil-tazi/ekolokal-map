import { useContext } from 'react'

import ShopMarker from './ShopMarker'

import { ShopsDataContext } from '../../../utils/Context/ShopsDataContext'

function ShopMarkersList() {
    const { mapRef, displayedShops, isFavorite } = useContext(ShopsDataContext)

    return (
        <>
            {displayedShops.map((shop) =>
                isNaN(parseFloat(shop.geolocation_lat[0])) ||
                isNaN(parseFloat(shop.geolocation_long[0])) ||
                shop?.geolocation_lat[0] === '' ||
                shop?.geolocation_long[0] === '' ||
                shop?.images_id?.length == 0 ? null : (
                    <ShopMarker
                        key={shop.id}
                        shop={shop}
                        shopID={shop.id}
                        categories={shop.categories}
                        mapRef={mapRef}
                        favorite={isFavorite(shop)}
                    />
                )
            )}
        </>
    )
}

export default ShopMarkersList
