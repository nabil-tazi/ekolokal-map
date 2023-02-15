import { useContext } from 'react'
import { ShopsDataContext } from '../../../../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../../../../utils/Context/FiltersMenuContext'

import styled from 'styled-components'
import { UserInterfaceContext } from '../../../../../utils/Context/UserInterfaceContext'
import layout from '../../../../../utils/Style/Layout'
import colors from '../../../../../utils/Style/Colors'

const DropdownEntry = styled.div`
    padding: 3px;
    text-align: center;

    color: ${(props) =>
        props.active === 'active' ? colors.activeText : colors.primaryText};
    border-radius: ${layout.slightBorderRadius};
    border: 5px solid transparent;

    cursor: pointer;
    &:hover {
        background-color: ${(props) =>
            props.active === 'active'
                ? colors.activeBackground
                : colors.hoverBackground};
    }

    background-color: ${(props) =>
        props.active === 'active'
            ? colors.activeBackground
            : colors.primaryBackground};
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
            active={filteredType.ID === TYPE.ID ? 'active' : 'inactive'}
        >
            {TYPE.ENGLISH}
        </DropdownEntry>
    )
}

export default TypeDropdownEntry
