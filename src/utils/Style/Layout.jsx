const windowWidth = window.innerWidth
const overlaysSpacing = 15
const menuBarWidth = 60
const SideBarWidth = 380
const baseModalWidth = 600
const popupWidth = 200
const leftBLock = menuBarWidth + SideBarWidth + overlaysSpacing

const widthTaken = windowWidth - popupWidth - 2 * overlaysSpacing
const maxOverlayWidth = Math.min(widthTaken - leftBLock, baseModalWidth)

console.log(maxOverlayWidth)

const layout = {
    menuBarWidth: menuBarWidth.toString() + 'px',
    SideBarWidth: SideBarWidth.toString() + 'px',
    popupWidth: popupWidth,
    baseModalWidthPx: baseModalWidth.toString() + 'px',
    baseModalWidth: baseModalWidth,
    leftBLock: leftBLock,
    slightBorderRadius: '7px',
    overlaysSpacing: overlaysSpacing,
    overlaysSpacingPx: overlaysSpacing.toString() + 'px',
}

export default layout
