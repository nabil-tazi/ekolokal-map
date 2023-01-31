import styled from 'styled-components'
import cross from '../../../assets/cross.png'
import search from '../../../assets/search.png'
import list from '../../../assets/list.png'
import arrow from '../../../assets/down.png'

import { CATEGORIES } from '../../../utils/configuration/CategoriesConfig'
import { TYPES } from '../../../utils/configuration/TypeConfig'

import CategoryFilterButton from '../CategoryFilterButton'
import TypeFilterEntry from '../TypeFilterEntry'

import { openModal, closeModal, formatType } from '../../../utils/maputils'

import { useContext, useEffect } from 'react'
import { ScopeContext } from '../../../utils/context'

const FilterBarWrapper = styled.div`
    position: absolute;
    height: 40px;
    width: calc(100% - 120px);
    /* width: 100%; */
    /* left: 480px; */
    left: 90px;
    top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    z-index: 600;
`
const InputFilter = styled.div`
    z-index: 500;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const RemoveSearchInput = styled.img`
    width: 25px;
    border-radius: 25px;
    &:hover {
        background-color: #00000010;
    }

    right: 10px;
    box-sizing: border-box;
    z-index: 500;
    cursor: pointer;
    position: absolute;
    padding: 7.5px;
    filter: ${(props) =>
        props.active === 'active'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

const ResearchIcon = styled.img`
    height: 17px;
    width: 17px;
    margin: 3px;
    position: absolute;
    box-sizing: border-box;
    left: 5px;
    filter: ${(props) =>
        props.active === 'active'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

const ResearchInput = styled.input`
    width: 90px;
    height: 35px;
    border-radius: 20px;
    margin-right: 5px;
    border: 0;
    box-shadow: 0px 0px 10px gray;
    padding-left: 2rem;
    padding-right: 30px;
    color: #292929;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;

    &:focus {
        outline: none;
    }
    text-shadow: ${(props) =>
        props.active === 'active' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};
    color: ${(props) => (props.active === 'active' ? 'white' : '#292929')};

    background-color: ${(props) =>
        props.active === 'active' ? '#b2bdca' : '#f8f8f4'};
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
    width: 130px;
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

const TypeFilterContainer = styled.div``

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
    transform: translateY(-10px) translateX(12px);
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
    const {
        research,
        updateResearch,
        mapRef,
        viewMode,
        filteredType,
        inputSearch,
        displayedShops,
    } = useContext(ScopeContext)

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

    const handleKeyPressed = (e) => {
        if (e.key === 'Enter') {
            handleSearchInput()
        }
    }

    function handleSearchInput() {
        const input = inputRef.current.value
        updateResearch(input)
        inputSearch(input)

        if (input !== '') setSideBarOpened(true)
    }

    function handleOpenDropDown() {
        setDropdownOpen(!isDropdownOpen)
    }

    function handleInputChange() {
        closeModal(setOverview, setDropdownOpen, setModalShopId)
    }

    function closeDropdown() {
        setDropdownOpen(false)
    }

    const categoriesList = [
        CATEGORIES.PLANTBASED,
        CATEGORIES.ORGANIC,
        CATEGORIES.FAIRTRADE,
        CATEGORIES.ZEROWASTE,
        CATEGORIES.TAKEOUT,
    ]

    const typeList = [
        TYPES.ALL,
        TYPES.RESTAURANTCAFE,
        TYPES.SUPERMARKET,
        TYPES.LOCALSTORE,
    ]

    return (
        <FilterBarWrapper>
            <InputFilter forbidden={viewMode === 'browse' || viewMode === ''}>
                <ResearchIcon
                    src={search}
                    active={research !== '' ? 'active' : 'inactive'}
                ></ResearchIcon>
                <ResearchInput
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    onBlur={() => {
                        handleSearchInput()
                    }}
                    onClick={closeDropdown}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPressed}
                    active={research !== '' ? 'active' : 'inactive'}
                    forbidden={viewMode === 'browse' || viewMode === ''}
                ></ResearchInput>
                {research && (
                    <RemoveSearchInput
                        src={cross}
                        onClick={() => {
                            inputRef.current.value = ''
                            handleSearchInput()
                        }}
                        active={research !== '' ? 'active' : 'inactive'}
                    ></RemoveSearchInput>
                )}
            </InputFilter>
            <TypeFilterContainer>
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
                        {typeList.map((type, index) => (
                            <TypeFilterEntry
                                key={index}
                                TYPE={type}
                                setDropdownOpen={setDropdownOpen}
                            ></TypeFilterEntry>
                        ))}
                    </Dropdown>
                )}
            </TypeFilterContainer>
            <CategoryFilters>
                {categoriesList.map((cat, index) => (
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
