import styled from 'styled-components'
import cross from '../../../assets/cross.png'
import search from '../../../assets/search.png'
import list from '../../../assets/list.png'
import arrow from '../../../assets/down.png'

import fairtrade from '../../../assets/fairtrade.png'
import nobin from '../../../assets/nobin.png'
import noplastic from '../../../assets/noplastic.png'
import organic from '../../../assets/organic.png'
import plantbased from '../../../assets/plantbased.png'

import {
    initDisplayedShops,
    getNewBounds,
    positionShopForModal,
    alphabetical,
    openModal,
    closeModal,
    recursiveCategoryFilter,
    filterShopsBySearch,
    localizeSearch,
    formatType,
    formatCategory,
    filterByType,
    getAllShopsFromScope,
} from '../../../utils/maputils'
import { useRef, useState } from 'react'

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
    /* cursor: ${(props) => (props.forbidden ? 'auto' : 'not-allowed')}; */
`

const RemoveSearchInput = styled.img`
    width: 25px;
    border-radius: 25px;
    &:hover {
        background-color: #00000010;
    }

    /* margin: 10px; */
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
    /* top: 30px; */
    left: 5px;
    /* transform: translateY(-50%); */
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
    /* cursor: ${(props) => (props.forbidden ? 'auto' : 'not-allowed')}; */
    /* pointer-events: ${(props) => (props.forbidden ? 'auto' : 'none')}; */

    &:focus {
        outline: none;
    }
    text-shadow: ${(props) =>
        props.active === 'active' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};
    color: ${(props) => (props.active === 'active' ? 'white' : '#292929')};

    background-color: ${(props) =>
        props.active === 'active' ? '#b2bdca' : '#f8f8f4'};

    /* background-color: ${(props) =>
        props.forbidden ? 'null' : '#d8d8d8'}; */
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
    /* font-weight: ${(props) => (props.active === 'active' ? 400 : 200)}; */
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
    /* transform: translate(220px); */
    transform: translateY(-10px) translateX(12px);
`

const DropdownEntry = styled.div`
    /* width: 140px; */
    background-color: #f8f8f4;
    /* height: 25px; */
    padding: 3px;
    text-align: center;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;
    color: ${(props) => (props.active === 'active' ? 'white' : '#292929')};
    border-radius: 5px;
    border: 5px solid transparent;

    cursor: pointer;
    &:hover {
        background-color: ${(props) =>
            props.active === 'active' ? '#b2bdca' : '#00000010'};
    }

    background-color: ${(props) =>
        props.active === 'active' ? '#b2bdca' : '#f8f8f4'};
`

const CategoryIcon = styled.img`
    width: 28px;
    margin-left: 10px;
    margin-right: 5px;
    filter: ${(props) =>
        props.active === 'active'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

const ArrowDownIcon = styled.img`
    width: 15px;
    &:hover {
        background-color: #00000015;
        /* background-color: ${(props) =>
            props.type !== 'all' ? null : '#e9e9e9'}; */
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
    setResearch,
    research,
    displayedShops,
    setDisplayedShops,
    mapRef,
    allShops,
    setModalShopId,
    setOverview,
    setSideBarOpened,
    filteredCategories,
    setFilteredCategories,
    isDropdownOpen,
    setDropdownOpen,
    filteredType,
    setFilteredType,
    inputRef,
    viewMode,
    favoriteShops,
    allEvents,
}) {
    function handleEraseResearch() {
        inputRef.current.value = ''

        closeModal(setOverview, setDropdownOpen, setModalShopId)

        setResearch('')
        setDisplayedShops(
            recursiveCategoryFilter(
                filteredCategories,
                filterByType(
                    filteredType,
                    initDisplayedShops(
                        mapRef.current,
                        viewMode,
                        getAllShopsFromScope(
                            viewMode,
                            allShops,
                            favoriteShops,
                            allEvents
                        )
                    )
                )
            )
                .sort(alphabetical)
                .slice(0, 100)
        )
    }

    const handleKeyPressed = (e) => {
        if (e.key === 'Enter') {
            handleSearchInput()
        }
    }

    function handleCategoryClick(clickedCategory) {
        const copy = filteredCategories
        const copyAllShops = getAllShopsFromScope(
            viewMode,
            allShops,
            favoriteShops,
            allEvents
        )
        const copyDisplayedShops = displayedShops
        const filteringDown = !copy.includes(clickedCategory)

        const newFilters = filteringDown
            ? [...copy, clickedCategory]
            : copy.filter((e) => e !== clickedCategory)

        setFilteredCategories(newFilters)
        setOverview(0)

        if (newFilters.length === 0 && research === '') {
            setDisplayedShops(
                filterByType(
                    filteredType,
                    initDisplayedShops(
                        mapRef.current,
                        viewMode,
                        getAllShopsFromScope(
                            viewMode,
                            allShops,
                            favoriteShops,
                            allEvents
                        )
                    )
                )
                    .sort(alphabetical)
                    .slice(0, 100)
            )
        } else if (filteringDown) {
            setDisplayedShops(
                recursiveCategoryFilter(
                    newFilters,
                    filterByType(filteredType, copyDisplayedShops)
                )
            )
        } else if (research === '') {
            setDisplayedShops(
                recursiveCategoryFilter(
                    newFilters,
                    filterByType(
                        filteredType,
                        initDisplayedShops(
                            mapRef.current,
                            viewMode,
                            getAllShopsFromScope(
                                viewMode,
                                allShops,
                                favoriteShops,
                                allEvents
                            )
                        )
                    )
                        .sort(alphabetical)
                        .slice(0, 100)
                )
            )
        } else {
            console.log('heavy')
            setDisplayedShops(
                recursiveCategoryFilter(
                    newFilters,
                    filterShopsBySearch(
                        research,
                        filterByType(filteredType, copyAllShops)
                    )
                )
            )
        }
    }

    // function filterByType(type, shops) {
    //     return type === 'all'
    //         ? shops
    //         : shops.filter((shop) => {
    //               if (shop.categories)
    //                   return shop.categories.some((cat) => cat.slug === type)
    //               else return false
    //           })
    // }

    function handleTypeSelect(newType) {
        setDropdownOpen(false)
        setFilteredType(newType)

        if (filteredCategories.length === 0 && research === '') {
            setDisplayedShops(
                filterByType(
                    newType,
                    initDisplayedShops(
                        mapRef.current,
                        viewMode,
                        getAllShopsFromScope(
                            viewMode,
                            allShops,
                            favoriteShops,
                            allEvents
                        )
                    )
                )
                    .sort(alphabetical)
                    .slice(0, 100)
            )
        } else if (research === '') {
            setDisplayedShops(
                recursiveCategoryFilter(
                    filteredCategories,
                    filterByType(
                        newType,
                        initDisplayedShops(
                            mapRef.current,
                            viewMode,
                            getAllShopsFromScope(
                                viewMode,
                                allShops,
                                favoriteShops,
                                allEvents
                            )
                        )
                    )
                )
                    .sort(alphabetical)
                    .slice(0, 100)
            )
        } else if (filteredCategories.length === 0) {
            setDisplayedShops(
                filterShopsBySearch(
                    research,
                    filterByType(
                        newType,
                        getAllShopsFromScope(
                            viewMode,
                            allShops,
                            favoriteShops,
                            allEvents
                        )
                    )
                )
            )
        } else {
            setDisplayedShops(
                recursiveCategoryFilter(
                    filteredCategories,
                    filterShopsBySearch(
                        research,
                        filterByType(
                            newType,
                            getAllShopsFromScope(
                                viewMode,
                                allShops,
                                favoriteShops,
                                allEvents
                            )
                        )
                    )
                )
            )
        }
    }

    function handleSearchInput() {
        setResearch(inputRef.current.value)

        if (inputRef.current.value === '') {
            setDisplayedShops(
                recursiveCategoryFilter(
                    filteredCategories,
                    filterByType(
                        filteredType,
                        initDisplayedShops(
                            mapRef.current,
                            viewMode,
                            getAllShopsFromScope(
                                viewMode,
                                allShops,
                                favoriteShops,
                                allEvents
                            )
                        )
                    )
                )
                    .sort(alphabetical)
                    .slice(0, 100)
            )
            return
        }

        const filteredShops = filterShopsBySearch(
            inputRef.current.value,
            recursiveCategoryFilter(
                filteredCategories,
                filterByType(
                    filteredType,
                    getAllShopsFromScope(
                        viewMode,
                        allShops,
                        favoriteShops,
                        allEvents
                    )
                )
            )
        )
        localizeSearch(filteredShops, mapRef)
        setDisplayedShops(filteredShops)
        // console.log("we're gonna display :")
        // console.log(filteredShops.length)

        setSideBarOpened(true)

        if (filteredShops.length === 1) {
            openModal(
                mapRef.current,
                [
                    parseFloat(filteredShops[0].geolocation_lat[0]),
                    parseFloat(filteredShops[0].geolocation_long[0]),
                ],
                filteredShops[0].id,
                setModalShopId,
                setOverview,
                16
            )
        }
    }

    function handleOpenDropDown() {
        const dropdownStatus = isDropdownOpen
        setDropdownOpen(!dropdownStatus)
        // localizeSearch(displayedShops, mapRef)
    }

    function handleInputChange() {
        closeModal(setOverview, setDropdownOpen, setModalShopId)
    }

    function closeDropdown() {
        setDropdownOpen(false)
    }

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
                        onClick={handleEraseResearch}
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
                        <DropdownEntry
                            onClick={() => handleTypeSelect('all')}
                            active={
                                filteredType === 'all' ? 'active' : 'inactive'
                            }
                        >
                            All types
                        </DropdownEntry>
                        <DropdownEntry
                            onClick={() => handleTypeSelect('restaurant-cafe')}
                            active={
                                filteredType === 'restaurant-cafe'
                                    ? 'active'
                                    : 'inactive'
                            }
                        >
                            Restaurant / Cafe
                        </DropdownEntry>
                        <DropdownEntry
                            onClick={() => handleTypeSelect('supermarket')}
                            active={
                                filteredType === 'supermarket'
                                    ? 'active'
                                    : 'inactive'
                            }
                        >
                            Supermarket
                        </DropdownEntry>
                        {/* <DropdownEntry
                            onClick={() => handleTypeSelect('market')}
                            active={
                                filteredType === 'market'
                                    ? 'active'
                                    : 'inactive'
                            }
                        >
                            Market
                        </DropdownEntry> */}
                        <DropdownEntry
                            onClick={() => handleTypeSelect('local-store')}
                            active={
                                filteredType === 'local-store'
                                    ? 'active'
                                    : 'inactive'
                            }
                        >
                            Local store
                        </DropdownEntry>
                    </Dropdown>
                )}
            </TypeFilterContainer>
            <CategoryFilters>
                <CategoryFilter
                    onClick={() => handleCategoryClick('plant-based')}
                    active={
                        filteredCategories.includes('plant-based')
                            ? 'active'
                            : 'inactive'
                    }
                >
                    <CategoryIcon
                        src={plantbased}
                        title={formatCategory('plant-based')}
                        active={
                            filteredCategories.includes('plant-based')
                                ? 'active'
                                : 'inactive'
                        }
                    ></CategoryIcon>
                    {formatCategory('plant-based')}
                </CategoryFilter>
                <CategoryFilter
                    onClick={() => handleCategoryClick('organic')}
                    active={
                        filteredCategories.includes('organic')
                            ? 'active'
                            : 'inactive'
                    }
                >
                    <CategoryIcon
                        src={organic}
                        title={formatCategory('organic')}
                        active={
                            filteredCategories.includes('organic')
                                ? 'active'
                                : 'inactive'
                        }
                    ></CategoryIcon>
                    {formatCategory('organic')}
                </CategoryFilter>
                <CategoryFilter
                    onClick={() => handleCategoryClick('fairtrade')}
                    active={
                        filteredCategories.includes('fairtrade')
                            ? 'active'
                            : 'inactive'
                    }
                >
                    <CategoryIcon
                        src={fairtrade}
                        title={formatCategory('fairtrade')}
                        active={
                            filteredCategories.includes('fairtrade')
                                ? 'active'
                                : 'inactive'
                        }
                    ></CategoryIcon>
                    {formatCategory('fairtrade')}
                </CategoryFilter>
                {/* <CategoryFilter
                    onClick={() => handleCategoryClick('plastic-free')}
                    active={
                        filteredCategories.includes('plastic-free')
                            ? 'active'
                            : 'inactive'
                    }
                >
                    <CategoryIcon
                        src={noplastic}
                        title={formatCategory('plastic-free')}
                        active={
                            filteredCategories.includes('plastic-free')
                                ? 'active'
                                : 'inactive'
                        }
                    ></CategoryIcon>
                    {formatCategory('plastic-free')}
                </CategoryFilter> */}
                <CategoryFilter
                    onClick={() => handleCategoryClick('zero-waste')}
                    active={
                        filteredCategories.includes('zero-waste')
                            ? 'active'
                            : 'inactive'
                    }
                >
                    <CategoryIcon
                        src={nobin}
                        title={formatCategory('zero-waste')}
                        active={
                            filteredCategories.includes('zero-waste')
                                ? 'active'
                                : 'inactive'
                        }
                    ></CategoryIcon>
                    {formatCategory('zero-waste')}
                </CategoryFilter>
                {filteredType === 'restaurant-cafe' && (
                    <CategoryFilter
                        onClick={() => handleCategoryClick('take-out')}
                        active={
                            filteredCategories.includes('take-out')
                                ? 'active'
                                : 'inactive'
                        }
                    >
                        <CategoryIcon
                            src={noplastic}
                            title={formatCategory('take-out')}
                            active={
                                filteredCategories.includes('take-out')
                                    ? 'active'
                                    : 'inactive'
                            }
                        ></CategoryIcon>
                        {formatCategory('take-out')}
                    </CategoryFilter>
                )}
            </CategoryFilters>
        </FilterBarWrapper>
    )
}

export default FilterBar
