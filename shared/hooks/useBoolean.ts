import { useCallback, useState } from 'react'

export const useBoolean = (defaultValue = false) => {
    const [value, setValue] = useState(Boolean(defaultValue))

    const setTrue = useCallback(() => setValue(true), [])
    const setFalse = useCallback(() => setValue(false), [])
    const toggle = useCallback(() => setValue((v) => !v), [])

    return { setFalse, setTrue, setValue, toggle, value }
}
