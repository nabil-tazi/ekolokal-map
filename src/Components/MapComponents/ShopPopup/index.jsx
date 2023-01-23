import styled from 'styled-components'
import { Popup } from 'react-leaflet'

const PopupContainer = styled(Popup)`
    .leaflet-popup-content-wrapper {
        padding: 0;
        border-radius: 5px;
        height: 250px;
        width: 250px;
    }
    .leaflet-popup-content {
        margin: 0;
    }

    .leaflet-popup-tip-container {
    }
`
const OverviewImage = styled.img`
    width: 250px;
    height: 150px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    object-fit: cover;
`

const ShopName = styled.div`
    margin: 5px 10px 0px 10px;
`

function ShopPopup({ imgUrl, shopName, shopAddress }) {
    return (
        <PopupContainer>
            <OverviewImage src={imgUrl} />
            <ShopName>{shopName}</ShopName>
            <ShopName>{shopAddress}</ShopName>
        </PopupContainer>
    )
}

export default ShopPopup
