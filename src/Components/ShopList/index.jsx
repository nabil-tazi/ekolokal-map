import { useContext } from 'react'
import styled from 'styled-components'
import ShopListItem from '../SideBar/ShopListItem'
import LoadMoreButton from '../../utils/GenericComponents/LoadMoreButton'
import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import layout from '../../utils/Style/Layout'

const ShopListContainer = styled.div`
    width: calc(${layout.SideBarWidthPx} - ${layout.overlaysSpacing});
    /* height: 100%; */
    /* height: calc(100vh - 200px); */
    overflow-x: hidden;

    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    align-content: flex-start;
    gap: 5px 0px;
    flex-wrap: wrap;
    padding: 10px;
    flex-grow: 1;
`

function ShopList() {
    const { displayedShops } = useContext(ShopsDataContext)
    const { loadedItems } = useContext(UserInterfaceContext)

    return (
        <ShopListContainer>
            {displayedShops.slice(0, loadedItems).map((shop) => (
                <ShopListItem key={shop.id} shop={shop}></ShopListItem>
            ))}
            {loadedItems < displayedShops.length && <LoadMoreButton />}
        </ShopListContainer>
    )
}

export default ShopList
