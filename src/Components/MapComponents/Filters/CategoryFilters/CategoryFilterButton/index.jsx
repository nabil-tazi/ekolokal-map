import { useContext } from 'react'
import { ShopsDataContext } from '../../../../../utils/Context/ShopsDataContext'
// import fairtrade from '../../../assets/fairtrade.png'
// import nobin from '../../../assets/nobin.png'
// import noplastic from '../../../assets/noplastic.png'
// import organic from '../../../assets/organic.png'
// import plantbased from '../../../assets/plantbased.png'

import styled from 'styled-components'
import { UserInterfaceContext } from '../../../../../utils/Context/UserInterfaceContext'

const CategoryIcon = styled.img`
    width: 28px;
    margin-left: 10px;
    margin-right: 5px;
    filter: ${(props) =>
        props.active === 'active'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`
const CategoryFilter = styled.div`
    max-width: 100px;
    height: 37px;
    line-height: 13px;
    /* background-color: #f8f8f4; */
    z-index: 500;
    border-radius: 20px;
    /* color: #292929; */
    color: ${(props) => (props.active === 'active' ? 'white' : '#292929')};
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;
    text-shadow: ${(props) =>
        props.active === 'active' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};

    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding-right: 10px;
    box-shadow: 0px 0px 10px gray;
    background-color: ${(props) =>
        props.active === 'active' ? '#b2bdca' : '#f8f8f4'};

    &:hover {
        background-color: ${(props) =>
            props.active === 'active' ? '#b2bdca' : '#e9e9e9'};
    }
`

function CategoryFilterButton({ CATEGORY }) {
    const {
        filteredCategories,
        saveFilteredCategories,
        ACTIONS,
        updateDisplayedShops,
    } = useContext(ShopsDataContext)

    const { closeOverview } = useContext(UserInterfaceContext)

    function handleCategoryClick(clickedCategory) {
        const filteringDown = !filteredCategories.includes(clickedCategory)

        const newFilters = filteringDown
            ? [...filteredCategories, clickedCategory]
            : filteredCategories.filter((e) => e.ID !== clickedCategory.ID)

        saveFilteredCategories(newFilters)
        closeOverview()

        updateDisplayedShops(ACTIONS.CHANGE_CATEGORIES, newFilters)
    }

    return (
        <CategoryFilter
            onClick={() => handleCategoryClick(CATEGORY)}
            active={
                filteredCategories.includes(CATEGORY) ? 'active' : 'inactive'
            }
        >
            <CategoryIcon
                src={CATEGORY.IMG}
                title={CATEGORY.ENGLISH}
                active={
                    filteredCategories.includes(CATEGORY)
                        ? 'active'
                        : 'inactive'
                }
            ></CategoryIcon>
            {CATEGORY.ENGLISH}
        </CategoryFilter>
    )
}

export default CategoryFilterButton
