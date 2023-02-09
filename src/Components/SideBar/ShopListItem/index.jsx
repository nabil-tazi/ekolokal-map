import styled from 'styled-components'
import { ShopsDataContext } from '../../../utils/Context/ShopsDataContext'
import IconList from '../../CategoriesIcon/IconList'
import { useContext } from 'react'
import { UserInterfaceContext } from '../../../utils/Context/UserInterfaceContext'

const ItemContainer = styled.div`
    padding: 10px;
    padding-right: 0px;
    margin-bottom: 15px;
    margin-right: 15px;

    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;

    border-radius: 7px;

    background-color: ${(props) => (props.active ? '#b2bdca' : null)};
    &:hover {
        background-color: ${(props) => (props.active ? null : '#e9e9e9')};
    }

    cursor: pointer;
`
const ImageTitle = styled.div`
    /* width: 200px; */
    height: 120px;
    position: relative;
    font-family: sans-serif;
    font-size: 13px;
    border-radius: 5px;
    /* flex-basis: 60%; */
    flex-basis: 200px;
`
const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 130px; */
    align-items: flex-start;
    /* flex-basis: 40%; */
    flex-basis: 130px;
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
    border-radius: 7px;
`
const TitleBackground = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0px;
    background-color: #00000068;
    color: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`
const TitleThumbnail = styled.div`
    margin: 10px;
`

function ShopListItem({ shop }) {
    const { mapRef } = useContext(ShopsDataContext)
    const {
        openOverview,
        modalShopId,
        openModal,
        closeOverview,
        isModalClosed,
    } = useContext(UserInterfaceContext)

    function handleHover() {
        if (isModalClosed) {
            openOverview(shop.id)
        }
    }

    function handleMouseOut() {
        if (isModalClosed) {
            closeOverview()
        }
    }

    function handleClick() {
        openModal(
            mapRef.current,
            [
                parseFloat(shop.geolocation_lat[0]),
                parseFloat(shop.geolocation_long[0]),
            ],
            shop,
            mapRef.current.getZoom()
        )
    }
    return (
        <ItemContainer
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseOut}
            onClick={handleClick}
            active={modalShopId.shopData.id === shop.id}
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
        </ItemContainer>
    )
}

export default ShopListItem
