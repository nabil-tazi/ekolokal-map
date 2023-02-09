import { useEffect, useContext } from 'react'
import SideBar from '../SideBar'
import Map from '../MapComponents/Map'
import FilterBar from '../MapComponents/Filters/FilterBar'
import MenuBar from '../MenuBar'
import ShopModal from '../ShopModal'
import LoadingScreen from '../../utils/GenericComponents/LoadingScreen'
import styled from 'styled-components'
import ShopData from '../../assets/data'
import logo from '../../assets/ekolokal-logo.png'

import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { useFetch } from '../../utils/Hooks/Fetch'
import { useLocalStorage } from '../../utils/Hooks/LocalStorage'

const Container = styled.div``

const EkolokalLogo = styled.img`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 100px;
    z-index: 900;
    border-radius: 100%;
    box-shadow: 0px 0px 10px gray;
    cursor: pointer;
    transition: transform 0.2s ease-in;

    &:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease-in;
    }
`

function ShopBrowser() {
    const { saveFavoriteShops, displayedShops } = useContext(ShopsDataContext)

    const { isSideBarOpen, modalShopId, resetLazyLoad } =
        useContext(UserInterfaceContext)

    const initCenter = [34.67, 135.49]

    const { isLoading } = useFetch(`https://ekolokal.com/wp-json/wl/v1/shops`)

    const { storedFavorites } = useLocalStorage('favorites')
    if (storedFavorites) saveFavoriteShops(storedFavorites)

    useEffect(() => {
        resetLazyLoad()
    }, [displayedShops.length])

    return (
        <Container>
            {isLoading && <LoadingScreen />}
            <MenuBar />
            {isSideBarOpen && <SideBar />}
            {modalShopId.open && <ShopModal shop={modalShopId.shopData} />}
            <FilterBar />
            <Map center={initCenter} />
            <EkolokalLogo src={logo} />
        </Container>
    )
}

export default ShopBrowser
