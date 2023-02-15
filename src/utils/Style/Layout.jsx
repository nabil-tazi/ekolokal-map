// const resizeObserver = new ResizeObserver((e) => {
//     windowWidth = window.innerWidth
// })

// resizeObserver.observe(document.body)

// addEventListener('resize', (event) => {})

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
    screenWidth: windowWidth,
    popupWidth: popupWidth,
    baseModalWidth: baseModalWidth.toString + 'px',
    maxOverlayWidth: maxOverlayWidth.toString() + 'px',
    widthTaken: widthTaken,
    leftBLock: leftBLock,
    slightBorderRadius: '7px',
    overlaysSpacing: overlaysSpacing.toString() + 'px',
}

export default layout
