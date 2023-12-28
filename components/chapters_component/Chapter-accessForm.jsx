"use client"
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { cn } from '@/lib/utils';


const ChapterAccessForm = ({course, chapter}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isChecked, setIsChecked] = useState(chapter.isFree)

    const toggleEdit = ()=>{
        setIsEditing((curr)=> !curr)
    }

    const form = useForm()


    const { isSubmitting, isValid } = form.formState;


    const submitForm = async()=>{

       try{
        const res = await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, {isFreee: isChecked})
        toast.success("Access updated successfully!")
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
            <p>Access </p>
            <Button className='flex gap-1 items-center' variant="ghost" onClick={toggleEdit}>
                {!isEditing ? (
                    <>
                        <Pencil className='h-4 w-4'/>
                        Edit Access
                    </>
                ):(
                    <p>
                        Cancel
                    </p> 
                )}
            </Button>
        </div>
        {!isEditing ? (
            <div className=' text-base text-gray-500 '>{!chapter.isFree ? 
                <p>This chapter is <b>not free</b> for preview</p> 
                : 
                <p>This chapter is <b>free</b> for preview!</p>}
            </div>
        ): (
            <form className='space-y-3' onSubmit={form.handleSubmit(submitForm)}>
                <div className='flex items-center gap-3 '>
                    <input type='checkbox' id='checkbox' className='w-6 h-6 cursor-pointer'  
                    checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)}
                    />
                    <label htmlFor="checkbox" className='text-sm'>Check this box if you want to make this chapter free for preview</label>
                </div>
                <div className='w-full'>
                    <button className={cn("text ml-auto rounded-md py-2 px-3 bg-black text-white disabled:bg-gray-500 disabled:cursor-not-allowed")}
                     disabled={isSubmitting} type="submit"> 
                        Save
                    </button>
                </div>
            </form>
        )}

    </div>
  )
}

export default ChapterAccessForm;


