import styled from 'styled-components'

import { SCOPES, ScopesMenu } from '../../utils/configuration/ScopeConfig'
import { useContext } from 'react'
import { ScopeContext } from '../../utils/context/ScopeContext'
import { TypeCategoryContext } from '../../utils/context/TypeCategoryMenuContext'

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`
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
    const {
        viewMode,
        switchViewMode,
        changeScope,
        updateDisplayedShops,
        ACTIONS,
    } = useContext(ScopeContext)
    const { setTypesMenu } = useContext(TypeCategoryContext)

    function handleChangeScope(clickedScope) {
        setDropdownOpen(false)
        var newScope = clickedScope
        if (viewMode === clickedScope) {
            setSideBarOpened(false)
            newScope = SCOPES.NONE
        } else {
            setSideBarOpened(true)
        }
        switchViewMode(newScope)
        // changeScope(newScope)
        updateDisplayedShops(ACTIONS.CHANGE_SCOPE, newScope)
        setTypesMenu(newScope)

        setItemsDisplayed(20)
    }

    return (
        <MenuWrapper isSideBarOpened={isSideBarOpened}>
            <IconWrapper>
                {ScopesMenu.map((scope, index) => (
                    <MenuIcon
                        key={index}
                        src={scope.IMG}
                        onClick={() => {
                            handleChangeScope(scope)
                        }}
                        active={viewMode === scope}
                    ></MenuIcon>
                ))}
            </IconWrapper>
            <LanguageContainer>
                <LanguageButton>EN</LanguageButton>
                <LanguageButton>JP</LanguageButton>
            </LanguageContainer>
        </MenuWrapper>
    )
}

export default MenuBar
