import { useContext } from 'react'
import { ScopeContext } from '../../../utils/context'
import { formatCategory } from '../../../utils/maputils'

import styled from 'styled-components'

const DropdownEntry = styled.div`
    background-color: #f8f8f4;
    padding: 3px;
    text-align: center;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;
    color: ${(props) => (props.active === 'active' ? 'white' : '#292929')};
    border-radius: 5px;
    border: 5px solid transparent;

    cursor: pointer;
    &:hover {
        background-color: ${(props) =>
            props.active === 'active' ? '#b2bdca' : '#00000010'};
    }

    background-color: ${(props) =>
        props.active === 'active' ? '#b2bdca' : '#f8f8f4'};
`

function TyperFilterEntry({ TYPE, setDropdownOpen }) {
    const { filteredType, updateType, changeType } = useContext(ScopeContext)

    function handleTypeSelect(newType) {
        setDropdownOpen(false)
        updateType(newType)
        changeType(newType)
    }

    return (
        <DropdownEntry
            onClick={() => handleTypeSelect(TYPE.ID)}
            active={filteredType === TYPE.ID ? 'active' : 'inactive'}
        >
            {TYPE.ENGLISH}
        </DropdownEntry>
    )
}

export default TyperFilterEntry
