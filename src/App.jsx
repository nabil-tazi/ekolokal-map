import { useContext, useEffect, useState } from 'react'

import LoadingScreen from './Components/GenericComponents/LoadingScreen'
import Overlays from './Components/Overlays'
import Map from './Components/MapComponents/Map'
import Logo from './Components/GenericComponents/Logo'

import { ScopeContext } from './utils/Context/ScopeContext'
import { useWindowSize } from './utils/Hooks/WindowSize'
import { useLocalizeUser } from './utils/Hooks/LocalizeUser'

function App() {
    const { isLoading } = useContext(ScopeContext)
    const initCenter = [34.67, 135.49]
    // const [centerCoord, setCenterCoord] = useState([35.7115848, 139.7040355])
    const { mode } = useWindowSize()

    const { location, isLoadingLocalize } = useLocalizeUser()
    console.log('APP')

    console.log(location)

    return (
        <>
            {isLoading && <LoadingScreen />}
            <Overlays />
            <Map center={location} />
            {mode !== 'mobile' && <Logo />}
        </>
    )
}

export default App
