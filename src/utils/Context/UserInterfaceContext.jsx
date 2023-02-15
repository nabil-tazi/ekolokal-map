import { createContext, useState } from 'react'
import layout from '../Style/Layout'

export const UserInterfaceContext = createContext()

export const UserInterfaceProvider = ({ children }) => {
    const [overview, openOverview] = useState(0)
    const [modalShop, setModalShop] = useState({ id: 0 })
    const [isSideBarOpen, setSideBarOpened] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [loadedItems, setLoadedItems] = useState(20)

    function flyToShop(map, shopLatLng, targetZoom) {
        // const overlayWidth = 1000
        console.log(layout.maxOverlayWidth)
        // console.log(maxOverlayWidth)
        const overlayWidth = Math.min(layout.widthTaken, 600 + layout.leftBLock)
        var targetPoint = map
            .project(shopLatLng, targetZoom)
            .subtract([overlayWidth / 2, 0])

        var targetLatLng = map.unproject(targetPoint, targetZoom)
        map.flyTo(targetLatLng, targetZoom, { duration: 0.5 })
    }

    function openModal(map, shop, zoomLevel) {
        console.log('Opening Modal function')
        console.log(shop)
        openOverview(shop.id)
        setModalShop(shop)
        flyToShop(
            map,
            [
                parseFloat(shop.geolocation_lat[0]),
                parseFloat(shop.geolocation_long[0]),
            ],
            zoomLevel
        )
    }

    function closeModal() {
        console.log('Closing Modal function')
        closeOverview()
        closeDropdown()
        setModalShop({ id: 0 })
    }

    const isModalClosed = !modalShop.id

    function closeOverview() {
        console.log('closing overview')
        openOverview(0)
    }

    function toggleSideBar() {
        setSideBarOpened(!isSideBarOpen)
    }

    function toggleDropdown() {
        setDropdownOpen(!isDropdownOpen)
    }

    function closeDropdown() {
        setDropdownOpen(false)
    }

    function openSideBar() {
        setSideBarOpened(true)
    }

    function closeSideBar() {
        setSideBarOpened(false)
        setLoadedItems(20)
    }

    function loadMoreShops() {
        setLoadedItems(loadedItems + 20)
    }

    function resetLazyLoad() {
        setLoadedItems(20)
    }

    return (
        <UserInterfaceContext.Provider
            value={{
                overview,
                openOverview,
                modalShop,
                isSideBarOpen,
                openSideBar,
                toggleSideBar,
                isDropdownOpen,
                loadedItems,
                openModal,
                closeModal,
                isModalClosed,
                closeOverview,
                toggleDropdown,
                closeDropdown,
                closeSideBar,
                loadMoreShops,
                resetLazyLoad,
                flyToShop,
            }}
        >
            {children}
        </UserInterfaceContext.Provider>
    )
}
