import { useState, useEffect, useContext } from 'react'
import { ShopsDataContext } from '../Context/ShopsDataContext'

export const useLocalizeUser = () => {
    // const defaultLocation = [34.67, 135.49]
    const defaultLocation = [35.644169, 139.6984493]

    const [isLoadingLocalize, setLoadingLocalize] = useState(true)

    const [location, setLocation] = useState(defaultLocation)

    const { mapRef } = useContext(ShopsDataContext)

    async function getLocation() {
        if ('geolocation' in navigator) {
            console.log('Available')
            return navigator.geolocation.getCurrentPosition(function (
                position
            ) {
                console.log('Latitude is :', position.coords.latitude)
                console.log('Longitude is :', position.coords.longitude)
                setLocation([
                    position.coords.latitude,
                    position.coords.longitude,
                ])
                mapRef.current.flyTo(
                    [position.coords.latitude, position.coords.longitude],
                    16,
                    { duration: 0.5 }
                )
            })
        } else {
            console.log('Not Available')
            return defaultLocation
        }
    }

    useEffect(() => {
        console.log('HERE')
        setLoadingLocalize(true)

        async function localizeUser() {
            try {
                // const response = await getLocation()
                getLocation()
            } catch (err) {
                console.log(err)
                // setError(true)
            } finally {
                setLoadingLocalize(false)
            }
        }
        localizeUser()
    }, [])

    return { isLoadingLocalize, location, setLocation }
}
