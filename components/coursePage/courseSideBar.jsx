"use client"
import { cn } from '@/lib/utils'
import { Lock, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react';
import { useParams, usePathname } from "next/navigation";
import { CourseProgress } from './CourseProgress';


export const CourseSideBar = ({chapters, price, title, imageUrl, description, id}) => {
    const params = useParams()
    const pathname = usePathname()

    console.log("pathname here: ", pathname)
    console.log("params here", params)

    
  return (
    <div className='flex flex-col'>
        <div className='p-8 border-b'>
            <p className='text-xl font-semibold mb-2'>{title}</p>
            <CourseProgress chapters={chapters}/>
        </div>
        <div>
            {chapters.map((chapter)=>{
                const isSelected = pathname.includes(chapter.id)
                return(
                    <Link href={`/courses/${id}/chapters/${chapter.id}`}  key={chapter.id}>
                        <div className={cn('flex items-center gap-x-2 py-3 text-center cursor-pointer pl-6 hover:bg-slate-300/20 transition bg', 
                        isSelected && "bg-sky-500/20 text-sky-700 hover:bg-sky-500/20 border-r-4 border-sky-800 ")}>
                            {chapter.isFree ? (
                                <PlayCircle className={cn('h-6 w-6 text-gray-500', isSelected && "text-sky-700")}/>
                                ): (
                                <Lock className={cn('h-6 w-6 text-gray-500', isSelected && "text-sky-700")}/>
                                )}
                            <p className={cn('text-base text-gray-500', isSelected && "text-sky-700")}>{chapter.title}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}


