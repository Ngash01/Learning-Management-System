"use client"
import { Input } from '@/components/ui/input'
import { DebounceHook, UseDebounce } from '@/lib/useDebounce'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'

export const SearchInputComponent = () => {
    const [ value, setValue] = useState()
    const debounce = DebounceHook(value)


    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")

    useEffect(()=>{
        const url = queryString.stringifyUrl({
            url: pathname,
            query:{
                title: debounce,
                categoryId: currentCategoryId
            }
        }, {skipNull: true, skipEmptyString: true})

        router.push(url)

    },[debounce, pathname, currentCategoryId, router])

  return (
    <div className='relative'>
        <Search className='h-5 w-5 absolute left-3 top-4 '/>
        <Input className="w-[20rem] md:w-[40rem] pl-10 border-2  py-6 rounded-3xl text-base focus:border-none bg-sky-300/20" 
        placeholder="Search for a course" value={value}  onChange={(e)=>setValue(e.target.value)}/>
    </div>
  )
}
