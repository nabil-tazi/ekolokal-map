import styled from 'styled-components'
import cross from '../../assets/cross.png'
import goback from '../../assets/undo.png'
import phone from '../../assets/phone.png'
import target from '../../assets/target.png'
import link from '../../assets/link.png'
import emptyHeart from '../../assets/emptyHeart.png'
import fullHeart from '../../assets/fullHeart.png'
import font from '../../utils/Style/Font'
import colors from '../../utils/Style/Colors'

import { useContext } from 'react'
import { ShopsDataContext } from '../../utils/Context/ShopsDataContext'

import IconList from '../CategoriesIcon/IconList'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { ScopeContext } from '../../utils/Context/ScopeContext'

import layout, { devices } from '../../utils/Style/Layout'
import { LayoutContext } from '../../utils/Context/LayoutContext'
import { useLanguage } from '../../utils/Hooks/Language'
import { useWindowSize } from '../../utils/Hooks/WindowSize'

import NewShopModal from '../NewShopModal'

const ShopModalWrapper = styled.div`
    display: flex;
    flex-direction: column;

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
    background-color: ${colors.transparentBackground};
    z-index: 500;
    box-shadow: 0px 0px 10px gray;
    font-size: ${font.textSize};
`
const FirstLine = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
`
const CloseIcon = styled.img`
    cursor: pointer;
    width: 15px;
    padding: 7px;
    margin: 10px;
    border-radius: 100%;
    &:hover {
        background-color: ${colors.hoverBackground};
    }
`

const GoBackIcon = styled.img`
    cursor: pointer;
    width: 20px;
    padding: 7px;
    margin: 10px;
    border-radius: 100%;
    &:hover {
        background-color: ${colors.hoverBackground};
    }
`
const Icon = styled.img`
    cursor: pointer;
    width: 10px;
    margin-right: 5px;
    align-self: flex-end;
`
const ModalContent = styled.div`
    padding: 0 30px 0 30px;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const TopWrapper = styled.div``
const BottomWrapper = styled.div`
    height: 90px;
`
const ShopName = styled.h2`
    margin: 0;
    line-height: 30px;
    margin-left: 20px;
    width: 75%;
`
const Tagline = styled.div`
    max-width: 250px;
    margin-top: 20px;
`
const ImagesWrapper = styled.div`
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
`
const ImageSingle = styled.div`
    width: 70%;
    margin: auto;
`
const ImageDuo = styled.div`
    display: flex;
    gap: 10px;
    width: 50%;
`
const ImageLeft = styled.div`
    width: 63%;
    padding: 5px;
`
const ImageRight = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
`
const ImageOne = styled.img`
    width: 100%;
    aspect-ratio: 3/2;
    object-fit: cover;
`
const ImageTwo = styled.img`
    width: 100%;
    margin: 5px;
    aspect-ratio: 3/2;
    object-fit: cover;
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
const Content = styled.div`
    height: 120px;
    overflow: scroll;
    margin-top: 10px;
    margin-bottom: 20px;
`
const LocalizeIcon = styled.img`
    width: 20px;
    height: 20px;
    margin: 10px;
`
const FavoriteIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 20px;
    padding: 10px;
    border-radius: 100%;

    cursor: pointer;
    &:hover {
        background-color: #00000010;
    }
`
const SecondLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ThirdLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Address = styled.div`
    text-align: right;
    width: 250px;
    margin-left: auto;
`

const AddressWrapper = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
`

function ShopModal({ shop }) {
    const { maxOverlayWidth } = useContext(LayoutContext)

    const { mapRef, ACTIONS, updateDisplayedShops } =
        useContext(ShopsDataContext)

    const { favoriteShops, saveFavoriteShops, isFavorite } =
        useContext(ScopeContext)

    const { currentLanguage } = useLanguage()

    const { mode } = useWindowSize()

    const { closeModal, flyToShop, isSideBarOpen } =
        useContext(UserInterfaceContext)

    const isModalShopFavorite = isFavorite(shop)

    function handleCloseModal() {
        closeModal()
    }

    function handleFavoriteClick() {
        const newFavorites = isModalShopFavorite
            ? favoriteShops.filter((e) => e.id !== shop.id)
            : [...favoriteShops, shop]

        saveFavoriteShops(newFavorites)
        updateDisplayedShops(ACTIONS.CHANGE_FAVORITES, newFavorites)
    }

    return (
        <NewShopModal shop={shop}></NewShopModal>
        // <ShopModalWrapper maxOverlayWidth={maxOverlayWidth}>
        //     <FirstLine>
        //         <FavoriteIcon
        //             src={isModalShopFavorite ? fullHeart : emptyHeart}
        //             onClick={handleFavoriteClick}
        //         ></FavoriteIcon>
        // {shop.shopname[currentLanguage.ID] ? (
        //     <ShopName>
        //         {shop.shopname[currentLanguage.ID].toUpperCase()}
        //     </ShopName>
        // ) : (
        //     <ShopName>{shop.title.toUpperCase()}</ShopName>
        // )}

        //         {isSideBarOpen && mode === 'mobile' ? (
        //             <GoBackIcon src={goback} onClick={handleCloseModal} />
        //         ) : (
        //             <CloseIcon src={cross} onClick={handleCloseModal} />
        //         )}
        //     </FirstLine>

        //     <ModalContent>
        //         <TopWrapper>
        // <ImagesWrapper>
        //     {shop.images_url.length == 1 && (
        //         <ImageSingle>
        //             <ImageOne src={shop.images_url[0]} />
        //         </ImageSingle>
        //     )}
        //     {shop.images_url.length == 2 && (
        //         <ImageDuo>
        //             <ImageOne src={shop.images_url[0]} />
        //             <ImageOne src={shop.images_url[1]} />
        //         </ImageDuo>
        //     )}
        //     {shop.images_url.length > 2 && (
        //         <>
        //             <ImageLeft>
        //                 <ImageOne src={shop.images_url[0]} />
        //             </ImageLeft>
        //             <ImageRight>
        //                 <ImageTwo src={shop.images_url[1]} />
        //                 <ImageTwo src={shop.images_url[2]} />
        //             </ImageRight>
        //         </>
        //     )}
        // </ImagesWrapper>
        //             <SecondLine>
        // {shop.tagline_new[currentLanguage.ID] ? (
        //     <Tagline>
        //         {shop.tagline_new[currentLanguage.ID]}
        //     </Tagline>
        // ) : (
        //     <Tagline>{shop.tagline}</Tagline>
        // )}

        //                 <IconList shop={shop} iconSize={'30px'}></IconList>
        //             </SecondLine>

        // {shop.content_new[currentLanguage.ID] ? (
        //     <Content>
        //         {shop.content_new[currentLanguage.ID]}
        //     </Content>
        // ) : (
        //     <Content
        //         dangerouslySetInnerHTML={{ __html: shop.content }}
        //     ></Content>
        // )}
        //         </TopWrapper>
        //         <BottomWrapper>
        // <ThirdLine>
        //     <ContactInformation>
        //         {shop.phone_number && (
        //             <PhoneNumber>
        //                 <Icon src={phone}></Icon>
        //                 {shop.phone_number}
        //             </PhoneNumber>
        //         )}
        //         {shop.website[0] && (
        //             <Website href={shop.website} target="_blank">
        //                 <Icon src={link}></Icon>Visit website
        //             </Website>
        //         )}
        //         {shop.instagram[0] && (
        //             <Website href={shop.instagram} target="_blank">
        //                 <Icon src={link}></Icon>Instagram
        //             </Website>
        //         )}
        //     </ContactInformation>
        //     <AddressWrapper
        //         onClick={() => {
        //             flyToShop(
        //                 mapRef.current,
        //                 [
        //                     parseFloat(shop.geolocation_lat[0]),
        //                     parseFloat(shop.geolocation_long[0]),
        //                 ],
        //                 16
        //             )
        //         }}
        //     >
        //         {shop.full_address[currentLanguage.ID] ? (
        //             <Address>
        //                 {shop.full_address[currentLanguage.ID]}
        //             </Address>
        //         ) : (
        //             shop.formatted_address && (
        //                 <Address>{shop.formatted_address}</Address>
        //             )
        //         )}
        //         <LocalizeIcon src={target}></LocalizeIcon>
        //     </AddressWrapper>
        // </ThirdLine>
        //         </BottomWrapper>
        //     </ModalContent>

        //     {/* <img src={shop.images_url[0]} alt={shop.id}></img> */}
        // </ShopModalWrapper>
    )
}

export default ShopModal
