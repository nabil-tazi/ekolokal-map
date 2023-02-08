import styled from 'styled-components'
import arrow from '../../assets/left-arrow.png'
import { UserInterfaceContext } from '../context/UserInterfaceContext'
import { useContext } from 'react'

const LeftArrowIcon = styled.img`
    padding: 5px;
    width: 6px;
`

const CloseButton = styled.div`
    position: absolute;
    top: calc(50% - ${(props) => props.SIZE.HEIGHT} / 2);
    left: calc(380px - ${(props) => props.SIZE.WIDTH} / 2);

    height: ${(props) => props.SIZE.HEIGHT};
    width: ${(props) => props.SIZE.WIDTH};

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 600;

    background-color: #f8f8f4;
    border-radius: 5px;
    box-shadow: 0px 0px 5px gray;
    cursor: pointer;
    &:hover {
        background-color: #e9e9e9;
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
