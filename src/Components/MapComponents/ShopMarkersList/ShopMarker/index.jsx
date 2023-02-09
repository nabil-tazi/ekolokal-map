import { Marker } from 'react-leaflet'

import ShopPopup from '../../ShopPopup'
import { useRef, useEffect, useContext } from 'react'
import { UserInterfaceContext } from '../../../../utils/Context/UserInterfaceContext'
import { getIconUponCategories } from '../../../../utils/Configuration/MapMarkersConfig'

function ShopMarker({ shop, categories, mapRef, favorite }) {
    const markerRef = useRef(null)

    const {
        overview,
        modalShop,
        openOverview,
        closeDropdown,
        openModal,
        // isModalClosed,
    } = useContext(UserInterfaceContext)

    useEffect(() => {
        if (overview === shop.id) {
            markerRef.current.openPopup()
        } else if (overview === 0) {
            markerRef.current.closePopup()
        }
    }, [overview])

    function handleClick() {
        openModal(
            mapRef.current,
            [
                parseFloat(shop.geolocation_lat[0]),
                parseFloat(shop.geolocation_long[0]),
            ],
            shop,
            mapRef.current.getZoom()
        )
        closeDropdown()
    }

    return (
        <Marker
            ref={markerRef}
            position={[
                parseFloat(shop.geolocation_lat[0]),
                parseFloat(shop.geolocation_long[0]),
            ]}
            icon={getIconUponCategories(categories, favorite)}
            eventHandlers={{
                mouseover: () => {
                    if (!modalShop.id || modalShop.id === shop.id) {
                        openOverview(shop.id)
                    }
                },
                mouseout: () => {
                    openOverview(modalShop.id)
                },
                click: (event) => {
                    event.target.openPopup()
                    handleClick()
                },
            }}
        >
            <ShopPopup
                imgUrl={shop.image_thumbnail}
                shopName={shop.title}
                shopAddress={shop.formatted_address[0]}
            ></ShopPopup>
        </Marker>
    )
}

export default ShopMarker
