import styled from 'styled-components'
import { Popup } from 'react-leaflet'

const PopupContainer = styled(Popup)`
    .leaflet-popup-content-wrapper {
        padding: 0;
        border-radius: 5px;
        height: 230px;
        width: 200px;
    }
    .leaflet-popup-content {
        margin: 0;
    }
`
const OverviewImage = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`

const ShopName = styled.div`
    margin: 5px 10px 0px 10px;
`

function ShopPopup({ imgUrl, shopName, shopAddress }) {
    return (
        <PopupContainer autoPan={false}>
            <OverviewImage src={imgUrl} />
            <ShopName>{shopName}</ShopName>
            <ShopName>{shopAddress}</ShopName>
        </PopupContainer>
    )
}

export default ShopPopup
