import styled from 'styled-components'
import cross from '../../assets/cross.png'
import phone from '../../assets/phone.png'
import target from '../../assets/target.png'
import link from '../../assets/link.png'
import emptyHeart from '../../assets/emptyHeart.png'
import fullHeart from '../../assets/fullHeart.png'

import { useContext } from 'react'
import { ShopsDataContext } from '../../utils/context/ShopsDataContext'

import IconList from '../CategoriesIcon/IconList'
import { UserInterfaceContext } from '../../utils/context/UserInterfaceContext'

const ShopModalWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    left: 470px;
    top: 10vh;
    width: 600px;
    height: 80vh;
    background-color: #f8f8f4;
    z-index: 500;
    opacity: 95%;
    box-shadow: 0px 0px 10px gray;
`

const FirstLine = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
`

const CloseIcon = styled.img`
    cursor: pointer;
    width: 11px;
    padding: 7px;
    margin: 10px;
    border-radius: 100%;
    /* align-self: flex-start; */
    &:hover {
        background-color: #00000010;
    }
`
const PhoneIcon = styled.img`
    cursor: pointer;
    width: 10px;
    margin-right: 5px;
    align-self: flex-end;
`
const ModalContent = styled.div`
    padding: 0 30px 0 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TopWrapper = styled.div`
    /* height: 200px; */
`
const BottomWrapper = styled.div`
    /* margin-bottom: 40px; */
    height: 90px;
`

const ShopName = styled.h2`
    color: #f6af3c;
    font-size: 22px;
    margin: 0;
    line-height: 30px;
    /* margin-top: 30px; */
    margin-left: 20px;
    width: 450px;
`

const Tagline = styled.h3`
    font-size: 15px;
    max-width: 250px;
    margin-top: 20px;
    font-family: sans-serif;
    font-weight: 200;
    color: #282828;
`
const ImagesWrapper = styled.div`
    margin-top: 10px;
    width: 530px;
    display: flex;
`

const ImageSingle = styled.div`
    width: 69%;
    margin: auto;
`
const ImageDuo = styled.div`
    display: flex;
    gap: 10px;
    width: 50%;
`
const ImageLeft = styled.div`
    width: 69%;
    padding: 5px;
`
const ImageRight = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
`
const ImageOne = styled.img`
    width: 100%;
    /* margin: 5px; */

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
    font-size: 15px;
    font-family: sans-serif;
    font-weight: 200;
    color: #282828;
    width: 200px;
`

const Website = styled.a`
    font-size: 15px;
    margin-top: 5px;
    font-family: sans-serif;
    font-weight: 200;
    color: #282828;
    text-align: left;
`

const Content = styled.div`
    height: 120px;
    overflow: scroll;
    margin-top: 10px;
    margin-bottom: 20px;

    font-family: sans-serif;
    font-size: 15px;
    color: #282828;
    font-weight: 200;
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
    /* margin-top: 30px; */
`

const Address = styled.div`
    text-align: right;
    width: 250px;
    font-size: 15px;
    font-family: sans-serif;
    font-weight: 200;
    color: #282828;
    margin-left: auto;
`

const AddressWrapper = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
`

function ShopModal({ shop }) {
    const {
        mapRef,
        favoriteShops,
        saveFavoriteShops,
        ACTIONS,
        updateDisplayedShops,
        isFavorite,
    } = useContext(ShopsDataContext)

    const { closeModal, flyToShop } = useContext(UserInterfaceContext)

    function handleCloseModal() {
        closeModal()
    }

    function handleFavoriteClick() {
        const newFavorites = isFavorite(shop)
            ? favoriteShops.filter((e) => e.id !== shop.id)
            : [...favoriteShops, shop]

        saveFavoriteShops(newFavorites)
        updateDisplayedShops(ACTIONS.CHANGE_FAVORITES, newFavorites)
    }

    return (
        <ShopModalWrapper>
            <FirstLine>
                <FavoriteIcon
                    src={isFavorite(shop) ? fullHeart : emptyHeart}
                    onClick={handleFavoriteClick}
                ></FavoriteIcon>
                <ShopName>{shop.title.toUpperCase()}</ShopName>
                <CloseIcon src={cross} onClick={handleCloseModal}></CloseIcon>
            </FirstLine>

            <ModalContent>
                <TopWrapper>
                    <ImagesWrapper>
                        {shop.images_url.length == 1 && (
                            <ImageSingle>
                                <ImageOne src={shop.images_url[0]} />
                            </ImageSingle>
                        )}
                        {shop.images_url.length == 2 && (
                            <ImageDuo>
                                <ImageOne src={shop.images_url[0]} />
                                <ImageOne src={shop.images_url[1]} />
                            </ImageDuo>
                        )}
                        {shop.images_url.length > 2 && (
                            <>
                                <ImageLeft>
                                    <ImageOne src={shop.images_url[0]} />
                                </ImageLeft>
                                <ImageRight>
                                    <ImageTwo src={shop.images_url[1]} />
                                    <ImageTwo src={shop.images_url[2]} />
                                </ImageRight>
                            </>
                        )}
                    </ImagesWrapper>
                    <SecondLine>
                        <Tagline>{shop.tagline}</Tagline>
                        <IconList shop={shop}></IconList>
                    </SecondLine>
                    <Content
                        dangerouslySetInnerHTML={{ __html: shop.content }}
                    ></Content>
                </TopWrapper>
                <BottomWrapper>
                    <ThirdLine>
                        <ContactInformation>
                            {shop.phone_number && (
                                <PhoneNumber>
                                    <PhoneIcon src={phone}></PhoneIcon>
                                    {shop.phone_number}
                                </PhoneNumber>
                            )}
                            {shop.website && (
                                <Website href={shop.website} target="_blank">
                                    <PhoneIcon src={link}></PhoneIcon>Visit
                                    website
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
                            {shop.formatted_address && (
                                <Address>{shop.formatted_address}</Address>
                            )}
                            <LocalizeIcon src={target}></LocalizeIcon>
                        </AddressWrapper>
                    </ThirdLine>
                </BottomWrapper>
            </ModalContent>

            {/* <img src={shop.images_url[0]} alt={shop.id}></img> */}
        </ShopModalWrapper>
    )
}

export default ShopModal
