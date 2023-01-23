import styled from 'styled-components'
import { openModal, positionShopForModal } from '../../utils/maputils'
import IconList from '../Categories/IconList'

const ListItemWrapper = styled.div`
    margin-bottom: 15px;
    cursor: pointer;
    /* border-bottom: 1px black solid; */
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    padding: 10px;
    padding-right: 0px;

    margin-right: 15px;
    border-radius: 7px;
    &:hover {
        background-color: ${(props) => (props.active ? null : '#e9e9e9')};
    }

    background-color: ${(props) => (props.active ? '#b2bdca' : null)};
`

const ImageTitle = styled.div`
    width: 200px;
    height: 120px;
    position: relative;
    font-family: sans-serif;
    font-size: 13px;
    border-radius: 5px;
`

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 130px;
    align-items: flex-start;
`

const BusinessHours = styled.div`
    width: 100px;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;
    color: #292929;
`
const ImageThumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: white;
    border-radius: 5px;
`

const TitleBackground = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0px;
    background-color: #00000068;
    color: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    /* background: red; */
`
const TitleThumbnail = styled.div`
    margin: 10px;
    /* background: blue; */
`

function ShopListItem({
    shop,
    // setDisplayedShops,
    // setIsOverviewOpened,
    setOverview,
    mapRef,
    // setIsModalOpened,
    // isModalOpened,
    modalShopId,
    setModalShopId,
    // setIsMarkerHovered,
}) {
    function handleHover() {
        if (modalShopId === 0) {
            setOverview(shop.id)
            // setIsOverviewOpened(true)
            // setIsMarkerHovered(true)
        }
    }

    function handleMouseOut() {
        if (modalShopId === 0) {
            setOverview(0)
            // setIsOverviewOpened(false)
            // setIsMarkerHovered(false)
        }
    }

    function handleClick() {
        // setIsOverviewOpened(true)
        // setOverview(shop.id)
        openModal(
            mapRef.current,
            [
                parseFloat(shop.geolocation_lat[0]),
                parseFloat(shop.geolocation_long[0]),
            ],
            shop.id,
            setModalShopId,
            // setIsModalOpened,
            // setIsOverviewOpened,
            setOverview,
            mapRef.current.getZoom()
        )
        // positionShopForModal(
        //     mapRef.current,
        //     [
        //         parseFloat(shop.geolocation_lat[0]),
        //         parseFloat(shop.geolocation_long[0]),
        //     ],
        //     // 15
        //     mapRef.current.getZoom()
        // )
    }
    return (
        <ListItemWrapper
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseOut}
            onClick={handleClick}
            active={modalShopId === shop.id}
        >
            <ImageTitle>
                <ImageThumbnail src={shop.image_thumbnail} />
                <TitleBackground>
                    <TitleThumbnail>{shop.title}</TitleThumbnail>
                </TitleBackground>
            </ImageTitle>
            <RightColumn>
                <BusinessHours
                    dangerouslySetInnerHTML={{ __html: shop.opening_hours[0] }}
                ></BusinessHours>
                <IconList iconSize="30px" shop={shop}></IconList>
            </RightColumn>
        </ListItemWrapper>
    )
}

export default ShopListItem
