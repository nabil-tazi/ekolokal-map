import { useContext, useRef } from 'react'

import styled from 'styled-components'

import cross from '../../../../assets/cross.png'
import search from '../../../../assets/search.png'

import { ShopsDataContext } from '../../../../utils/Context/ShopsDataContext'
import { UserInterfaceContext } from '../../../../utils/Context/UserInterfaceContext'

const InputFilterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    width: 90px;
    height: 35px;
    border-radius: 20px;
    margin-right: 5px;
    border: 0;
    box-shadow: 0px 0px 10px gray;
    padding-left: 2rem;
    padding-right: 30px;
    color: #292929;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;

    &:focus {
        outline: none;
    }
    text-shadow: ${(props) =>
        props.active === 'active' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};
    color: ${(props) => (props.active === 'active' ? 'white' : '#292929')};

    background-color: ${(props) =>
        props.active === 'active' ? '#b2bdca' : '#f8f8f4'};
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

    const inputRef = useRef(null)

    function handleInputChange() {
        closeModal()
    }

    function handleSearchInput() {
        setResearch(inputRef.current.value)
        updateDisplayedShops(
            ACTIONS.CHANGE_SEARCH_INPUT,
            inputRef.current.value
        )
        if (inputRef.current.value !== '') openSideBar()
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
                placeholder="Search"
                onBlur={() => {
                    handleSearchInput()
                }}
                onClick={closeDropdown}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchInput()
                    }
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
