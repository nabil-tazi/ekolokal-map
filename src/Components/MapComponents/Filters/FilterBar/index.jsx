import styled from 'styled-components'
import CategoryFilterButton from '../CategoryFilters/CategoryFilterButton'
import InputFilter from '../InputFilter'

import { useContext } from 'react'
import { FiltersMenuContext } from '../../../../utils/Context/FiltersMenuContext'
import TypeDropdownFilter from '../TypeFilter/TypeDropdownFilter'
import layout from '../../../../utils/Style/Layout'

const FilterBarWrapper = styled.div`
    position: absolute;
    top: 5px;
    width: calc(100% - ${layout.menuBarWidth} - 30px);
    left: calc(${layout.menuBarWidth} + 20px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    z-index: 600;
`

const CategoryFilters = styled.div`
    padding: 15px;
    /* width: calc(100%); */
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    overflow-x: scroll;
`

function FilterBar() {
    const { CategoriesMenu } = useContext(FiltersMenuContext)

    return (
        <FilterBarWrapper>
            <InputFilter />
            <TypeDropdownFilter />
            <CategoryFilters>
                {CategoriesMenu.map((cat, index) => (
                    <CategoryFilterButton key={index} CATEGORY={cat} />
                ))}
            </CategoryFilters>
        </FilterBarWrapper>
    )
}

export default FilterBar
