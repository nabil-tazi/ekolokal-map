import { createGlobalStyle } from 'styled-components'
import { useWindowSize } from '../Hooks/WindowSize'
import colors from './Colors'
import font from './Font'

const StyledGlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    }

    * {
        font-family: ${font.textFamily};
        font-weight: ${font.textWeight};
        color: ${colors.primaryText};
    }

    h2 {
        font-family: ${font.titleFamily};
        font-weight: ${font.titleWeight};
        color: ${colors.titleText};
        font-size: ${font.titleSize};
    }

    .leaflet-control-attribution {
        display: none;
    }

    .leaflet-popup-close-button {
        display: none;
    }

    .leaflet-top {
        z-index: 700;
        display: ${(props) => (props.mode === 'mobile' ? 'none' : 'block')};
    }
`

function GlobalStyle() {
    const { mode } = useWindowSize()
    return <StyledGlobalStyle mode={mode} />
}

export default GlobalStyle
