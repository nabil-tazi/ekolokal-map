import styled from 'styled-components'
import { Popup } from 'react-leaflet'
import { useLanguage } from '../../../utils/Hooks/Language'

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

function ShopPopup({ imgUrl, shop }) {
    const { currentLanguage } = useLanguage()
    return (
        <PopupContainer autoPan={false}>
            <OverviewImage src={imgUrl} />
            {shop.shopname[currentLanguage.ID] ? (
                <ShopName>{shop.shopname[currentLanguage.ID]}</ShopName>
            ) : (
                <ShopName>{shop.title}</ShopName>
            )}
            {/* <ShopName>{shopName}</ShopName> */}
            {/* <ShopName>{shopAddress}</ShopName> */}
            {shop.full_address[currentLanguage.ID] ? (
                <ShopName>{shop.full_address[currentLanguage.ID]}</ShopName>
            ) : (
                shop.formatted_address && (
                    <ShopName>{shop.formatted_address}</ShopName>
                )
            )}
        </PopupContainer>
    )
}

export default ShopPopup
