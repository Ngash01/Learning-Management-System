"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import {  useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AlertDialog } from '../chapters_component/AlertDialog'
import { ConfettiStore } from '@/lib/use-confetti-store'

const CourseActions = ({ course, isComplete }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)


    const delayRefresh = ()=>{
        const timer = setTimeout(()=>{
            window.location.reload()
            router.push('/search')
            
        },8000)
        return ()=> clearTimeout(timer)
    }

    const delayToastSuccess = ()=>{
        const timer = setTimeout(()=>{
            toast.success("Course published!")
        },5000)
        return ()=> clearTimeout(timer)
    }


    const handlePublish = async()=>{
        try{
            if(course.isPublished){
                setIsLoading(true)
                const res = await axios.patch(`/api/courses/${course.id}/unpublish`)
                toast.success("Course unpublished!")
                setIsLoading(false)
                window.location.reload()

                
            }else{
                setIsLoading(true)
                const res = await axios.patch(`/api/courses/${course.id}/publish`)
                // toast.success("Course published!")
                delayToastSuccess()
                setShowConfetti(true)
                setIsLoading(false)
                delayRefresh()
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
            const res = await axios.delete(`/api/courses/${course.id}`)
            toast.success("Course deleted successfully!")
            setIsLoading(false)
            window.location.reload()
            router.push(`/teacher/courses/`)
            
        }catch(err){
            console.log("An error occured!", err)
            toast.error("Something went wrong!")
            setIsLoading(false)
        }

    }

  return (
    <div className='flex gap-3 items-center'>
        <Button variant="destructive" disabled={!isComplete || isLoading} onClick={handlePublish}>
            {course.isPublished ? "Unpublish" : "Publish"}
        </Button>
        <AlertDialog handleConfirm={onDelete} disabled={isLoading}>
            <Button>
                <Trash2 className='h-5 w-5'/>
            </Button>
        </AlertDialog>
        {showConfetti && <ConfettiStore/>}
    </div>
  )
}

export default CourseActions;


