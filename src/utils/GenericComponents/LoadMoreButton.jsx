import styled from 'styled-components'

import { UserInterfaceContext } from '../Context/UserInterfaceContext'
import { useContext } from 'react'

const LoadButton = styled.div`
    width: 120px;
    color: white;
    background-color: #b2bdca;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 400;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    margin: auto;
    margin-bottom: 20px;
`

function LoadMoreButton() {
    const { loadMoreShops } = useContext(UserInterfaceContext)
    return <LoadButton onClick={loadMoreShops}>Load more...</LoadButton>
}
export default LoadMoreButton
