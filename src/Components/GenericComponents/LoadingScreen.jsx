import styled from 'styled-components'
import logo from '../../assets/ekolokal-logo.png'

const FullWidthLoadingScreen = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #fef2e2;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingLogo = styled.img`
    margin-bottom: 100px;
    width: 170px;
`

function LoadingScreen() {
    return (
        <FullWidthLoadingScreen>
            <LoadingLogo src={logo}></LoadingLogo>
        </FullWidthLoadingScreen>
    )
}

export default LoadingScreen
