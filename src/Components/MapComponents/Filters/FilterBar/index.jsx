import styled from 'styled-components'
import CategoryFilterButton from '../CategoryFilters/CategoryFilterButton'
import InputFilter from '../InputFilter'

import { useContext } from 'react'
import { FiltersMenuContext } from '../../../../utils/Context/FiltersMenuContext'
import TypeDropdownFilter from '../TypeFilter/TypeDropdownFilter'
import layout, { devices } from '../../../../utils/Style/Layout'
import colors from '../../../../utils/Style/Colors'
import { UserInterfaceContext } from '../../../../utils/Context/UserInterfaceContext'
import { useWindowSize } from '../../../../utils/Hooks/WindowSize'

const LeftFilters = styled.div`
    padding: 15px;

    z-index: 900;

    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-shrink: 0;

    @media ${devices.mobileS} {
        width: calc(100% - 30px);
    }
    @media ${devices.tablet} {
        width: calc(${layout.SideBarWidthPx} - 30px);
    }
`

const FilterBarWrapper = styled.div`
    position: absolute;
    top: 0px;

    display: flex;
    flex-direction: column;
    height: 100%;

    justify-content: space-between;
    left: ${layout.menuBarWidthPx};
    margin-bottom: 20px;

    @media ${devices.mobileS} {
        width: 100%;
        flex-wrap: wrap;
        left: 0px;
        pointer-events: ${(props) => props.pointer};
    }
    @media ${devices.tablet} {
        width: calc(
            100% - ${layout.menuBarWidthPx} - 2 * ${layout.overlaysSpacingPx}
        );
        flex-wrap: nowrap;
        pointer-events: none;
        padding-left: ${layout.menuBarWidthPx};
    }
`

const CategoryFilters = styled.div`
    padding: 15px;

    display: flex;
    overflow-x: scroll;

    z-index: 500;

    @media ${devices.mobileS} {
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;
        transform: translateY(-20px);
    }
    @media ${devices.tablet} {
        flex-wrap: nowrap;
        justify-content: flex-start;
        gap: 20px;
        transform: translateY(0px);
    }
`

const FiltersContainer = styled.div`
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    align-self: start;

    @media ${devices.mobileS} {
        width: 100%;

        flex-wrap: wrap;
        left: 0px;
        background-color: ${(props) =>
            props.isSideBarOpen ? colors.primaryBackground : null};

        margin-bottom: -50px;
    }
    @media ${devices.tablet} {
        width: calc(
            100% - ${layout.menuBarWidthPx} - 2 * ${layout.overlaysSpacingPx}
        );
        flex-wrap: nowrap;
        background-color: transparent;
    }
`

function FilterBar({ children }) {
    const { CategoriesMenu } = useContext(FiltersMenuContext)
    const { isSideBarOpen, modalShop } = useContext(UserInterfaceContext)
    const { mode } = useWindowSize()

    return (
        <FilterBarWrapper pointer={isSideBarOpen ? 'auto' : 'none'}>
            <FiltersContainer
                isSideBarOpen={isSideBarOpen}
                visible={mode !== 'mobile' || !modalShop.id}
            >
                <LeftFilters>
                    <InputFilter />
                    <TypeDropdownFilter />
                </LeftFilters>
                <CategoryFilters>
                    {CategoriesMenu.map((cat, index) => (
                        <CategoryFilterButton key={index} CATEGORY={cat} />
                    ))}
                </CategoryFilters>
            </FiltersContainer>
            {children}
        </FilterBarWrapper>
    )
}

export default FilterBar
