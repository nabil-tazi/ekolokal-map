import styled from 'styled-components'
import arrow from '../../assets/left-arrow.png'
import { UserInterfaceContext } from '../Context/UserInterfaceContext'
import { useContext } from 'react'
import layout from '../Style/Layout'
import colors from '../Style/Colors'
import { devices } from '../Style/Layout'

const LeftArrowIcon = styled.img`
    padding: 5px;
    width: 6px;
`

const CloseButton = styled.div`
    position: absolute;
    top: calc(50% - ${(props) => props.SIZE.HEIGHT} / 2);
    // prettier-ignore
    left: calc(${layout.SideBarWidthPx} + ${layout.menuBarWidthPx} - ${(
        props
    ) => props.SIZE.WIDTH} / 2);

    height: ${(props) => props.SIZE.HEIGHT};
    width: ${(props) => props.SIZE.WIDTH};

    /* @media ${devices.mobileS} {
        display: none;
    } */
    /* @media ${devices.tablet} {
       
    }  */
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 600;

    background-color: ${colors.primaryBackground};
    border-radius: 5px;
    box-shadow: 0px 0px 5px gray;
    cursor: pointer;
    pointer-events: auto;
    &:hover {
        background-color: ${colors.hoverBackground};
    }
`

function CloseSideBarButton() {
    const SIZE = {
        HEIGHT: '30px',
        WIDTH: '15px',
    }

    const { closeSideBar } = useContext(UserInterfaceContext)
    return (
        <CloseButton onClick={closeSideBar} SIZE={SIZE}>
            <LeftArrowIcon src={arrow}></LeftArrowIcon>
        </CloseButton>
    )
}

export default CloseSideBarButton
