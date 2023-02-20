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

const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
}

export const devices = {
    mobileS: `(min-width: ${sizes.mobileS})`,
    mobileM: `(min-width: ${sizes.mobileM})`,
    mobileL: `(min-width: ${sizes.mobileL})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    laptopL: `(min-width: ${sizes.laptopL})`,
    desktop: `(min-width: ${sizes.desktop})`,
}

const layout = {
    menuBarWidthPx: menuBarWidth.toString() + 'px',
    SideBarWidthPx: SideBarWidth.toString() + 'px',
    popupWidth: popupWidth,
    baseModalWidthPx: baseModalWidth.toString() + 'px',
    baseModalWidth: baseModalWidth,
    leftBLock: leftBLock,
    slightBorderRadius: '7px',
    overlaysSpacing: overlaysSpacing,
    overlaysSpacingPx: overlaysSpacing.toString() + 'px',
}

export default layout
