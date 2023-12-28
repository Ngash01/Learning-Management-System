"use client"
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { cn } from '@/lib/utils';


const DescriptionForm = ({course, description}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(description)    

    const toggleEdit = ()=>{
        setIsEditing((curr)=> !curr)
    }

    const form = useForm()

    const { isSubmitting, isValid } = form.formState;


    const submitForm = async()=>{

       try{
        const res = await axios.patch(`/api/courses/${course.id}`, {description: text})
        toast.success("Description updated successfully!")
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
            <p className=' text-base text-gray-500 '>{!description ? "Add a description for your course" : description}</p>
        ): (
            <form className='space-y-3' onSubmit={form.handleSubmit(submitForm)}>
                <textarea placeholder='e.g this is a course on web development'  className='w-full rounded-md p-3' 
                value={text}  onChange={(e)=>setText(e.target.value)} />
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

export default DescriptionForm;


