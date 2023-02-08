import { useContext } from 'react'
import { ShopsDataContext } from '../../../../../utils/context/ShopsDataContext'
import { FiltersMenuContext } from '../../../../../utils/context/FiltersMenuContext'

import styled from 'styled-components'
import { UserInterfaceContext } from '../../../../../utils/context/UserInterfaceContext'

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

function TypeDropdownEntry({ TYPE }) {
    const { filteredType, saveFilteredType, ACTIONS, updateDisplayedShops } =
        useContext(ShopsDataContext)
    const { updateCategoriesMenu } = useContext(FiltersMenuContext)
    const { closeDropdown } = useContext(UserInterfaceContext)

    function handleTypeSelect(newType) {
        closeDropdown()
        saveFilteredType(newType)
        updateDisplayedShops(ACTIONS.CHANGE_TYPE, newType)
        updateCategoriesMenu(newType)
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
