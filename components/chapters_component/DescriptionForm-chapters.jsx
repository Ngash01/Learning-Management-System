"use client"
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { cn } from '@/lib/utils';


const ChaptersDescriptionForm = ({course, chapter}) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = ()=>{
        setIsEditing((curr)=> !curr)
    }

    const form = useForm({
        defaultValues:{
            courseDescription: chapter.description
        }
    })

    const { isSubmitting, isValid } = form.formState;


    const submitForm = async(values)=>{

       try{
        const res = await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, values)
        toast.success("Description updated successfully!")
        console.log("Description here", values)
        toggleEdit()
        window.location.reload()

       }catch(err){
        console.log("An error occured on the client side: ",err)
        toast.error("Something went wrong!")
       }
    }

  return (
    <div className='p-4 bg-slate-400/20 rounded-md mt-6 space-y-3'>
        <div className='flex font-medium justify-between items-center'>
            <p>Description Title</p>
            <Button className='flex gap-1 items-center' variant="ghost" onClick={toggleEdit}>
                {!isEditing ? (
                    <>
                        <Pencil className='h-4 w-4'/>
                        Edit Description
                    </>
                ):(
                    <p>
                        Cancel
                    </p> 
                )}
            </Button>
        </div>
        {!isEditing ? (
            <p className=' text-base text-gray-500 '>{!chapter.description ? "Add a description for your course" : chapter.description}</p>
        ): (
            <form className='space-y-3' onSubmit={form.handleSubmit(submitForm)}>
                <textarea placeholder='e.g this is a course on web development' {...form.register("courseDescription", {required: "true"})}  className='w-full rounded-md p-3' 
                // value={text}  onChange={(e)=>setText(e.target.value)} 
                />
                <div className='w-full'>
                    <button className={cn("text ml-auto rounded-md py-2 px-3 bg-black text-white disabled:bg-gray-700 disabled:cursor-not-allowed")}
                     disabled={isSubmitting} type="submit"> 
                        Save
                    </button>
                </div>
            </form>
        )}

    </div>
  )
}

export default ChaptersDescriptionForm;


