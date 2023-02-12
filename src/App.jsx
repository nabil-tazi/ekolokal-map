import { useContext } from 'react'
import SideBar from './Components/SideBar'
import Map from './Components/MapComponents/Map'
import FilterBar from './Components/MapComponents/Filters/FilterBar'
import MenuBar from './Components/MenuBar'
import ShopModal from './Components/ShopModal'
import LoadingScreen from './utils/GenericComponents/LoadingScreen'
import styled from 'styled-components'
import ShopData from '../src/assets/data'
import logo from '../src/assets/ekolokal-logo.png'

import { ShopsDataContext } from './utils/Context/ShopsDataContext'
import { UserInterfaceContext } from './utils/Context/UserInterfaceContext'
import { useFetch } from './utils/Hooks/Fetch'
import { useLocalStorage } from './utils/Hooks/LocalStorage'
import { ScopeContext } from './utils/Context/ScopeContext'

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

function App() {
    // const { saveFavoriteShops } = useContext(ShopsDataContext)
    // const { saveFavoriteShops } = useContext(ScopeContext)
    const { isSideBarOpen, modalShop } = useContext(UserInterfaceContext)

    const initCenter = [34.67, 135.49]

    const { isLoading } = useFetch(`https://ekolokal.com/wp-json/wl/v1/shops`)

    return (
        <Container>
            {isLoading && <LoadingScreen />}
            <MenuBar />
            {isSideBarOpen && <SideBar />}
            {modalShop.id && <ShopModal shop={modalShop} />}
            <FilterBar />
            <Map center={initCenter} />
            <EkolokalLogo src={logo} />
        </Container>
    )
}

export default App
