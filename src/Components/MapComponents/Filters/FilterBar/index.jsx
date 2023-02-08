import styled from 'styled-components'

import CategoryFilterButton from '../CategoryFilters/CategoryFilterButton'
import InputFilter from '../InputFilter'

import { useContext, useEffect } from 'react'
import { ShopsDataContext } from '../../../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../../../utils/Context/FiltersMenuContext'
import { UserInterfaceContext } from '../../../../utils/Context/UserInterfaceContext'
import TypeDropdownFilter from '../TypeFilter/TypeDropdownFilter'

const FilterBarWrapper = styled.div`
    position: absolute;
    height: 40px;
    width: calc(100% - 120px);
    left: calc(60px + 30px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    z-index: 600;
`

const CategoryFilters = styled.div`
    padding: 15px;
    width: calc(100%-200px);
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    overflow-x: scroll;
`

function FilterBar({ inputRef }) {
    const { research, mapRef, displayedShops } = useContext(ShopsDataContext)
    const { CategoriesMenu } = useContext(FiltersMenuContext)
    const { openModal } = useContext(UserInterfaceContext)

    useEffect(() => {
        if (displayedShops.length === 1 && research) {
            openModal(
                mapRef.current,
                [
                    parseFloat(displayedShops[0].geolocation_lat[0]),
                    parseFloat(displayedShops[0].geolocation_long[0]),
                ],
                displayedShops[0].id,
                16
            )
        }
    }, [displayedShops])

    return (
        <FilterBarWrapper>
            <InputFilter inputRef={inputRef} />
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
