import { useContext } from 'react'
import SideBar from './Components/SideBar'
import Map from './Components/MapComponents/Map'
import FilterBar from './Components/MapComponents/Filters/FilterBar'
import MenuBar from './Components/MenuBar'
import ShopModal from './Components/ShopModal'
import LoadingScreen from './utils/GenericComponents/LoadingScreen'
import Logo from './utils/GenericComponents/Logo'

import { UserInterfaceContext } from './utils/Context/UserInterfaceContext'
import { ScopeContext } from './utils/Context/ScopeContext'

import styled from 'styled-components'

const Test = styled.div`
    position: absolute;
    left: 1200px;
    top: 0;
    width: 1px;
    height: 100vh;
    background-color: red;
    z-index: 700;
`
function App() {
    const { isLoading } = useContext(ScopeContext)
    const { isSideBarOpen, modalShop } = useContext(UserInterfaceContext)
    const initCenter = [34.67, 135.49]

    return (
        <>
            {/* <Test></Test> */}
            {isLoading && <LoadingScreen />}
            <MenuBar />
            {isSideBarOpen && <SideBar />}
            {modalShop.id && <ShopModal shop={modalShop} />}
            <FilterBar />
            <Map center={initCenter} />
            <Logo />
        </>
    )
}

export default App
