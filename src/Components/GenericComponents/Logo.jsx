import styled from 'styled-components'
import logo from '../../assets/ekolokal-logo.png'
import { devices } from '../../utils/Style/Layout'

const EkolokalLogo = styled.img`
    position: absolute;
    @media ${devices.mobileS} {
        bottom: 80px;
        width: 80px;
    }
    @media ${devices.tablet} {
        bottom: 20px;
        width: 100px;
    }
    right: 20px;
    z-index: 900;
    border-radius: 100%;
    box-shadow: 0px 0px 10px gray;
    cursor: pointer;
    transition: transform 0.2s ease-in;

    &:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease-in;
    }
`

function Logo() {
    return <EkolokalLogo src={logo} />
}

export default Logo
