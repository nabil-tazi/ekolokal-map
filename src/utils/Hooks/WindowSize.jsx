import { useState, useEffect } from 'react'

function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

function getDeviceFromWindow(width) {
    return width >= 2560
        ? 'desktop'
        : width >= 1440
        ? 'laptopL'
        : width >= 1024
        ? 'laptop'
        : width >= 768
        ? 'tablet'
        : width >= 425
        ? 'mobileL'
        : width >= 375
        ? 'mobileM'
        : 'mobileS'
}

function getModeFromDevice(device) {
    return device === 'desktop' ||
        device === 'laptopL' ||
        device === 'laptop' ||
        device === 'laptop'
        ? 'laptop'
        : device === 'tablet'
        ? 'tablet'
        : 'mobile'
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize())
    const [device, setDevice] = useState(
        getDeviceFromWindow(getWindowSize().width)
    )
    const [mode, setMode] = useState(
        getModeFromDevice(getDeviceFromWindow(getWindowSize().width))
    )

    function handleResize() {
        console.log(windowSize.width)
        setWindowSize(getWindowSize())
        setDevice(getDeviceFromWindow(getWindowSize().width))
        setMode(getModeFromDevice(getDeviceFromWindow(getWindowSize().width)))
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return { windowSize: windowSize, device: device, mode: mode }
}
