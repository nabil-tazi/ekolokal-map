import styled from 'styled-components'

import { useContext } from 'react'
import layout, { devices } from '../../utils/Style/Layout'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { useWindowSize } from '../../utils/Hooks/WindowSize'
import FilterBar from './Filters/FilterBar'

import ShopModal from './ShopModal'
import BrowsingBar from './BrowsingBar'
import MenuBar from './MenuBar'

const OverlaysWrapper = styled.div`
    position: absolute;
    top: 0px;

    display: flex;
    flex-direction: column;
    height: 100%;

    justify-content: space-between;
    left: ${layout.menuBarWidthPx};
    margin-bottom: 20px;

    @media ${devices.mobileS} {
        width: 100%;
        flex-wrap: wrap;
        left: 0px;
        pointer-events: ${(props) => props.pointer};
    }
    @media ${devices.tablet} {
        width: calc(
            100% - ${layout.menuBarWidthPx} - 2 * ${layout.overlaysSpacingPx}
        );
        flex-wrap: nowrap;
        pointer-events: none;
        padding-left: ${layout.menuBarWidthPx};
    }
`

function Overlays() {
    const { isSideBarOpen, modalShop } = useContext(UserInterfaceContext)
    const { mode } = useWindowSize()

    return (
        <OverlaysWrapper pointer={isSideBarOpen ? 'auto' : 'none'}>
            <FilterBar />
            {modalShop.id && <ShopModal shop={modalShop} />}
            {isSideBarOpen && (mode !== 'mobile' || !modalShop.id) && (
                <BrowsingBar />
            )}
            <MenuBar />
        </OverlaysWrapper>
    )
}

export default Overlays
