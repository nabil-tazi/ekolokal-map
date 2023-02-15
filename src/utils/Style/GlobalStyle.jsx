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
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle
