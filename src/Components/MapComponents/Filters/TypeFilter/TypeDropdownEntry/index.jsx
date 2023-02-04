import { useContext } from 'react'
import { ScopeContext } from '../../../../../utils/context/ScopeContext'
import { TypeCategoryContext } from '../../../../../utils/context/TypeCategoryMenuContext'

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

function TypeDropdownEntry({ TYPE, setDropdownOpen }) {
    const {
        filteredType,
        saveFilteredType,
        changeType,
        ACTIONS,
        updateDisplayedShops,
    } = useContext(ScopeContext)
    const { setCategoriesMenu } = useContext(TypeCategoryContext)

    function handleTypeSelect(newType) {
        setDropdownOpen(false)
        saveFilteredType(newType)
        // changeType(newType)
        updateDisplayedShops(ACTIONS.CHANGE_TYPE, newType)
        setCategoriesMenu(newType)
    }

    return (
        <DropdownEntry
            onClick={() => handleTypeSelect(TYPE)}
            active={filteredType === TYPE.ID ? 'active' : 'inactive'}
        >
            {TYPE.ENGLISH}
        </DropdownEntry>
    )
}

export default TypeDropdownEntry
