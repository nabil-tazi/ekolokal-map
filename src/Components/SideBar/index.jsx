import { useContext } from 'react'
import styled from 'styled-components'

import CloseSideBarButton from '../../utils/GenericComponents/CloseSideBarButton'
import LoadMoreButton from '../../utils/GenericComponents/LoadMoreButton'
import FilterSummary from './FilterSummary'
import ShopListItem from './ShopListItem'

import { ShopsDataContext } from '../../utils/context/ShopsDataContext'
import { UserInterfaceContext } from '../../utils/context/UserInterfaceContext'

const SideBarContainer = styled.div`
    position: absolute;
    top: 0;
    left: 60px;
    width: 380px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f4f1;
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
`

const ShopListContainer = styled.div`
    padding-left: 10px;
    width: 370px;
    background-color: #f8f8f4f1;
    overflow-x: hidden;
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
