import { useState, useContext, useEffect } from 'react'
import { ShopsDataContext } from '../Context/ShopsDataContext'
import { recursiveCategoryFilter } from '../maputils'
import { TYPES } from '../Configuration/TypeConfig'
import { ScopeContext } from '../Context/ScopeContext'

export function useFetch(url) {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { initDisplayedShops } = useContext(ShopsDataContext)

    const { initAllShops, initAllEvents, initScope } = useContext(ScopeContext)

    useEffect(() => {
        if (!url) return
        setLoading(true)

        async function fetchShops() {
            try {
                const response = await fetch(url)
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
