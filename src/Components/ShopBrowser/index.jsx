import { useEffect, useState, useRef, useContext } from 'react'
import SideBar from '../SideBar'
import Map from '../MapComponents/Map'
import FilterBar from '../MapComponents/Filters/FilterBar'
import MenuBar from '../MenuBar'
import ShopModal from '../ShopModal'
import LoadingScreen from '../../utils/GenericComponents/LoadingScreen'
import styled from 'styled-components'
import { filterByType } from '../../utils/maputils'
import ShopData from '../../assets/data'
import logo from '../../assets/ekolokal-logo.png'

import { TYPES } from '../../utils/configuration/TypeConfig'

import { ShopsDataContext } from '../../utils/context/ShopsDataContext'
import { UserInterfaceContext } from '../../utils/context/UserInterfaceContext'

const Container = styled.div``

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
        allShops,
        initAllShops,
        initAllEvents,
        favoriteShops,
        saveFavoriteShops,
        displayedShops,
        initDisplayedShops,
    } = useContext(ShopsDataContext)

    const { isSideBarOpen, modalShopId, resetLazyLoad } =
        useContext(UserInterfaceContext)

    const [isLoading, setLoading] = useState(true)
    const inputRef = useRef(null)

    const initCenter = [34.67, 135.49]

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
        if (storedFavorites) {
            saveFavoriteShops(storedFavorites)
        }

        const fetchShops = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `https://ekolokal.com/wp-json/wl/v1/shops`
                )

                const parsedData = await response.json()
                initAllShops(parsedData)

                const events = filterByType(TYPES.EVENT, parsedData)
                initAllEvents(events)

                initDisplayedShops(parsedData, events, storedFavorites)
                // if (inputRef.current.value === '') {
                //     initDisplayedShops(parsedData, events, storedFavorites)
                // }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchShops()
    }, [])

    useEffect(() => {
        resetLazyLoad()
    }, [displayedShops.length])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteShops))
    }, [favoriteShops])

    return (
        <Container>
            {isLoading && <LoadingScreen />}
            <MenuBar />
            {isSideBarOpen && <SideBar />}
            {modalShopId && (
                <ShopModal
                    shop={allShops.filter((shop) => shop.id === modalShopId)[0]}
                />
            )}
            <FilterBar inputRef={inputRef} />
            <Map center={initCenter} inputRef={inputRef} />
            <EkolokalLogo src={logo} />
        </Container>
    )
}

export default ShopBrowser
