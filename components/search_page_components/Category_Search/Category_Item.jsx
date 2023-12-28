"use client"
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString  from "query-string";
import qs from "query-string"

const CategoryItem = ({name, id, icon:Icon}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title")

  const isSelected = currentCategoryId === id

  const handleClick = ()=>{
    const url = queryString.stringifyUrl({
      url: pathname,
      query:{
        title: currentTitle,
        categoryId: isSelected ? null : id
      }
    }, {skipNull: true, skipEmptyString:true})

    router.push(url)
  }


  return (
    <button onClick={handleClick}
    className={cn("flex gap-x-1 flex-none items-center p-2 rounded-full border-2 border-blue-400/20 hover:border-sky-400 transition", 
    isSelected && "bg-sky-200 border-sky-500 hover:border-sky-500 text-sky-800")}>
      <Icon className="h-6 w-6"/>
      <p className="text-base">{name}</p>
    </button>
  )
}

export default CategoryItem;


