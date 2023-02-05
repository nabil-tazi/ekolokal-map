import { useContext } from 'react'

import ShopMarker from './ShopMarker'

import { ShopsDataContext } from '../../../utils/context/ShopsDataContext'

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
                        // lat={parseFloat(shop.geolocation_lat[0])}
                        // long={parseFloat(shop.geolocation_long[0])}
                        // imgURL={shop.image_thumbnail}
                        // shopName={shop.title}
                        shopID={shop.id}
                        categories={shop.categories}
                        // shopAddress={shop.formatted_address[0]}
                        mapRef={mapRef}
                        favorite={isFavorite(shop)}
                    />
                )
            )}
        </>
    )
}

export default ShopMarkersList
