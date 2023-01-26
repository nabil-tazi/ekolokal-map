import ShopMarker from '../ShopMarker'

import { isFavorite } from '../../../utils/maputils'

function ShopMarkersList({
    markersToDisplay,
    overview,
    modalShopId,
    setModalShopId,
    isModalOpened,
    setIsModalOpened,
    setOverview,
    mapRef,
    favoriteShops,
    setDropdownOpen,
}) {
    return (
        <>
            {markersToDisplay.map((shop) =>
                isNaN(parseFloat(shop.geolocation_lat[0])) ||
                isNaN(parseFloat(shop.geolocation_long[0])) ||
                shop?.geolocation_lat[0] === '' ||
                shop?.geolocation_long[0] === '' ||
                shop?.images_id?.length == 0 ? null : (
                    <ShopMarker
                        key={shop.id}
                        shop={shop}
                        lat={parseFloat(shop.geolocation_lat[0])}
                        long={parseFloat(shop.geolocation_long[0])}
                        imgURL={shop.image_thumbnail}
                        shopName={shop.title}
                        shopID={shop.id}
                        categories={shop.categories}
                        shopAddress={shop.formatted_address[0]}
                        overview={overview}
                        modalShopId={modalShopId}
                        setModalShopId={setModalShopId}
                        setOverview={setOverview}
                        mapRef={mapRef}
                        setDropdownOpen={setDropdownOpen}
                        favorite={isFavorite(shop, favoriteShops)}
                    />
                )
            )}
        </>
    )
}

export default ShopMarkersList
