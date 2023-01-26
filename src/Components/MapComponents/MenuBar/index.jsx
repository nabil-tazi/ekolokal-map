import styled from 'styled-components'
import list from '../../../assets/browse.png'
import event from '../../../assets/temporary.png'
import favorites from '../../../assets/favorites.png'

import {
    initDisplayedShops,
    alphabetical,
    recursiveCategoryFilter,
    filterByType,
    getAllShopsFromScope,
    filterShopsBySearch,
} from '../../../utils/maputils'
const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const MenuIcon = styled.img`
    /* position: absolute; */
    width: 35px;
    /* height: 35px; */
    margin: 10px;
    margin-top: 17px;
    padding: 7px;
    cursor: pointer;
    z-index: 700;
    border-radius: 7px;
    background-color: ${(props) => (props.active ? '#b2bdca' : null)};
`

const MenuWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 100vh;
    background-color: #f8f8f4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* background-color: orange; */
    z-index: 700;

    box-shadow: ${(props) =>
        props.isSideBarOpened ? '0px 0px 0px gray' : '0px 0px 10px gray'};
    border-right: ${(props) =>
        props.isSideBarOpened ? '.2px solid #a0a0a0' : '0px 0px 10px gray'};
`

const LanguageContainer = styled.div`
    font-family: sans-serif;
    font-size: 13px;
    color: #292929;
    font-weight: 200;
    margin: 10px;
    display: flex;
    justify-content: space-between;
`
const LanguageButton = styled.div`
    margin: 5px;
    user-select: none;

    cursor: pointer;
`

function MenuBar({
    setDisplayedShops,
    isSideBarOpened,
    setSideBarOpened,
    setItemsDisplayed,
    favoriteShops,
    viewMode,
    setViewMode,
    filteredCategories,
    filteredType,
    mapRef,
    allShops,
    allEvents,
    research,
}) {
    function updateViewMode(newMode) {
        setViewMode(newMode)
    }
    // function toggleSideBar() {
    //     const barState = isSideBarOpened
    //     setSideBarOpened(!barState)
    // }

    function handleChangeScope(newScope) {
        if (viewMode === newScope) {
            setSideBarOpened(false)
            updateViewMode('')
        } else {
            updateViewMode(newScope)
            setSideBarOpened(true)
            if (research === '') {
                setDisplayedShops(
                    recursiveCategoryFilter(
                        filteredCategories,
                        filterByType(
                            filteredType,
                            initDisplayedShops(
                                mapRef.current,
                                newScope,
                                getAllShopsFromScope(
                                    newScope,
                                    allShops,
                                    favoriteShops,
                                    allEvents
                                )
                            )
                        )
                    )
                        .sort(alphabetical)
                        .slice(0, 100)
                )
            } else {
                setDisplayedShops(
                    filterShopsBySearch(
                        research,
                        recursiveCategoryFilter(
                            filteredCategories,
                            filterByType(
                                filteredType,
                                getAllShopsFromScope(
                                    newScope,
                                    allShops,
                                    favoriteShops,
                                    allEvents
                                )
                            )
                        )
                    )
                )
            }
        }
        setItemsDisplayed(20)
    }

    return (
        <MenuWrapper isSideBarOpened={isSideBarOpened}>
            <IconWrapper>
                <MenuIcon
                    src={list}
                    onClick={() => {
                        handleChangeScope('browse')
                    }}
                    active={viewMode === 'browse'}
                ></MenuIcon>
                <MenuIcon
                    src={event}
                    onClick={() => {
                        handleChangeScope('events')
                    }}
                    active={viewMode === 'events'}
                ></MenuIcon>
                <MenuIcon
                    src={favorites}
                    onClick={() => {
                        handleChangeScope('favorites')
                    }}
                    active={viewMode === 'favorites'}
                ></MenuIcon>
            </IconWrapper>

            <LanguageContainer>
                <LanguageButton>EN</LanguageButton>
                <LanguageButton>JP</LanguageButton>
            </LanguageContainer>
        </MenuWrapper>
    )
}

export default MenuBar
