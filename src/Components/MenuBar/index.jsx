import styled from 'styled-components'
import { ScopesMenu } from '../../utils/Configuration/ScopeConfig'
import { useContext } from 'react'
import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../utils/Context/FiltersMenuContext'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { ScopeContext } from '../../utils/Context/ScopeContext'
import layout from '../../utils/Style/Layout'
import { devices } from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'
import font from '../../utils/Style/Font'
import { LanguagesMenu } from '../../utils/Configuration/LanguagesConfig'
import { useLanguage } from '../../utils/Hooks/Language'

const MenuWrapper = styled.div`
    position: absolute;
    pointer-events: auto;

    background-color: ${colors.primaryBackground};
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 700;

    @media ${devices.mobileS} {
        bottom: 0;
        width: 100%;
        height: ${layout.menuBarWidthPx};
        flex-direction: row;
    }
    @media ${devices.tablet} {
        left: 0;
        top: 0;
        height: 100%;
        width: ${layout.menuBarWidthPx};
        flex-direction: column;
    }

    box-shadow: ${(props) =>
        props.isSideBarOpen ? '0px 0px 0px gray' : '0px 0px 10px gray'};
    border-right: ${(props) =>
        props.isSideBarOpen ? '.2px solid #a0a0a0' : '0px 0px 10px gray'};
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;

    @media ${devices.mobileS} {
        width: 100%;
        height: ${layout.menuBarWidthPx};
        flex-direction: row;
        justify-content: space-evenly;
    }
    @media ${devices.tablet} {
        margin-top: 15px;
        flex-direction: column;
        gap: 30px;
        justify-content: flex-start;
    }
`
const MenuIcon = styled.img`
    width: 35px;
    padding: 7px;
    cursor: pointer;
    border-radius: ${layout.slightBorderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
        props.active ? colors.activeBackground : null};
`

const LanguageContainer = styled.div`
    color: ${colors.primaryText};
    font-size: ${font.textSize};
    margin: 10px;
    display: flex;
    @media ${devices.mobileS} {
        flex-direction: row;
        display: none;
    }
    @media ${devices.tablet} {
        flex-direction: column;
        display: block;
    }
`
const LanguageButton = styled.div`
    margin: 5px;
    user-select: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) =>
        props.active ? colors.activeBackground : null};

    color: ${(props) =>
        props.active ? colors.activeText : colors.primaryText};
`

function MenuBar() {
    const { updateDisplayedShops, ACTIONS } = useContext(ShopsDataContext)
    const { currentScope, switchScope } = useContext(ScopeContext)
    const { updateTypesMenu } = useContext(FiltersMenuContext)
    const { isSideBarOpen, toggleSideBar, closeDropdown, resetLazyLoad } =
        useContext(UserInterfaceContext)

    const { currentLanguage, setLanguage } = useLanguage()

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
                {LanguagesMenu.map((lang) => (
                    <LanguageButton
                        key={lang.ID}
                        onClick={() => setLanguage(lang)}
                        active={currentLanguage.ID === lang.ID}
                    >
                        {lang.SHORT}
                    </LanguageButton>
                ))}
            </LanguageContainer>
        </MenuWrapper>
    )
}

export default MenuBar
