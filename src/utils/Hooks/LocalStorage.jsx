import { useEffect, useState } from 'react'

// export function useLocalStorage(id) {
//     const [data, setData] = useState()

//     useEffect(() => {
//         if (!id) return

//         async function getStoredData() {
//             try {
//                 const storedData = await JSON.parse(localStorage.getItem(id))
//                 setData(storedData)
//             } catch (err) {
//                 console.log(err)
//             } finally {
//             }
//         }
//         getStoredData()
//     }, [id])

//     return { data }
// }

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key)
            if (saved !== null) {
                return JSON.parse(saved)
            }
            return defaultValue
        } catch {
            return defaultValue
        }
    })

    console.log('inside useLocalStorage')
    console.log(value)

    useEffect(() => {
        const rawValue = JSON.stringify(value)
        localStorage.setItem(key, rawValue)
    }, [value])

    return [value, setValue]
}
