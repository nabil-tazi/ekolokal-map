import { useContext } from 'react'
import styled from 'styled-components'

import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import FilterSummary from '../SideBar/FilterSummary'
import ShopList from '../ShopList'

import layout, { devices } from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'

const BrowsingModalContainer = styled.div`
    /* position: relative; */

    align-self: stretch;
    flex-grow: 1;
    background-color: ${colors.primaryBackground};
    margin-bottom: ${layout.menuBarWidthPx};
    height: 10px;

    z-index: 600;
    overflow-x: hidden;
    /* @media ${devices.mobileS} {
        display: block;
    }
    @media ${devices.tablet} {
        display: none;
    } */
`

function BrowsingModal() {
    const { closeDropdown } = useContext(UserInterfaceContext)

    return (
        <>
            <FilterSummary />
            <BrowsingModalContainer onClick={closeDropdown}>
                <ShopList />
            </BrowsingModalContainer>
        </>
    )
}
export default BrowsingModal
