import { useContext } from 'react'
import BrowsingBar from './Components/BrowsingBar'
import Map from './Components/MapComponents/Map'
import FilterBar from './Components/MapComponents/Filters/FilterBar'
import MenuBar from './Components/MenuBar'
import ShopModal from './Components/ShopModal'
import LoadingScreen from './utils/GenericComponents/LoadingScreen'
import Logo from './utils/GenericComponents/Logo'

import { UserInterfaceContext } from './utils/Context/UserInterfaceContext'
import { ScopeContext } from './utils/Context/ScopeContext'

import styled from 'styled-components'
import { devices } from './utils/Style/Layout'
import colors from './utils/Style/Colors'
import { useWindowSize } from './utils/Hooks/WindowSize'

const ToggleMode = styled.div`
    position: absolute;
    left: 20px;
    bottom: 80px;
    width: 80px;
    height: 80px;

    border-radius: 100%;
    background-color: ${colors.primaryBackground};
    @media ${devices.tablet} {
        display: none;
    }
`
// const Test = styled.div`
//     position: absolute;
//     height: 1px;
//     width: 100%;
//     background-color: red;
//     top: 50%;
//     z-index: 999;
//     transform: translateY(
//         ${(props) => (-(props.windowHeight / 2) + 110).toString() + 'px'}
//     );
// `

function App() {
    const { isLoading } = useContext(ScopeContext)
    const { isSideBarOpen, modalShop } = useContext(UserInterfaceContext)
    const initCenter = [34.67, 135.49]

    const { windowSize, mode } = useWindowSize()

    console.log(`MODE : ${mode}`)
    console.log(`HEIGHT : ${windowSize.height}`)

    return (
        <>
            {/* <Test windowHeight={windowSize.height}></Test> */}
            {isLoading && <LoadingScreen />}
            {modalShop.id && <ShopModal shop={modalShop} />}
            <FilterBar>
                {isSideBarOpen && (mode !== 'mobile' || !modalShop.id) && (
                    <BrowsingBar />
                )}
                <MenuBar />
            </FilterBar>
            <Map center={initCenter} />
            {mode !== 'mobile' && <Logo />}
            <ToggleMode></ToggleMode>
        </>
    )
}

export default App
