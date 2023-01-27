import {
    MapContainer,
    TileLayer,
    useMapEvent,
    ZoomControl,
} from 'react-leaflet'

import { useContext } from 'react'
import { ScopeContext } from '../../../utils/context'

// import MarkerClusterGroup from 'react-leaflet-cluster'

import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

import './MapObject.css'
import 'leaflet/dist/leaflet.css'
// import 'react-leaflet-markercluster/dist/styles.min.css'
import styled from 'styled-components'

import {
    updateMarkerFromBounds,
    alphabetical,
    // sortById,
    recursiveCategoryFilter,
    filterByType,
    closeModal,
} from '../../../utils/maputils.jsx'

import ShopMarkersList from '../ShopMarkersList'

const MapWrapper = styled(MapContainer)`
    position: absolute;
    top: 0;
    left: 0;
`

function Bounds({
    allShops,
    setDisplayedShops,
    modalShopId,
    setOverview,
    research,
    filteredCategories,
    setDropdownOpen,
    filteredType,
    setModalShopId,
    inputRef,
}) {
    const { viewMode } = useContext(ScopeContext)

    const map = useMapEvent('moveend', () => {
        console.log('map moves1')
        console.log(modalShopId)
        console.log(research)
        console.log(inputRef.current.value)

        if (
            modalShopId === 0 &&
            research === '' &&
            inputRef.current.value === '' &&
            (viewMode === 'browse' || viewMode === '')
        ) {
            console.log('map changes2')
            setDisplayedShops(
                recursiveCategoryFilter(
                    filteredCategories,
                    filterByType(
                        filteredType,
                        updateMarkerFromBounds(
                            map.getBounds(),
                            map.getCenter(),
                            allShops
                        )
                    )
                )
                    // .slice(0, 200) // Only displays the first 200
                    .sort(alphabetical)
                    // .sort(sortById)
                    .slice(0, 100)
            )
        }
    })

    useMapEvent('click', () => {
        // setOverview(0)
        // setIsModalOpened(false)
        // setIsOverviewOpened(false)
        // setDropdownOpen(false)
        // setModalShopId(0)
        closeModal(setOverview, setDropdownOpen, setModalShopId)
    })
    useMapEvent('mouseover', () => {
        if (modalShopId === 0) {
            setOverview(0)
        } else {
            console.log('mouseOver')

            setOverview(modalShopId)
        }
        // setIsModalOpened(false)
        // setIsOverviewOpened(false)
        // setDropdownOpen(false)
        // setModalShopId(0)
        // closeModal(setOverview, setDropdownOpen, setModalShopId)
    })
    return null
}

function Map({
    allShops,
    displayedShops,
    setDisplayedShops,
    overview,
    center,
    mapRef,
    modalShopId,
    setModalShopId,
    setOverview,
    research,
    filteredCategories,
    setDropdownOpen,
    filteredType,
    inputRef,
    favoriteShops,
}) {
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
                        markersToDisplay={displayedShops}
                        overview={overview}
                        modalShopId={modalShopId}
                        setModalShopId={setModalShopId}
                        setOverview={setOverview}
                        mapRef={mapRef}
                        setDropdownOpen={setDropdownOpen}
                        favoriteShops={favoriteShops}
                    ></ShopMarkersList>
                )}
                {/* </MarkerClusterGroup> */}
                <Bounds
                    allShops={allShops}
                    setDisplayedShops={setDisplayedShops}
                    research={research}
                    setOverview={setOverview}
                    filteredCategories={filteredCategories}
                    setDropdownOpen={setDropdownOpen}
                    filteredType={filteredType}
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
