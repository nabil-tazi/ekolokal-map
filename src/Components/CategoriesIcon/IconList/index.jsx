import fairtrade from '../../../assets/fairtrade.png'
import nobin from '../../../assets/nobin.png'
import noplastic from '../../../assets/noplastic.png'
import organic from '../../../assets/organic.png'
import plantbased from '../../../assets/plantbased.png'

import styled from 'styled-components'

const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const CategoryIcon = styled.img`
    width: 30px;
    height: 30px;
    margin: 5px;
`

function IconList({ iconSize, shop }) {
    return (
        <CategoriesContainer>
            {shop.categories &&
                shop.categories.map((cat) => {
                    switch (cat.slug) {
                        case 'plant-based':
                            return (
                                <CategoryIcon
                                    src={plantbased}
                                    title={cat.slug}
                                    key={cat.slug}
                                ></CategoryIcon>
                            )
                        case 'zero-waste':
                            return (
                                <CategoryIcon
                                    src={nobin}
                                    title={cat.slug}
                                    key={cat.slug}
                                ></CategoryIcon>
                            )
                        case 'plastic-free':
                            return (
                                <CategoryIcon
                                    src={noplastic}
                                    title={cat.slug}
                                    key={cat.slug}
                                ></CategoryIcon>
                            )
                        case 'organic':
                            return (
                                <CategoryIcon
                                    src={organic}
                                    title={cat.slug}
                                    key={cat.slug}
                                ></CategoryIcon>
                            )
                        case 'fairtrade':
                            return (
                                <CategoryIcon
                                    src={fairtrade}
                                    title={cat.slug}
                                    key={cat.slug}
                                ></CategoryIcon>
                            )
                        default:
                            return
                    }
                })}
        </CategoriesContainer>
    )
}

export default IconList
