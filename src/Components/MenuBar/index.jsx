import styled from 'styled-components'
import { ScopesMenu } from '../../utils/Configuration/ScopeConfig'
import { useContext } from 'react'
import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../utils/Context/FiltersMenuContext'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { ScopeContext } from '../../utils/Context/ScopeContext'
import layout from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'
import font from '../../utils/Style/Font'

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
    width: ${layout.menuBarWidth};
    height: 100vh;
    background-color: ${colors.primaryBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 700;

    box-shadow: ${(props) =>
        props.isSideBarOpen ? '0px 0px 0px gray' : '0px 0px 10px gray'};
    border-right: ${(props) =>
        props.isSideBarOpen ? '.2px solid #a0a0a0' : '0px 0px 10px gray'};
`
const LanguageContainer = styled.div`
    color: ${colors.primaryText};
    font-size: ${font.textSize};
    margin: 10px;
    display: flex;
    justify-content: space-between;
`
const LanguageButton = styled.div`
    margin: 5px;
    user-select: none;
    cursor: pointer;
`

function MenuBar() {
    const { updateDisplayedShops, ACTIONS } = useContext(ShopsDataContext)
    const { currentScope, switchScope } = useContext(ScopeContext)
    const { updateTypesMenu } = useContext(FiltersMenuContext)

    const { isSideBarOpen, toggleSideBar, closeDropdown, resetLazyLoad } =
        useContext(UserInterfaceContext)

    function handleChangeScope(clickedScope) {
        resetLazyLoad()
        closeDropdown()
        if (clickedScope.ID === currentScope.ID || !isSideBarOpen)
            toggleSideBar()
        updateDisplayedShops(ACTIONS.CHANGE_SCOPE, {
            clickedScope: clickedScope,
            isNewScope: clickedScope.ID === currentScope.ID,
        })
        updateTypesMenu(clickedScope)
        switchScope(clickedScope)
    }

    return (
        <MenuWrapper isSideBarOpen={isSideBarOpen}>
            <IconWrapper>
                {ScopesMenu.map((scopeItem, index) => (
                    <MenuIcon
                        key={index}
                        src={scopeItem.IMG}
                        onClick={() => {
                            handleChangeScope(scopeItem)
                        }}
                        active={scopeItem.ID === currentScope.ID}
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
