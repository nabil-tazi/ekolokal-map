import styled from 'styled-components'

import emptyHeart from '../../assets/emptyHeart.png'
import fullHeart from '../../assets/fullHeart.png'

import { useContext } from 'react'
import { ScopeContext } from '../Context/ScopeContext'
import { ShopsDataContext } from '../Context/ShopsDataContext'

const FavoriteIcon = styled.img`
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 100%;
    filter: brightness(0) invert(1);

    cursor: pointer;
    &:hover {
        background-color: #00000035;
    }
`

function FavoriteButton({ shop }) {
    const { favoriteShops, saveFavoriteShops, isFavorite } =
        useContext(ScopeContext)

    const isModalShopFavorite = isFavorite(shop)

    const { ACTIONS, updateDisplayedShops } = useContext(ShopsDataContext)

    function handleFavoriteClick() {
        const newFavorites = isModalShopFavorite
            ? favoriteShops.filter((e) => e.id !== shop.id)
            : [...favoriteShops, shop]

        saveFavoriteShops(newFavorites)
        updateDisplayedShops(ACTIONS.CHANGE_FAVORITES, newFavorites)
    }

    return (
        <FavoriteIcon
            src={isModalShopFavorite ? fullHeart : emptyHeart}
            onClick={handleFavoriteClick}
        ></FavoriteIcon>
    )
}

export default FavoriteButton
