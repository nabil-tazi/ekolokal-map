import {
    MapContainer,
    TileLayer,
    useMapEvent,
    ZoomControl,
} from 'react-leaflet'

import { useContext } from 'react'
import { ShopsDataContext } from '../../../utils/Context/ShopsDataContext'

// import MarkerClusterGroup from 'react-leaflet-cluster'

import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import './MapObject.css'
import 'leaflet/dist/leaflet.css'
// import 'react-leaflet-markercluster/dist/styles.min.css'
import styled from 'styled-components'

import ShopMarkersList from '../ShopMarkersList'
import { SCOPES } from '../../../utils/Configuration/ScopeConfig'
import { UserInterfaceContext } from '../../../utils/Context/UserInterfaceContext'

const MapWrapper = styled(MapContainer)`
    position: absolute;
    top: 0;
    left: 0;
`

function Bounds({ inputRef }) {
    const { currentScope, updateDisplayedShops, ACTIONS, noResearch } =
        useContext(ShopsDataContext)

    const {
        modalShopId,
        openOverview,
        closeOverview,
        closeModal,
        isModalClosed,
    } = useContext(UserInterfaceContext)

    const map = useMapEvent('moveend', () => {
        // if (
        //     isModalClosed &&
        //     noResearch &&
        //     // inputRef.current.value === '' &&
        //     (currentScope.ID === SCOPES.BROWSE.ID ||
        //         currentScope.ID === SCOPES.NONE.ID)
        // ) {
        //     console.log('MOVE')

        //     updateDisplayedShops(ACTIONS.MOVE_MAP, map)
        // }
        if (currentScope.LOCALIZED && noResearch)
            updateDisplayedShops(ACTIONS.MOVE_MAP, map)
    })

    useMapEvent('click', () => {
        closeModal()
    })
    useMapEvent('mouseover', () => {
        isModalClosed ? closeOverview() : openOverview(modalShopId)
    })
    return null
}

function Map({ center, inputRef }) {
    const { mapRef, displayedShops } = useContext(ShopsDataContext)

    return (
        <>
            <MapWrapper
                ref={mapRef}
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <TileLayer
                    attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                {/* <MarkerClusterGroup
                    showCoverageOnHover={false}
                    disableClusteringAtZoom={10}
                    spiderfyOnMaxZoom={false}
                    maxClusterRadius={40}
                > */}
                {displayedShops && <ShopMarkersList></ShopMarkersList>}
                {/* </MarkerClusterGroup> */}
                <Bounds inputRef={inputRef} />
                <ZoomControl position="topright" />
            </MapWrapper>
        </>
    )
}

export default Map
