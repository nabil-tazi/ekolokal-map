import { useContext, useEffect, useState } from 'react'
import { ShopsDataContext } from '../Context/ShopsDataContext'

export function useLocalStorage(id) {
    const [data, setData] = useState()
    // const { saveFavoriteShops } = useContext(ShopsDataContext)

    useEffect(() => {
        if (!id) return

        async function getStoredData() {
            try {
                const storedFavorites = await JSON.parse(
                    localStorage.getItem(id)
                )
                setData(storedFavorites)
            } catch (err) {
                console.log(err)
            } finally {
            }
        }
        getStoredData()
    }, [id])

    return { data }
}
