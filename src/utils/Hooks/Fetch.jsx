import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [isLoadingFetch, setLoadingFetch] = useState(true)
    const [error, setError] = useState(false)

    const [fetchedData, setData] = useState([])

    useEffect(() => {
        if (!url) return
        setLoadingFetch(true)

        async function fetchData() {
            try {
                const response = await fetch(url)
                const parsedData = await response.json()
                setData(parsedData)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoadingFetch(false)
            }
        }
        fetchData()
    }, [url])

    return { isLoadingFetch, fetchedData }
}
