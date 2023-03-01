import { useContext } from 'react'

import LoadingScreen from './Components/GenericComponents/LoadingScreen'
import Overlays from './Components/Overlays'
import Map from './Components/MapComponents/Map'
import Logo from './Components/GenericComponents/Logo'

import { ScopeContext } from './utils/Context/ScopeContext'
import { useWindowSize } from './utils/Hooks/WindowSize'

function App() {
    const { isLoading } = useContext(ScopeContext)
    const initCenter = [34.67, 135.49]
    const { mode } = useWindowSize()

    return (
        <>
            {isLoading && <LoadingScreen />}
            <Overlays />
            <Map center={initCenter} />
            {mode !== 'mobile' && <Logo />}
        </>
    )
}

export default App
