import { useEffect, useState } from "react"

//custom hook
export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        // Makes sure that T is not a function
        if (typeof initialValue === 'function') {
            // invoking initial value as a function
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    })

    return [value, setValue] as [typeof value, typeof setValue]
}