import { createGlobalStyle } from 'styled-components'
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

    .leaflet-control-attribution {
        display: none;
    }

    .leaflet-popup-close-button {
        display: none;
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle
