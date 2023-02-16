import { useState, useEffect } from 'react'

function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize())

    function handleResize() {
        setWindowSize(getWindowSize())
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowSize
}
