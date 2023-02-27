import styled from 'styled-components'
import { ShopsDataContext } from '../../../utils/Context/ShopsDataContext'
import IconList from '../../CategoriesIcon/IconList'
import { useContext } from 'react'
import { UserInterfaceContext } from '../../../utils/Context/UserInterfaceContext'
import colors from '../../../utils/Style/Colors'
import font from '../../../utils/Style/Font'

import layout from '../../../utils/Style/Layout'
import { useLanguage } from '../../../utils/Hooks/Language'

const ItemContainer = styled.div`
    max-width: 150px;
    height: 160px;
    padding: 5px;
    flex: 1 1 40%;

    font-size: ${font.textSize};

    border-radius: ${layout.slightBorderRadius};

    background-color: ${(props) =>
        props.active ? colors.activeBackground : 'null'};
    &:hover {
        background-color: ${(props) =>
            props.active ? null : colors.hoverBackground};
    }

    cursor: pointer;
`
const ImageTitle = styled.div`
    width: 100%;
    height: calc(100% - 30px);
    position: relative;
    border-radius: ${layout.slightBorderRadius};
`
const InfoContainer = styled.div``
const BusinessHours = styled.div`
    width: 100px;
`
const ImageThumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${layout.slightBorderRadius};
`
const TitleBackground = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0px;
    background-color: ${colors.darkTransparent};
    border-bottom-left-radius: ${layout.slightBorderRadius};
    border-bottom-right-radius: ${layout.slightBorderRadius};
`
const TitleThumbnail = styled.div`
    margin: 10px;
    color: ${colors.activeText};
    font-weight: ${font.activeWeight};
`

function ShopListItem({ shop }) {
    const { mapRef } = useContext(ShopsDataContext)
    const { openOverview, modalShop, openModal, closeOverview, isModalClosed } =
        useContext(UserInterfaceContext)

    const { currentLanguage } = useLanguage()

    return (
        <ItemContainer
            onMouseEnter={() => isModalClosed && openOverview(shop.id)}
            onMouseLeave={() => isModalClosed && closeOverview()}
            onClick={() => {
                openModal(mapRef.current, shop, mapRef.current.getZoom())
            }}
            onTouchEnd={() => {
                openModal(mapRef.current, shop, mapRef.current.getZoom())
            }}
            active={modalShop.id === shop.id}
        >
            <ImageTitle>
                <ImageThumbnail src={shop.image_thumbnail} />
                <TitleBackground>
                    {shop.shopname[currentLanguage.ID] ? (
                        <TitleThumbnail>
                            {shop.shopname[currentLanguage.ID]}
                        </TitleThumbnail>
                    ) : (
                        <TitleThumbnail>{shop.title}</TitleThumbnail>
                    )}
                </TitleBackground>
            </ImageTitle>
            <InfoContainer>
                {/* <BusinessHours
                    dangerouslySetInnerHTML={{ __html: shop.opening_hours[0] }}
                ></BusinessHours> */}
                <IconList iconSize={'25px'} shop={shop}></IconList>
            </InfoContainer>
        </ItemContainer>
    )
}

export default ShopListItem
