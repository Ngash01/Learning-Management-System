"use client"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/test-search/useDebounce"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"

 const SearchInput = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname()

  const currentCategoryId  = searchParams.get("categoryId");
  // const currentTitle = searchParams.get("title");

  console.log("currentCategoryId", currentCategoryId)
  console.log("curr Pathname", pathname)



  useEffect(()=>{
    const url = queryString.stringifyUrl({
      url: pathname,
      query:{
        title: debouncedValue,
        categoryId: currentCategoryId
      }
    }, {skipNull: true, skipEmptyString: true})

    router.push(url)
  },[debouncedValue, pathname, currentCategoryId, router])

  return (
    <div className="flex relative">
        <Search className="h-5 w-5 absolute top-4 left-3 text-slate-600"/>
        <Input placeholder="Search for a course" className="p-3 focus:border-2 border-blue-200
         md:w-[40rem] pl-11 py-6 bg-blue-200/20 rounded-full text-base" value={value} onChange={(e)=>setValue(e.target.value)}/>
    </div>
  )
}

