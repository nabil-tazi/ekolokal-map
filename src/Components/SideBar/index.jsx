import { useContext } from 'react'
import styled from 'styled-components'

import CloseSideBarButton from '../../utils/GenericComponents/CloseSideBarButton'
import FilterSummary from './FilterSummary'
import ShopList from '../ShopList'

import layout from '../../utils/Style/Layout'
import { devices } from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'

import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'

const SideBarContainer = styled.div`
    position: absolute;
    top: 0;
    @media ${devices.mobileS} {
        left: 0;
        width: 0%;
        display: none;
    }
    @media ${devices.tablet} {
        left: ${layout.menuBarWidthPx};
        width: ${layout.SideBarWidthPx};
        display: flex;
    }
    height: 100vh;
    /* display: flex; */
    flex-direction: column;
    background-color: ${colors.transparentBackground};
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
`

function SideBar() {
    const { closeDropdown } = useContext(UserInterfaceContext)

    return (
        <SideBarContainer onClick={closeDropdown}>
            <CloseSideBarButton />
            <FilterSummary />
            <ShopList />
        </SideBarContainer>
    )
}
export default SideBar
