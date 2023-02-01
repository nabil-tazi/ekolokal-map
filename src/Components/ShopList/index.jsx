import styled from 'styled-components'
import ShopListItem from './ShopListItem'
import arrow from '../../assets/left-arrow.png'

import { formatType, formatCategory } from '../../utils/maputils'

import { useContext } from 'react'
import { ScopeContext } from '../../utils/context/ScopeContext'

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 60px;
    width: 380px;
    height: 100vh;
    box-shadow: 0px 0px 10px gray;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f4f1;

    z-index: 500;
`
const TopBackground = styled.div`
    /* position: absolute; */
    /* top: 0; */
    /* left: 60px; */

    width: 380px;
    /* height: 150px; */

    background-color: #f8f8f4f1;
    opacity: 100%;

    z-index: 600;
`

const ShopListWrapper = styled.div`
    /* position: absolute; */
    /* top: 150px; */
    /* left: 60px; */
    padding-left: 10px;

    /* height: calc(100vh - 150px); */
    width: 370px;

    background-color: #f8f8f4f1;
    opacity: 100%;

    overflow-x: hidden;
    z-index: 500;
`

const LoadMoreButton = styled.div`
    width: 120px;
    color: white;
    background-color: #b2bdca;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 400;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    margin: auto;
    margin-bottom: 20px;
`

const ResearchSummary = styled.div`
    /* position: absolute; */
    width: 315px;
    padding: 12px 20px 12px 20px;
    margin: 10px;
    margin-top: 70px;
    border-radius: 7px;
    /* top: 70px;
    left: 90px; */
    z-index: 600;
    font-family: sans-serif;
    font-size: 13px;
    line-height: 17px;
    font-weight: 200;
    color: #292929;
    background-color: #e9e9e9;
`
const CloseSideBarButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 45%;
    left: 372px;
    height: 30px;
    width: 15px;
    background-color: #f8f8f4;
    z-index: 600;
    border-radius: 5px;
    box-shadow: 0px 0px 5px gray;
    cursor: pointer;
    &:hover {
        background-color: #e9e9e9;
    }
`

const LeftArrowIcon = styled.img`
    padding: 5px;
    width: 6px;
`

function ShopList({
    setOverview,
    modalShopId,
    setModalShopId,
    setDropdownOpen,
    setSideBarOpened,
    itemsDisplayed,
    setItemsDisplayed,
}) {
    const { research, filteredCategories, filteredType, displayedShops } =
        useContext(ScopeContext)

    function closeDropdown() {
        setDropdownOpen(false)
    }

    function closeSideBar() {
        setSideBarOpened(false)
        setItemsDisplayed(20)
    }

    function handleLoadMore() {
        const items = itemsDisplayed
        setItemsDisplayed(items + 20)
        scollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <Wrapper onClick={closeDropdown}>
                <ResearchSummary>
                    {displayedShops.length === 100 && research === '' && (
                        <>More than </>
                    )}
                    {displayedShops.length > 0 ? (
                        <>{displayedShops.length} </>
                    ) : (
                        <>No </>
                    )}
                    {filteredCategories.length === 1 && (
                        <>
                            {' '}
                            {formatCategory(
                                filteredCategories[0]
                            ).toLowerCase()}{' '}
                        </>
                    )}
                    {filteredType !== 'all' && (
                        <>"{formatType(filteredType)}" </>
                    )}{' '}
                    shops found{research && <> for "{research}"</>}
                    {/* {filteredCategories.length > 0 && (
                        <>
                            {' '}
                            matching{' '}
                            {filteredCategories.map((cat) => (
                                <>"{formatCategory(cat)}", </>
                            ))}
                        </>
                    )} */}
                    {filteredCategories.length > 1 && (
                        <>
                            {' '}
                            matching the {filteredCategories.length} selected
                            categories
                        </>
                    )}
                    {/* {filteredCategories.length === 1 && (
                        <> matching "{formatCategory(filteredCategories[0])}"</>
                    )} */}
                    {research === '' && <> in the area</>}.
                </ResearchSummary>
                <CloseSideBarButton onClick={closeSideBar}>
                    <LeftArrowIcon src={arrow}></LeftArrowIcon>
                </CloseSideBarButton>
                <ShopListWrapper>
                    {displayedShops.slice(0, itemsDisplayed).map((shop) => (
                        <ShopListItem
                            key={shop.id}
                            shop={shop}
                            setOverview={setOverview}
                            modalShopId={modalShopId}
                            setModalShopId={setModalShopId}
                        ></ShopListItem>
                    ))}

                    {itemsDisplayed < displayedShops.length && (
                        <LoadMoreButton onClick={handleLoadMore}>
                            Load more...
                        </LoadMoreButton>
                    )}
                </ShopListWrapper>
            </Wrapper>
        </>
    )
}
export default ShopList
