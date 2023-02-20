import styled from 'styled-components'
import CategoryFilterButton from '../CategoryFilters/CategoryFilterButton'
import InputFilter from '../InputFilter'

import { useContext } from 'react'
import { FiltersMenuContext } from '../../../../utils/Context/FiltersMenuContext'
import TypeDropdownFilter from '../TypeFilter/TypeDropdownFilter'
import layout, { devices } from '../../../../utils/Style/Layout'
import Logo from '../../../../utils/GenericComponents/Logo'

const LeftFilters = styled.div`
    padding: 15px;

    display: flex;
    flex-direction: row;
    gap: 10px;

    @media ${devices.mobileS} {
        width: 100vw;
        /* margin-left: 50px; */
    }
    @media ${devices.tablet} {
        width: ${layout.SideBarWidthPx};
    }
`

const FilterBarWrapper = styled.div`
    position: absolute;
    top: 0px;
    /* padding: 15px; */

    width: calc(
        100% - ${layout.menuBarWidthPx} - 2 * ${layout.overlaysSpacingPx}
    );
    display: flex;
    /* align-items: flex-start; */
    /* align-content: flex-start; */
    /* gap: 10px; */
    z-index: 600;

    @media ${devices.mobileS} {
        flex-wrap: wrap;
        left: 10px;
    }
    @media ${devices.tablet} {
        flex-wrap: nowrap;
        left: calc(${layout.menuBarWidthPx} + ${layout.overlaysSpacingPx});
    }
`

const CategoryFilters = styled.div`
    padding: 15px;
    display: flex;
    overflow-x: scroll;
    @media ${devices.mobileS} {
        width: 100vw;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;
    }
    @media ${devices.tablet} {
        flex-wrap: nowrap;
        justify-content: flex-start;

        gap: 20px;
    }
`

function FilterBar() {
    const { CategoriesMenu } = useContext(FiltersMenuContext)

    return (
        <FilterBarWrapper>
            <LeftFilters>
                <InputFilter />
                <TypeDropdownFilter />
            </LeftFilters>

            <CategoryFilters>
                {CategoriesMenu.map((cat, index) => (
                    <CategoryFilterButton key={index} CATEGORY={cat} />
                ))}
            </CategoryFilters>
        </FilterBarWrapper>
    )
}

export default FilterBar
