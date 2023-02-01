import styled from 'styled-components'
import cross from '../../../../assets/cross.png'
import search from '../../../../assets/search.png'
import arrow from '../../../../assets/down.png'

import CategoryFilterButton from '../CategoryFilters/CategoryFilterButton'
import TypeFilterEntry from '../TypeFilter/TypeFilterEntry'
import InputFilter from '../InputFilter'

import { openModal, formatType } from '../../../../utils/maputils'

import { useContext, useEffect } from 'react'
import { ScopeContext } from '../../../../utils/context/ScopeContext'
import { TypeCategoryContext } from '../../../../utils/context/TypeCategoryContext'

const FilterBarWrapper = styled.div`
    position: absolute;
    height: 40px;
    width: calc(100% - 120px);
    left: 90px;
    top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    z-index: 600;
`

const CategoryFilters = styled.div`
    height: 40px;
    padding: 15px;
    width: calc(100%-200px);
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    z-index: 500;
    flex-wrap: default;
    overflow-x: scroll;
`

const TypeFilter = styled.div`
    height: 37px;
    min-width: 130px;
    line-height: 13px;
    background-color: #f8f8f4;

    z-index: 500;
    border-radius: 20px;
    color: #292929;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-right: 10px;
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
    position: relative;
    margin-right: 40px;
    padding-left: 10px;
    background-color: ${(props) =>
        props.type !== 'all' ? '#b2bdca' : '#f8f8f4'};

    text-shadow: ${(props) =>
        props.type !== 'all' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};

    color: ${(props) => (props.type !== 'all' ? 'white' : '#292929')};
`

const Dropdown = styled.div`
    width: 120px;
    height: 124px;
    font-family: sans-serif;
    font-size: 13px;
    color: #292929;
    font-weight: 200;
    background-color: #f8f8f4;
    z-index: 450;
    border-radius: 5px;
    position: absolute;
    padding: 5px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px gray;
    transform: translateY(82px) translateX(177px);
`

const ArrowDownIcon = styled.img`
    width: 15px;
    &:hover {
        background-color: #00000015;
    }
    border-radius: 15px;
    padding: 5px;
    margin-left: -5px;
    margin-right: -5px;
    filter: ${(props) =>
        props.type !== 'all'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

function FilterBar({
    setModalShopId,
    setOverview,
    setSideBarOpened,
    isDropdownOpen,
    setDropdownOpen,
    inputRef,
}) {
    const { research, mapRef, filteredType, displayedShops } =
        useContext(ScopeContext)

    const { TypesMenu, CategoriesMenu } = useContext(TypeCategoryContext)

    useEffect(() => {
        if (displayedShops.length === 1 && research !== '') {
            openModal(
                mapRef.current,
                [
                    parseFloat(displayedShops[0].geolocation_lat[0]),
                    parseFloat(displayedShops[0].geolocation_long[0]),
                ],
                displayedShops[0].id,
                setModalShopId,
                setOverview,
                16
            )
        }
    }, [displayedShops])

    function handleOpenDropDown() {
        setDropdownOpen(!isDropdownOpen)
    }

    return (
        <FilterBarWrapper>
            <InputFilter
                inputRef={inputRef}
                setDropdownOpen={setDropdownOpen}
                setOverview={setOverview}
                setModalShopId={setModalShopId}
                setSideBarOpened={setSideBarOpened}
            ></InputFilter>
            <TypeFilter onClick={handleOpenDropDown} type={filteredType}>
                {formatType(filteredType)}
                <ArrowDownIcon
                    src={arrow}
                    title="Down-arroarrow-downw"
                    type={filteredType}
                ></ArrowDownIcon>
            </TypeFilter>
            {isDropdownOpen && (
                <Dropdown>
                    {TypesMenu.map((type, index) => (
                        <TypeFilterEntry
                            key={index}
                            TYPE={type}
                            setDropdownOpen={setDropdownOpen}
                        ></TypeFilterEntry>
                    ))}
                </Dropdown>
            )}
            <CategoryFilters>
                {CategoriesMenu.map((cat, index) => (
                    <CategoryFilterButton
                        key={index}
                        CATEGORY={cat}
                        setOverview={setOverview}
                    ></CategoryFilterButton>
                ))}
            </CategoryFilters>
        </FilterBarWrapper>
    )
}

export default FilterBar
