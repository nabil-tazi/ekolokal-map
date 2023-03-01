import { useContext } from 'react'
import { useLanguage } from '../../../../utils/Hooks/Language'
import { ShopsDataContext } from '../../../../utils/Context/ShopsDataContext'
import styled from 'styled-components'
import colors from '../../../../utils/Style/Colors'
import font from '../../../../utils/Style/Font'

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
    pointer-events: auto;

    max-width: 100px;
    height: 37px;
    line-height: ${font.textSize};
    border-radius: 20px;
    color: ${(props) =>
        props.active === 'active' ? colors.activeText : colors.primaryText};
    font-size: ${font.textSize};
    text-shadow: ${(props) =>
        props.active === 'active' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};

    flex-shrink: 0;
    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding-right: 10px;
    box-shadow: 0px 0px 10px gray;
    background-color: ${(props) =>
        props.active === 'active'
            ? colors.activeBackground
            : colors.primaryBackground};

    &:hover {
        background-color: ${(props) =>
            props.active === 'active'
                ? colors.activeBackground
                : colors.hoverBackground};
    }
`

function CategoryFilterButton({ CATEGORY }) {
    const {
        filteredCategories,
        saveFilteredCategories,
        ACTIONS,
        updateDisplayedShops,
    } = useContext(ShopsDataContext)

    const { currentLanguage } = useLanguage()

    function handleCategoryClick(clickedCategory) {
        const filteringDown = !filteredCategories.includes(clickedCategory)

        const newFilters = filteringDown
            ? [...filteredCategories, clickedCategory]
            : filteredCategories.filter((e) => e.ID !== clickedCategory.ID)

        saveFilteredCategories(newFilters)
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
            {CATEGORY[currentLanguage.ID]}
        </CategoryFilter>
    )
}

export default CategoryFilterButton
