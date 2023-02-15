import styled from 'styled-components'
import { useContext } from 'react'
import { ShopsDataContext } from '../../../utils/Context/ShopsDataContext'
import colors from '../../../utils/Style/Colors'
import font from '../../../utils/Style/Font'
import layout from '../../../utils/Style/Layout'

const Summary = styled.div`
    width: 80%;
    margin: auto;
    padding: 12px 20px 12px 20px;
    margin-top: 70px;
    margin-bottom: 10px;

    border-radius: ${layout.slightBorderRadius};
    font-size: ${font.textSize};
    color: ${colors.primaryText};
    background-color: ${colors.hoverBackground};
`

function FilterSummary() {
    const {
        research,
        filteredCategories,
        displayedShops,
        filteredType,
        noResearch,
    } = useContext(ShopsDataContext)

    return (
        <Summary>
            {displayedShops.length === 100 && noResearch && <>More than </>}
            {displayedShops.length > 0 ? (
                <>{displayedShops.length} </>
            ) : (
                <>No </>
            )}
            {filteredCategories.length === 1 && (
                <> {filteredCategories[0].ENGLISH.toLowerCase()} </>
            )}
            {filteredType.ID !== 'all' && <>"{filteredType.ENGLISH}" </>} shops
            found{research && <> for "{research}"</>}
            {filteredCategories.length > 1 && (
                <>
                    {' '}
                    matching the {filteredCategories.length} selected categories
                </>
            )}
            {noResearch && <> in the area</>}.
        </Summary>
    )
}

export default FilterSummary
