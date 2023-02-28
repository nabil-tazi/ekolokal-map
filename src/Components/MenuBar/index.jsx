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
import { useWindowSize } from '../../utils/Hooks/WindowSize'

const MenuWrapper = styled.div`
    pointer-events: auto;

    background-color: ${colors.primaryBackground};
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 700;

    @media ${devices.mobileS} {
        /* bottom: 0; */
        width: 100%;
        height: ${layout.menuBarWidthPx};
        flex-direction: row;

        box-shadow: ${(props) =>
            !(props.isSideBarOpen || !props.modalShop)
                ? '0px 0px 10px gray'
                : '0px 0px 0px gray'};

        border-top: ${(props) =>
            props.isSideBarOpen || props.modalShop
                ? '.2px solid #a0a0a0'
                : '0px 0px 10px gray'};
    }

    @media ${devices.tablet} {
        position: absolute;

        left: 0;
        top: 0;
        height: 100%;
        width: ${layout.menuBarWidthPx};
        flex-direction: column;

        box-shadow: ${(props) =>
            props.isSideBarOpen ? '0px 0px 0px gray' : '0px 0px 10px gray'};

        border-right: ${(props) =>
            props.isSideBarOpen ? '.2px solid #a0a0a0' : '0px 0px 10px gray'};

        border-top: none;
    }
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
const MenuItem = styled.div`
    width: 45px;
    height: 45px;
    cursor: pointer;
    user-select: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 7px;

    border-radius: ${layout.slightBorderRadius};

    background-color: ${(props) =>
        props.active ? colors.activeBackground : null};
`

const MenuItemName = styled.div`
    font-size: ${font.textSize};

    color: ${(props) =>
        props.active ? colors.activeText : colors.primaryText};

    text-shadow: ${(props) =>
        props.active ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};
`

const MenuIcon = styled.img`
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    filter: ${(props) =>
        props.active
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

const LanguageContainer = styled.div`
    color: ${colors.primaryText};
    font-size: ${font.textSize};
    margin: 10px;
    display: flex;
    gap: 5px;
    flex-direction: column;
`
const LanguageButton = styled.div`
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
    const {
        isSideBarOpen,
        toggleSideBar,
        closeDropdown,
        resetLazyLoad,
        closeModal,
        modalShop,
    } = useContext(UserInterfaceContext)

    const { currentLanguage, setLanguage } = useLanguage()

    const { mode } = useWindowSize()

    function handleChangeScope(clickedScope) {
        resetLazyLoad()
        closeDropdown()
        if (
            (clickedScope.ID === currentScope.ID &&
                !(mode === 'mobile' && modalShop.id)) ||
            !isSideBarOpen
        ) {
            toggleSideBar()
        }
        if (mode === 'mobile') {
            closeModal()
        }

        updateDisplayedShops(ACTIONS.CHANGE_SCOPE, {
            clickedScope: clickedScope,
            isNewScope: clickedScope.ID === currentScope.ID,
        })
        updateTypesMenu(clickedScope)
        switchScope(clickedScope)
    }

    return (
        <MenuWrapper isSideBarOpen={isSideBarOpen} modalShop={modalShop}>
            <IconWrapper>
                {ScopesMenu.map((scopeItem, index) => (
                    <MenuItem
                        key={index}
                        active={scopeItem.ID === currentScope.ID}
                        onClick={() => {
                            handleChangeScope(scopeItem)
                        }}
                    >
                        <MenuIcon
                            src={scopeItem.IMG}
                            active={scopeItem.ID === currentScope.ID}
                        />
                        <MenuItemName active={scopeItem.ID === currentScope.ID}>
                            {scopeItem[currentLanguage.ID]}
                        </MenuItemName>
                    </MenuItem>
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
