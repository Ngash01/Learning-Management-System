"use client"
import { Pencil, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { ChaptersList } from '../chapters_component/ChaptersList';
import { ConfettiStore } from '@/lib/use-confetti-store';


const ChaptersForm = ({course, chapters}) => {
    const [isCreating, setisCreating] = useState(false)
    // const [chapterInput, setChapter] = useState("")    

    // const notValid = chapterInput === ""

    const toggleCreate = ()=>{
        setisCreating((curr)=> !curr)
    }

    const form = useForm()

    const { isSubmitting } = form.formState;


    const submitForm = async(values)=>{
       try{
        const res = await axios.post(`/api/courses/${course.id}/chapters`, values)
        toast.success("Chapter created successfully!")
        console.log("Here are the values: ",values)
        window.location.reload()
        toggleCreate()

       }catch(err){
        console.log("An error occured on the client side: ",err)
        toast.error("Something went wrong!")
       }
    }

  return (
    <div className='p-4 bg-slate-400/20 rounded-md mt-6 space-y-3'>
        <div className='flex font-medium justify-between items-center'>
            <p>Chapter title</p>
            <Button className='flex gap-1 items-center' variant="ghost" onClick={toggleCreate}>
                {!isCreating ? (
                    <>
                        <PlusCircle className='h-4 w-4'/>
                        Add a chapter
                    </>
                ):(
                    <p>
                        Cancel
                    </p> 
                )}
            </Button>
        </div>
        {!isCreating ? (
            <div>{!chapters.length > 0 ? <p className='text-sm text-gray-500 '>Add a chapter for your course</p> : (
               <ChaptersList chapters={chapters} course={course}/>
            )}</div>
        ): (
            <form className='space-y-2' onSubmit={form.handleSubmit(submitForm)}>
                <input placeholder='e.g this is a course on web development' {...form.register("title1", {required: "true"})} className='w-full rounded-md p-3' 
                //  onChange={(e)=>setChapter(e.target.value)} 
                 />
                <div className='w-full'>
                    <Button className={cn("text ml-auto rounded-md py-2 px-3 bg-black text-white disabled:bg-gray-700 disabled:cursor-not-allowed")}
                     disabled={isSubmitting } type="submit"> 
                        Create
                    </Button>
                </div>
            </form>
        )}

    </div>
  )
}

export default ChaptersForm;


