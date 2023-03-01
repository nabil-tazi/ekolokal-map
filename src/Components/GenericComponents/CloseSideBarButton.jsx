import styled from 'styled-components'
import arrow from '../../assets/left-arrow.png'
import { UserInterfaceContext } from '../../utils/Context/UserInterfaceContext'
import { useContext } from 'react'
import layout from '../../utils/Style/Layout'
import colors from '../../utils/Style/Colors'
import { devices } from '../../utils/Style/Layout'

const LeftArrowIcon = styled.img`
    padding: 5px;
    width: 6px;
`

const CloseButton = styled.div`
    height: ${(props) => props.SIZE.HEIGHT};
    width: ${(props) => props.SIZE.WIDTH};

    z-index: 900;

    @media ${devices.mobileS} {
        position: relative;
        transform: translateY(15px) translateX(calc(100vw / 2)) rotate(-90deg);
    }
    @media ${devices.tablet} {
        position: absolute;
        transform: translateY(calc(50vh - ${(props) => props.SIZE.HEIGHT} / 2))
            translateX(
                calc(
                    ${layout.SideBarWidthPx} -
                        (${(props) => props.SIZE.WIDTH} / 2)
                )
            );

        /* top: calc(50% - ${(props) => props.SIZE.HEIGHT} / 2);
        left: calc(
            ${layout.SideBarWidthPx} - ${(props) => props.SIZE.WIDTH} / 2
        ); */
    }
    display: flex;
    justify-content: center;
    align-items: center;

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
