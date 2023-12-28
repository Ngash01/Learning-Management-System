"use client"
import { useEffect, useState } from 'react'

export const DebounceHook = (value) => {
    const [debouncedValue, setDebouncedValue] = useState("")
    console.log("value", debouncedValue)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value)
            console.log("debounced value", debouncedValue)
        },500)

        return ()=> clearTimeout(timer)
        
    },[debouncedValue, value])

  return (
    debouncedValue
  )
}

