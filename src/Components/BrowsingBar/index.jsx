import { useContext } from 'react'
import styled from 'styled-components'

import CloseSideBarButton from '../../utils/GenericComponents/CloseSideBarButton'
import FilterSummary from './FilterSummary'
import ShopList from '../ShopList'

import layout from '../../utils/Style/Layout'
import { devices } from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'

import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { useWindowSize } from '../../utils/Hooks/WindowSize'

const BrowsingBarContainer = styled.div`
    z-index: 600;
    pointer-events: auto;

    @media ${devices.mobileS} {
        height: 10px;
        padding-top: 0px;

        align-self: stretch;
        flex-grow: 1;
        overflow-x: hidden;
        overflow-y: visible;

        background-color: ${colors.primaryBackground};
        margin-bottom: ${layout.menuBarWidthPx};
    }
    @media ${devices.tablet} {
        position: absolute;
        width: ${layout.SideBarWidthPx};
        height: calc(100% - 15px);
        padding-top: 15px;

        top: 0;
        left: ${layout.menuBarWidthPx};

        display: flex;
        flex-direction: column;
        overflow-x: visible;

        background-color: ${colors.transparentBackground};
        box-shadow: 0px 0px 10px gray;
    }
`

function BrowsingBar() {
    const { closeDropdown } = useContext(UserInterfaceContext)
    const { mode } = useWindowSize()

    return (
        <>
            <CloseSideBarButton />
            {mode === 'mobile' && <FilterSummary />}
            <BrowsingBarContainer onClick={closeDropdown}>
                {mode !== 'mobile' && <FilterSummary />}
                <ShopList />
            </BrowsingBarContainer>
        </>
    )
}
export default BrowsingBar
