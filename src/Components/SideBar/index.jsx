import { useContext } from 'react'
import styled from 'styled-components'

import CloseSideBarButton from '../../utils/GenericComponents/CloseSideBarButton'
import LoadMoreButton from '../../utils/GenericComponents/LoadMoreButton'
import FilterSummary from './FilterSummary'
import ShopListItem from './ShopListItem'

import layout from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'

import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'

const SideBarContainer = styled.div`
    position: absolute;
    top: 0;
    left: ${layout.menuBarWidth};
    width: ${layout.SideBarWidth};
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${colors.transparentBackground};
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
`

const ShopListContainer = styled.div`
    width: calc(${layout.SideBarWidth});
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

function SideBar() {
    const { displayedShops } = useContext(ShopsDataContext)
    const { closeDropdown, loadedItems } = useContext(UserInterfaceContext)

    return (
        <SideBarContainer onClick={closeDropdown}>
            <CloseSideBarButton />
            <FilterSummary />
            <ShopListContainer>
                {displayedShops.slice(0, loadedItems).map((shop) => (
                    <ShopListItem key={shop.id} shop={shop}></ShopListItem>
                ))}
                {loadedItems < displayedShops.length && <LoadMoreButton />}
            </ShopListContainer>
        </SideBarContainer>
    )
}
export default SideBar
