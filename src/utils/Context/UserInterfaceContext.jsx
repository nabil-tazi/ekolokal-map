import { createContext, useContext, useState } from 'react'
import { useWindowSize } from '../Hooks/WindowSize'
import layout from '../Style/Layout'
import { LayoutContext } from './LayoutContext'

export const UserInterfaceContext = createContext()

export const UserInterfaceProvider = ({ children }) => {
    const [overview, openOverview] = useState(0)
    const [modalShop, setModalShop] = useState({ id: 0 })
    const [isSideBarOpen, setSideBarOpened] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [loadedItems, setLoadedItems] = useState(20)

    const { widthTaken } = useContext(LayoutContext)

    const { windowSize, mode } = useWindowSize()

    function flyToShop(map, shopLatLng, targetZoom) {
        const overlayWidth = Math.min(
            widthTaken,
            layout.baseModalWidth + layout.leftBLock
        )

        var targetPoint =
            mode !== 'mobile'
                ? map
                      .project(shopLatLng, targetZoom)
                      .subtract([overlayWidth / 2, 0])
                : map
                      .project(shopLatLng, targetZoom)
                      .subtract([0, -(windowSize.height / 2) + 110]) //-((windowSize.height) / 2) + 70]

        var targetLatLng = map.unproject(targetPoint, targetZoom)
        map.flyTo(targetLatLng, targetZoom, { duration: 0.5 })
    }

    function openModal(map, shop, zoomLevel) {
        // mode === 'mobile' && closeSideBar()
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
        closeOverview()
        closeDropdown()
        setModalShop({ id: 0 })
    }

    const isModalClosed = !modalShop.id

    function closeOverview() {
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
