import { useState, useContext, useEffect } from 'react'
import { ShopsDataContext } from '../Context/ShopsDataContext'
import { recursiveCategoryFilter } from '../maputils'
import { TYPES } from '../Configuration/TypeConfig'

export function useFetch(url) {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { initAllShops, initAllEvents, initDisplayedShops, initScope } =
        useContext(ShopsDataContext)

    useEffect(() => {
        if (!url) return
        setLoading(true)

        async function fetchShops() {
            try {
                const response = await fetch(
                    `https://ekolokal.com/wp-json/wl/v1/shops`
                )
                const parsedData = await response.json()
                initAllShops(parsedData)
                initAllEvents(
                    recursiveCategoryFilter([TYPES.EVENT], parsedData)
                )
                initScope(parsedData)
                initDisplayedShops()
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchShops()
    }, [url])

    return { isLoading }
}
