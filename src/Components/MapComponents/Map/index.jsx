import {
    MapContainer,
    TileLayer,
    useMapEvent,
    ZoomControl,
} from 'react-leaflet'

import { useContext } from 'react'
import { ScopeContext } from '../../../utils/context/ScopeContext'

// import MarkerClusterGroup from 'react-leaflet-cluster'

import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import './MapObject.css'
import 'leaflet/dist/leaflet.css'
// import 'react-leaflet-markercluster/dist/styles.min.css'
import styled from 'styled-components'

import { closeModal } from '../../../utils/maputils.jsx'

import ShopMarkersList from '../ShopMarkersList'
import { SCOPES } from '../../../utils/configuration/ScopeConfig'

const MapWrapper = styled(MapContainer)`
    position: absolute;
    top: 0;
    left: 0;
`

function Bounds({
    modalShopId,
    setOverview,
    setDropdownOpen,
    setModalShopId,
    inputRef,
}) {
    const { viewMode, research, moveMap } = useContext(ScopeContext)

    const map = useMapEvent('moveend', () => {
        if (
            modalShopId === 0 &&
            research === '' &&
            inputRef.current.value === '' &&
            (viewMode === SCOPES.BROWSE || viewMode === SCOPES.NONE)
        ) {
            moveMap(map)
        }
    })

    useMapEvent('click', () => {
        closeModal(setOverview, setDropdownOpen, setModalShopId)
    })
    useMapEvent('mouseover', () => {
        if (modalShopId === 0) {
            setOverview(0)
        } else {
            setOverview(modalShopId)
        }
    })
    return null
}

function Map({
    overview,
    center,
    modalShopId,
    setModalShopId,
    setOverview,
    setDropdownOpen,
    inputRef,
}) {
    const { mapRef, displayedShops } = useContext(ScopeContext)

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
                {displayedShops && (
                    <ShopMarkersList
                        overview={overview}
                        modalShopId={modalShopId}
                        setModalShopId={setModalShopId}
                        setOverview={setOverview}
                        setDropdownOpen={setDropdownOpen}
                    ></ShopMarkersList>
                )}
                {/* </MarkerClusterGroup> */}
                <Bounds
                    setOverview={setOverview}
                    setDropdownOpen={setDropdownOpen}
                    setModalShopId={setModalShopId}
                    modalShopId={modalShopId}
                    inputRef={inputRef}
                />
                <ZoomControl position="topright" />
            </MapWrapper>
        </>
    )
}

export default Map
