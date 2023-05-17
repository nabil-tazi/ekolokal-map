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
import { ScopeContext } from '../../../utils/Context/ScopeContext'
import { useLocalizeUser } from '../../../utils/Hooks/LocalizeUser'

const MapWrapper = styled(MapContainer)`
    position: absolute;
    top: 0;
    left: 0;
`

function Bounds() {
    const { updateDisplayedShops, ACTIONS, noResearch } =
        useContext(ShopsDataContext)

    const { currentScope } = useContext(ScopeContext)

    const { closeModal } = useContext(UserInterfaceContext)

    const map = useMapEvent('moveend', () => {
        if (currentScope.LOCALIZED && noResearch)
            updateDisplayedShops(ACTIONS.MOVE_MAP, map)
    })

    useMapEvent('click', () => {
        closeModal()
    })
    // Useful if popup panning is ON
    // useMapEvent('mouseover', () => {
    //     openOverview(modalShop.id)
    // })
    return null
}

function Map({ center, inputRef }) {
    const { mapRef, displayedShops } = useContext(ShopsDataContext)
    // const { userLocation } = useLocalizeUser()

    return (
        <>
            <MapWrapper
                ref={mapRef}
                center={center}
                zoom={15}
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
