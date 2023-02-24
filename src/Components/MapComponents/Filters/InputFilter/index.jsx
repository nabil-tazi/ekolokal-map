import { useContext, useRef } from 'react'

import styled from 'styled-components'

import cross from '../../../../assets/cross.png'
import search from '../../../../assets/search.png'

import { ShopsDataContext } from '../../../../utils/Context/ShopsDataContext'
import { UserInterfaceContext } from '../../../../utils/Context/UserInterfaceContext'
import layout, { devices } from '../../../../utils/Style/Layout'
import colors from '../../../../utils/Style/Colors'
import font from '../../../../utils/Style/Font'

import { translations } from './InputFilterTranslations'
import { useLanguage } from '../../../../utils/Hooks/Language'

const InputFilterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: auto;
`
const ResearchIcon = styled.img`
    height: 17px;
    width: 17px;
    margin: 3px;
    position: absolute;
    box-sizing: border-box;
    left: 5px;
    filter: ${(props) =>
        props.active === 'active'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

const ResearchInput = styled.input`
    @media ${devices.mobileS} {
        width: calc(((100vw - 110px) / 2) - 60px);
        /* width: 100vw; */
    }
    @media ${devices.tablet} {
        width: calc(((${layout.SideBarWidthPx} - 30px) / 2) - 60px);
    }
    /* width: calc(((${layout.SideBarWidthPx} - 30px) / 2) - 60px); */

    height: 35px;
    border-radius: 20px;
    margin-right: 5px;
    border: 0;
    box-shadow: 0px 0px 10px gray;
    -webkit-appearance: none;

    padding-left: 30px;
    padding-right: 30px;
    /* font-size: ${font.textSize}; */
    font-size: 16px;

    &:focus {
        outline: none;
    }
    text-shadow: ${(props) =>
        props.active === 'active' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};
    color: ${(props) =>
        props.active === 'active' ? colors.activeText : colors.primaryText};

    background-color: ${(props) =>
        props.active === 'active'
            ? colors.activeBackground
            : colors.primaryBackground};
`

const RemoveSearchInput = styled.img`
    width: 25px;
    border-radius: 25px;
    &:hover {
        background-color: #00000010;
    }

    right: 10px;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    padding: 7.5px;
    filter: ${(props) =>
        props.active === 'active'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

function InputFilter() {
    const { research, noResearch, setResearch, updateDisplayedShops, ACTIONS } =
        useContext(ShopsDataContext)

    const { openSideBar, closeDropdown, closeModal } =
        useContext(UserInterfaceContext)

    const { currentLanguage } = useLanguage()

    const inputRef = useRef(null)

    function handleSearchInput() {
        const currentInput = inputRef.current.value
        setResearch(currentInput)
        updateDisplayedShops(ACTIONS.CHANGE_SEARCH_INPUT, currentInput)
        currentInput !== '' && openSideBar()
    }

    return (
        <InputFilterWrapper>
            <ResearchIcon
                src={search}
                active={noResearch ? 'inactive' : 'active'}
            ></ResearchIcon>
            <ResearchInput
                ref={inputRef}
                type="text"
                placeholder={translations.PlaceHolder[currentLanguage.ID]}
                onBlur={handleSearchInput}
                onClick={closeDropdown}
                onChange={closeModal}
                onKeyDown={(e) => {
                    e.key === 'Enter' && handleSearchInput()
                }}
                active={noResearch ? 'inactive' : 'active'}
            ></ResearchInput>
            {research && (
                <RemoveSearchInput
                    src={cross}
                    onClick={() => {
                        inputRef.current.value = ''
                        handleSearchInput()
                    }}
                    active={noResearch ? 'inactive' : 'active'}
                ></RemoveSearchInput>
            )}
        </InputFilterWrapper>
    )
}

export default InputFilter
