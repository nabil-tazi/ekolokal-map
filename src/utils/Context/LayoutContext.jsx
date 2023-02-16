import { createContext } from 'react'
import { useWindowSize } from '../Hooks/WindowSize'
import layout from '../Style/Layout'

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
    const windowSize = useWindowSize()

    const widthTaken =
        windowSize.width - layout.popupWidth - 2 * layout.overlaysSpacing

    console.log('from custom hook : ')
    console.log(windowSize.width)
    const maxOverlayWidth = Math.min(
        widthTaken - layout.leftBLock,
        layout.baseModalWidth
    )

    return (
        <LayoutContext.Provider value={{ widthTaken, maxOverlayWidth }}>
            {children}
        </LayoutContext.Provider>
    )
}
