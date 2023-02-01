import styled from 'styled-components'
import list from '../../../assets/browse.png'
import event from '../../../assets/temporary.png'
import favorites from '../../../assets/favorites.png'

import { updateShops } from '../../../utils/maputils'
const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

import { useContext } from 'react'
import { ScopeContext } from '../../../utils/context/ScopeContext'
import { TypeCategoryContext } from '../../../utils/context/TypeCategoryContext'

const MenuIcon = styled.img`
    width: 35px;
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
    isSideBarOpened,
    setSideBarOpened,
    setItemsDisplayed,
    setDropdownOpen,
}) {
    const { viewMode, switchViewMode, changeScope } = useContext(ScopeContext)
    const { TypesMenu, setTypesMenu } = useContext(TypeCategoryContext)

    function handleChangeScope(clickedScope) {
        setDropdownOpen(false)
        var newScope = clickedScope
        if (viewMode === clickedScope) {
            setSideBarOpened(false)
            newScope = ''
            switchViewMode('')
            setTypesMenu('')
        } else {
            switchViewMode(newScope)
            setSideBarOpened(true)
        }
        changeScope(newScope)
        setTypesMenu(newScope)
        // updateDisplayedShops(
        //     updateShops(
        //         allShops,
        //         allEvents,
        //         favoriteShops,
        //         research,
        //         filteredCategories,
        //         filteredType,
        //         mapRef.current,
        //         newScope
        //     )
        // )

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
