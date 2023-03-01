import styled from 'styled-components'
import { CATEGORIES } from '../../utils/Configuration/CategoriesConfig'

const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
`

const CategoryIcon = styled.img`
    width: ${(props) => props.iconSize};
    height: ${(props) => props.iconSize};
    margin: 5px;
`

function IconList({ iconSize, shop }) {
    return (
        <CategoriesContainer>
            {shop.categories &&
                [...new Set(shop.categories)].map((category) => {
                    const MatchingCategory = Object.values(CATEGORIES).find(
                        (cat) => cat.ID === category.slug
                    )
                    return MatchingCategory ? (
                        <CategoryIcon
                            src={MatchingCategory.IMG}
                            title={MatchingCategory.ID}
                            key={MatchingCategory.ID}
                            iconSize={iconSize}
                        ></CategoryIcon>
                    ) : null
                })}
        </CategoriesContainer>
    )
}

export default IconList
