import styled from 'styled-components'

import { useContext } from 'react'
import { LayoutContext } from '../../utils/Context/LayoutContext'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'

import FavoriteButton from '../../utils/GenericComponents/FavoriteButton'
import { devices } from '../../utils/Style/Layout'
import layout from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'
import font from '../../utils/Style/Font'

import phone from '../../assets/phone.png'
import target from '../../assets/target.png'
import link from '../../assets/link.png'
import CloseModalButton from '../../utils/GenericComponents/CloseModalButton'
import ShopImages from './ShopImages'
import IconList from '../CategoriesIcon/IconList'
import { useLanguage } from '../../utils/Hooks/Language'

const ModalWrapper = styled.div`
    background-color: ${colors.transparentBackground};
    z-index: 500;
    box-shadow: 0px 0px 10px gray;
    font-size: ${font.textSize};
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media ${devices.mobileS} {
        left: 0px;
        width: 100%;
        height: calc(100% - 120px - 70px);
        margin-top: auto;
        overflow: hidden;
    }
    @media ${devices.tablet} {
        position: absolute;

        // prettier-ignore
        left: calc(${layout.menuBarWidthPx} + ${layout.SideBarWidthPx} + ${layout.overlaysSpacingPx});
        width: ${layout.baseModalWidthPx};
        max-width: ${(props) => props.maxOverlayWidth + 'px'};

        top: 10vh;
        height: 80vh;
        border-radius: ${layout.slightBorderRadius};
    }
`
const ActionsImagesContainer = styled.div`
    height: 40%;
`

const ActionsBar = styled.div`
    position: absolute;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    box-sizing: border-box;
    background: rgb(0, 0, 0);
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) -30%,
        rgba(200, 200, 200, 0) 100%
    );
`
const ShopName = styled.h2`
    margin: 5px;
    text-align: center;
`

const TaglineCategoriesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
`

const Tagline = styled.div`
    max-width: 250px;
    align-self: center;
    font-style: italic;
`

const ContentContainer = styled.div`
    max-height: 120px;
    overflow: scroll;
    margin-left: 20px;
    margin-right: 20px;
`

const ContactContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px 10px 20px;
`
const ContactInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const PhoneNumber = styled.div`
    width: 200px;
`
const Website = styled.a`
    margin-top: 5px;
    text-align: left;
`
const Address = styled.div`
    text-align: right;
    margin-left: auto;
`

const AddressWrapper = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
`
const Icon = styled.img`
    cursor: pointer;
    width: 10px;
    margin-right: 5px;
    align-self: flex-end;
`
const LocalizeIcon = styled.img`
    width: 20px;
    height: 20px;
    margin: 10px;
`

const OpeningHours = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    align-self: flex-end;
`

function NewShopModal({ shop }) {
    const { maxOverlayWidth } = useContext(LayoutContext)
    const { currentLanguage } = useLanguage()

    const { flyToShop } = useContext(UserInterfaceContext)
    const { mapRef } = useContext(ShopsDataContext)

    return (
        <ModalWrapper maxOverlayWidth={maxOverlayWidth}>
            <ActionsImagesContainer>
                <ActionsBar>
                    <FavoriteButton shop={shop} />
                    {shop.shopname[currentLanguage.ID] ? (
                        <ShopName>
                            {shop.shopname[currentLanguage.ID].toUpperCase()}
                        </ShopName>
                    ) : (
                        <ShopName>{shop.title.toUpperCase()}</ShopName>
                    )}
                    <CloseModalButton />
                </ActionsBar>
                <ShopImages images={shop.images_url} />
            </ActionsImagesContainer>
            <TaglineCategoriesContainer>
                <Tagline>
                    {''}
                    {shop.tagline_new[currentLanguage.ID]
                        ? shop.tagline_new[currentLanguage.ID]
                        : shop.tagline}
                </Tagline>
                <IconList shop={shop} iconSize={'30px'}></IconList>
            </TaglineCategoriesContainer>
            <ContentContainer>
                {shop.content_new[currentLanguage.ID] ? (
                    <p>{shop.content_new[currentLanguage.ID]}</p>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: shop.content }}></p>
                )}
            </ContentContainer>
            <ContactContainer>
                <ContactInformation>
                    {shop.phone_number && (
                        <PhoneNumber>
                            <Icon src={phone}></Icon>
                            {shop.phone_number}
                        </PhoneNumber>
                    )}
                    {shop.website[0] && (
                        <Website href={shop.website} target="_blank">
                            <Icon src={link}></Icon>Visit website
                        </Website>
                    )}
                    {shop.instagram[0] && (
                        <Website href={shop.instagram} target="_blank">
                            <Icon src={link}></Icon>Instagram
                        </Website>
                    )}
                </ContactInformation>
                <AddressWrapper
                    onClick={() => {
                        flyToShop(
                            mapRef.current,
                            [
                                parseFloat(shop.geolocation_lat[0]),
                                parseFloat(shop.geolocation_long[0]),
                            ],
                            16
                        )
                    }}
                >
                    {shop.full_address[currentLanguage.ID] ? (
                        <Address>
                            {shop.full_address[currentLanguage.ID]}
                        </Address>
                    ) : (
                        shop.formatted_address && (
                            <Address>{shop.formatted_address}</Address>
                        )
                    )}
                    <LocalizeIcon src={target}></LocalizeIcon>
                </AddressWrapper>
            </ContactContainer>
            <OpeningHours>
                {shop.opening_hours && shop.opening_hours[0]}
            </OpeningHours>
        </ModalWrapper>
    )
}

export default NewShopModal
