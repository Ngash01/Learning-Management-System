"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import queryString from 'query-string'

 const CategoryItem = ({label, value, icon: Icon}) => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("currentTitle")

    const isSelected = currentCategoryId === value


    const handleClick = ()=>{
        const url = queryString.stringifyUrl({
            url: pathname,
            query:{
                title: currentTitle,
                categoryId: isSelected ? null : value
            }
        }, {skipNull: true, skipEmptyString: true})

        router.push(url)
    }

  return (
    <button type="button" onClick={handleClick}
    className={cn('flex items-center py-2 px-3 border-2 bg-slate-200/10 rounded-full gap-x-1 hover:border-sky-600/40 hover:transition',
     isSelected && "border-sky-700 hover:border-sky-700 bg-sky-200/20 text-sky-800" 
    )}
     >
        <Icon className="h-6 w-6"/>
        <div className='text-normal truncate'>
            <p>{label}</p>
        </div>
    </button>
  )
}



