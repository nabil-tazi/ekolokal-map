import { createContext, useState } from 'react'

export const UserInterfaceContext = createContext()

export const UserInterfaceProvider = ({ children }) => {
    const [overview, openOverview] = useState(0)
    const [modalShopId, setModalShopId] = useState(0)
    const [isSideBarOpen, setSideBarOpened] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [loadedItems, setLoadedItems] = useState(20)

    function flyToShop(map, shopLatLng, targetZoom) {
        const overlayWidth = 1000
        var targetPoint = map
            .project(shopLatLng, targetZoom)
            .subtract([overlayWidth / 2, 0])

        var targetLatLng = map.unproject(targetPoint, targetZoom)
        map.flyTo(targetLatLng, targetZoom, { duration: 0.5 })
    }

    function openModal(map, shopLatLng, shopId, zoomLevel) {
        openOverview(shopId)
        setModalShopId(shopId)
        flyToShop(map, shopLatLng, zoomLevel)
    }

    function closeModal() {
        closeOverview()
        closeDropdown()
        setModalShopId(0)
    }

    const isModalClosed = modalShopId === 0

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
                modalShopId,
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
