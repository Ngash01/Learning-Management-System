"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { AlertDialog } from './AlertDialog'
import {  useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const ChapterActions = ({chapter, course, isComplete}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handlePublish = async()=>{
        try{
            if(chapter.isPublished){
                setIsLoading(true)
                const res = await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}/unpublish`)
                toast.success("Chapter unpublished!")
                setIsLoading(false)
                window.location.reload()
                
            }else{
                setIsLoading(true)
                const res = await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}/publish`)
                toast.success("Chapter published!")
                setIsLoading(false)
                window.location.reload()

            }
        }catch(err){
            console.log("An error occured!", err)
            toast.error ("an error occured")
            setIsLoading(false)
        }
    }

    const onDelete = async()=>{
        try{
            setIsLoading(true)
            const res = await axios.delete(`/api/courses/${course.id}/chapters/${chapter.id}`)
            toast.success("Chapter deleted successfully!")
            setIsLoading(false)
            window.location.reload()
            router.push(`/teacher/courses/${course.id}`)
            
        }catch(err){
            console.log("An error occured!", err)
            toast.error("Something went wrong!")
            setIsLoading(false)
        }
    }

  return (
    <div className='flex gap-3 items-center'>
        <Button variant="destructive" disabled={!isComplete || isLoading} onClick={handlePublish}>
            {chapter.isPublished ? "Unpublish" : "Publish"}
        </Button>
        <AlertDialog handleConfirm={onDelete} disabled={isLoading}>
            <Button >
                <Trash2 className='h-5 w-5'/>
            </Button>
        </AlertDialog>

    </div>
  )
}

export default ChapterActions;
