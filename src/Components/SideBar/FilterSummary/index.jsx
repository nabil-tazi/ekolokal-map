import styled from 'styled-components'
import { useContext } from 'react'
import { ShopsDataContext } from '../../../utils/context/ShopsDataContext'

const Summary = styled.div`
    width: 315px;
    padding: 12px 20px 12px 20px;
    margin: 10px;
    margin-top: 70px;
    border-radius: 7px;
    font-family: sans-serif;
    font-size: 13px;
    line-height: 17px;
    font-weight: 200;
    color: #292929;
    background-color: #e9e9e9;
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
