import { useEffect, useState, useRef } from 'react'
import ShopList from '../ShopList'
import Map from '../MapComponents/Map'
import FilterBar from '../MapComponents/FilterBar'
import MenuBar from '../MapComponents/MenuBar'
import ShopModal from '../MapComponents/ShopModal'
import styled from 'styled-components'
import {
    initDisplayedShops,
    filterByType,
    recursiveCategoryFilter,
    updateMarkerFromBounds,
    alphabetical,
} from '../../utils/maputils'
import ShopData from '../../assets/data'
import logo from '../../assets/ekolokal-logo.png'

const Container = styled.div`
    /* display: flex; */
`
const LoadingScreen = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #fef2e2;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingLogo = styled.img`
    /* position: absolute; */
    /* display: block; */
    /* margin: auto; */
    margin-bottom: 100px;
    width: 170px;
    /* height: 170px; */
    /* top: 35%;

    left: 45%; */
`

const EkolokalLogo = styled.img`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 100px;
    z-index: 900;
    border-radius: 100%;
    box-shadow: 0px 0px 10px gray;
    cursor: pointer;
    transition: transform 0.2s ease-in;

    &:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease-in;
    }
`

function ShopBrowser() {
    const [allShops, setAllShops] = useState([])
    const [allEvents, setAllEvents] = useState([])

    const [displayedShops, setDisplayedShops] = useState([])

    const [favoriteShops, setFavoriteShops] = useState(
        localStorage.getItem('favorites') != null
            ? JSON.parse(localStorage.getItem('favorites'))
            : []
    )
    const [viewMode, setViewMode] = useState('')

    const [overview, setOverview] = useState(0)
    const [modalShopId, setModalShopId] = useState(0)

    const [research, setResearch] = useState('')
    const [filteredCategories, setFilteredCategories] = useState([])

    const [isSideBarOpened, setSideBarOpened] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [filteredType, setFilteredType] = useState('all')

    const [itemsDisplayed, setItemsDisplayed] = useState(20)

    const [isLoading, setLoading] = useState(true)

    const mapRef = useRef()
    const inputRef = useRef(null)

    const initCenter = [34.67, 135.49]

    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `https://ekolokal.com/wp-json/wl/v1/shops`
                )

                const parsedData = await response.json()
                setAllShops(parsedData)

                if (inputRef.current.value === '') {
                    setDisplayedShops(
                        recursiveCategoryFilter(
                            filteredCategories,
                            filterByType(
                                filteredType,
                                initDisplayedShops(
                                    mapRef.current,
                                    viewMode,
                                    parsedData
                                )
                            )
                        )
                            .sort(alphabetical)
                            .slice(0, 100)
                    )
                }

                setAllEvents(recursiveCategoryFilter(['market'], parsedData))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
        if (storedFavorites) {
            console.log('found something')
            console.log(storedFavorites)
            setFavoriteShops(storedFavorites)
        }

        fetchShops()
    }, [])

    useEffect(() => {
        setItemsDisplayed(20)
        console.log(displayedShops.length)
    }, [displayedShops.length])

    useEffect(() => {
        console.log('added to cookies')
        localStorage.setItem('favorites', JSON.stringify(favoriteShops))
    }, [favoriteShops])

    return (
        <Container>
            {isLoading && (
                <LoadingScreen>
                    <LoadingLogo src={logo}></LoadingLogo>
                </LoadingScreen>
            )}
            <MenuBar
                setDisplayedShops={setDisplayedShops}
                isSideBarOpened={isSideBarOpened}
                setSideBarOpened={setSideBarOpened}
                setItemsDisplayed={setItemsDisplayed}
                favoriteShops={favoriteShops}
                viewMode={viewMode}
                mapRef={mapRef}
                setViewMode={setViewMode}
                filteredCategories={filteredCategories}
                filteredType={filteredType}
                allShops={allShops}
                allEvents={allEvents}
                research={research}
            ></MenuBar>
            {isSideBarOpened && (
                <ShopList
                    allShops={allShops}
                    displayedShops={displayedShops}
                    setDisplayedShops={setDisplayedShops}
                    setOverview={setOverview}
                    mapRef={mapRef}
                    modalShopId={modalShopId}
                    setModalShopId={setModalShopId}
                    research={research}
                    setResearch={setResearch}
                    setDropdownOpen={setDropdownOpen}
                    setSideBarOpened={setSideBarOpened}
                    itemsDisplayed={itemsDisplayed}
                    setItemsDisplayed={setItemsDisplayed}
                    filteredType={filteredType}
                    filteredCategories={filteredCategories}
                ></ShopList>
            )}
            {modalShopId && (
                <ShopModal
                    setOverview={setOverview}
                    mapRef={mapRef}
                    shop={allShops.filter((shop) => shop.id === modalShopId)[0]}
                    setDropdownOpen={setDropdownOpen}
                    setItemsDisplayed={setItemsDisplayed}
                    setModalShopId={setModalShopId}
                    favoriteShops={favoriteShops}
                    setFavoriteShops={setFavoriteShops}
                ></ShopModal>
            )}
            <FilterBar
                research={research}
                setResearch={setResearch}
                displayedShops={displayedShops}
                setDisplayedShops={setDisplayedShops}
                setOverview={setOverview}
                mapRef={mapRef}
                allShops={allShops}
                setModalShopId={setModalShopId}
                setSideBarOpened={setSideBarOpened}
                filteredCategories={filteredCategories}
                setFilteredCategories={setFilteredCategories}
                isDropdownOpen={isDropdownOpen}
                setDropdownOpen={setDropdownOpen}
                filteredType={filteredType}
                setFilteredType={setFilteredType}
                inputRef={inputRef}
                viewMode={viewMode}
                favoriteShops={favoriteShops}
                allEvents={allEvents}
            ></FilterBar>
            <Map
                allShops={allShops}
                viewMode={viewMode}
                displayedShops={displayedShops}
                setDisplayedShops={setDisplayedShops}
                overview={overview}
                center={initCenter}
                mapRef={mapRef}
                modalShopId={modalShopId}
                setModalShopId={setModalShopId}
                setOverview={setOverview}
                research={research}
                filteredCategories={filteredCategories}
                setDropdownOpen={setDropdownOpen}
                filteredType={filteredType}
                inputRef={inputRef}
                favoriteShops={favoriteShops}
            ></Map>
            <EkolokalLogo src={logo} />
        </Container>
    )
}

export default ShopBrowser
