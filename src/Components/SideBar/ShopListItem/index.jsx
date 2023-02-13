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
    height: 120px;
    position: relative;
    font-family: sans-serif;
    font-size: 13px;
    border-radius: 5px;
    flex-basis: 200px;
`
const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    const { openOverview, modalShop, openModal, closeOverview, isModalClosed } =
        useContext(UserInterfaceContext)

    return (
        <ItemContainer
            onMouseEnter={() => isModalClosed && openOverview(shop.id)}
            onMouseLeave={() => isModalClosed && closeOverview()}
            onClick={() => {
                openModal(mapRef.current, shop, mapRef.current.getZoom())
            }}
            active={modalShop.id === shop.id}
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
