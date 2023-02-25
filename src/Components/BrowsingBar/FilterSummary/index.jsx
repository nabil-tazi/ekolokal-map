import styled from 'styled-components'
import { useContext } from 'react'
import { ShopsDataContext } from '../../../utils/Context/ShopsDataContext'
import { UserInterfaceContext } from '../../../utils/Context/UserInterfaceContext'
import colors from '../../../utils/Style/Colors'
import font from '../../../utils/Style/Font'
import layout from '../../../utils/Style/Layout'
import { devices } from '../../../utils/Style/Layout'

const Summary = styled.div`
    /* width: 80%; */
    margin: auto;
    padding: 12px 20px 12px 20px;
    /* margin-bottom: 10px; */

    @media ${devices.mobileS} {
        margin: 20px;
        margin-bottom: 10px;
    }

    @media ${devices.tablet} {
        margin-top: 50px;
        margin-bottom: 10px;
    }
    border-radius: ${layout.slightBorderRadius};
    font-size: ${font.textSize};
    color: ${colors.primaryText};
    background-color: ${colors.hoverBackground};
`

const SummaryContainer = styled.div`
    @media ${devices.mobileS} {
        box-shadow: 0px 0px 10px gray;
    }

    @media ${devices.tablet} {
        width: 100%;
        box-shadow: none;
    }
    z-index: 600;

    background-color: ${(props) =>
        props.isSideBarOpen ? colors.primaryBackground : null};
`

function FilterSummary() {
    const {
        research,
        filteredCategories,
        displayedShops,
        filteredType,
        noResearch,
    } = useContext(ShopsDataContext)

    const { isSideBarOpen } = useContext(UserInterfaceContext)

    return (
        <SummaryContainer isSideBarOpen={isSideBarOpen}>
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
                {filteredType.ID !== 'all' && <>"{filteredType.ENGLISH}" </>}{' '}
                shops found{research && <> for "{research}"</>}
                {filteredCategories.length > 1 && (
                    <>
                        {' '}
                        matching the {filteredCategories.length} selected
                        categories
                    </>
                )}
                {noResearch && <> in the area</>}.
            </Summary>
        </SummaryContainer>
    )
}

export default FilterSummary
