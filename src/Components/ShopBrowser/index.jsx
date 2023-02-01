import { useEffect, useState, useRef, useContext } from 'react'
import ShopList from '../ShopList'
import Map from '../MapComponents/Map'
import FilterBar from '../MapComponents/Filters/FilterBar'
import MenuBar from '../MapComponents/MenuBar'
import ShopModal from '../MapComponents/ShopModal'
import styled from 'styled-components'
import { recursiveCategoryFilter, updateShops } from '../../utils/maputils'
import ShopData from '../../assets/data'
import logo from '../../assets/ekolokal-logo.png'

import { ScopeContext } from '../../utils/context/ScopeContext'

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
    margin-bottom: 100px;
    width: 170px;
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
    const {
        viewMode,
        allShops,
        initAllShops,
        initAllEvents,
        favoriteShops,
        updateFavoriteShops,
        displayedShops,
        init,
    } = useContext(ScopeContext)

    const [overview, setOverview] = useState(0)
    const [modalShopId, setModalShopId] = useState(0)
    const [isSideBarOpened, setSideBarOpened] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [itemsDisplayed, setItemsDisplayed] = useState(20)
    const [isLoading, setLoading] = useState(true)
    const inputRef = useRef(null)

    const initCenter = [34.67, 135.49]

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
        if (storedFavorites) {
            updateFavoriteShops(storedFavorites)
        }

        const fetchShops = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `https://ekolokal.com/wp-json/wl/v1/shops`
                )

                const parsedData = await response.json()
                initAllShops(parsedData)

                const events = recursiveCategoryFilter(['market'], parsedData)
                initAllEvents(events)

                if (inputRef.current.value === '') {
                    init(parsedData, events, storedFavorites)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
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
                isSideBarOpened={isSideBarOpened}
                setSideBarOpened={setSideBarOpened}
                setItemsDisplayed={setItemsDisplayed}
                favoriteShops={favoriteShops}
                setDropdownOpen={setDropdownOpen}
            ></MenuBar>
            {isSideBarOpened && (
                <ShopList
                    setOverview={setOverview}
                    modalShopId={modalShopId}
                    setModalShopId={setModalShopId}
                    setDropdownOpen={setDropdownOpen}
                    setSideBarOpened={setSideBarOpened}
                    itemsDisplayed={itemsDisplayed}
                    setItemsDisplayed={setItemsDisplayed}
                ></ShopList>
            )}
            {modalShopId && (
                <ShopModal
                    setOverview={setOverview}
                    shop={allShops.filter((shop) => shop.id === modalShopId)[0]}
                    setDropdownOpen={setDropdownOpen}
                    setItemsDisplayed={setItemsDisplayed}
                    setModalShopId={setModalShopId}
                ></ShopModal>
            )}
            <FilterBar
                setOverview={setOverview}
                setModalShopId={setModalShopId}
                setSideBarOpened={setSideBarOpened}
                isDropdownOpen={isDropdownOpen}
                setDropdownOpen={setDropdownOpen}
                inputRef={inputRef}
            ></FilterBar>
            <Map
                overview={overview}
                center={initCenter}
                modalShopId={modalShopId}
                setModalShopId={setModalShopId}
                setOverview={setOverview}
                setDropdownOpen={setDropdownOpen}
                inputRef={inputRef}
            ></Map>
            <EkolokalLogo src={logo} />
        </Container>
    )
}

export default ShopBrowser
