import styled from 'styled-components'
import colors from '../Style/Colors'

import cross from '../../assets/cross.png'
import goback from '../../assets/undo.png'

import { useContext } from 'react'
import { UserInterfaceContext } from '../Context/UserInterfaceContext'
import { useWindowSize } from '../Hooks/WindowSize'

const CloseModalIcon = styled.img`
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

function CloseModalButton() {
    const { isSideBarOpen, closeModal } = useContext(UserInterfaceContext)
    const { mode } = useWindowSize()

    return (
        <CloseModalIcon
            src={isSideBarOpen && mode === 'mobile' ? goback : cross}
            onClick={() => closeModal()}
        />
    )
}

export default CloseModalButton
