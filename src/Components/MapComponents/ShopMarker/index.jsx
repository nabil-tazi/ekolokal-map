import { Marker, useMapEvent } from 'react-leaflet'
import Leaflet from 'leaflet'

import ShopPopup from '../ShopPopup'
import { useRef, useEffect } from 'react'
import {
    openModal,
    closeModal,
    getIconUponCategories,
} from '../../../utils/maputils'

function ShopMarker({
    shop,
    lat,
    long,
    imgURL,
    shopName,
    categories,
    shopAddress,
    overview,
    modalShopId,
    setModalShopId,
    setOverview,
    mapRef,
    setDropdownOpen,
}) {
    const markerRef = useRef(null)

    useEffect(() => {
        if (setModalShopId === 0) {
            setOverview(modalShopId)
        }
    }, [modalShopId])

    useEffect(() => {
        // console.log('useEffect overview')
        // console.log(overview)

        if (overview === shop.id) {
            console.log(`let's open the popup ${shop.id}`)
            markerRef.current.openPopup()
        } else if (overview === 0) {
            // console.log("let's close the popup")
            markerRef.current.closePopup()
        }
    }, [overview])

    function handleClick() {
        openModal(
            mapRef.current,
            [lat, long],
            shop.id,
            setModalShopId,
            setOverview,
            mapRef.current.getZoom()
        )

        setDropdownOpen(false)
    }

    useMapEvent({
        popupclose: () => {
            //setOverview(0)
        },
    })

    return (
        <Marker
            ref={markerRef}
            position={[
                parseFloat(shop.geolocation_lat[0]),
                parseFloat(shop.geolocation_long[0]),
            ]}
            icon={getIconUponCategories(categories)}
            eventHandlers={{
                mouseover: () => {
                    if (!modalShopId || modalShopId === shop.id) {
                        setOverview(shop.id)
                    }
                },
                mouseout: () => {
                    setOverview(modalShopId)
                },
                click: (event) => {
                    event.target.openPopup()
                    handleClick()
                },
            }}
        >
            <ShopPopup
                imgUrl={imgURL}
                shopName={shopName}
                shopAddress={shopAddress}
            ></ShopPopup>
        </Marker>
    )
}

export default ShopMarker
