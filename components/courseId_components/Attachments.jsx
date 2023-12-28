"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { File, PencilIcon, Trash2 } from 'lucide-react'
import { UploadDropzone } from '@/lib/uploadthing'
import axios from 'axios'
import toast from 'react-hot-toast'

export const Attachments = ({course}) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleClick = ()=>{
        setIsEditing((curr)=>!curr)
    }

    // Send to the database
    const SubmitAttachments = async(values)=>{
        try{
            const res = await axios.post(`/api/courses/${course.id}/attachments`, values)
            toast.success("Attachment added successfully!")
            toggleClick()
            window.location.reload()
        }catch(err){
            console.log("A client error occured - Attachment ",err)
            toast.error("Something went wrong!")
        }
    }

    // delete from the database
    const handleDelete = async(value)=>{
        try{
            const deleteAttachment = await axios.delete(`/api/courses/${course.id}/attachments`,{data: value})
            toast.success("Course attachment deleted successfully!")
            window.location.reload()
        }catch(err){
            console.log("client error - DELETE", err)
            toast.error("Something went wrong!")
        }
    }

  return (
    <div className='bg-slate-400/20 rounded-md p-4 space-y-3'>
        <div className='flex items-center justify-between font-normal'>
            Course attachments
            <Button className='' variant="ghost" onClick={toggleClick}>
                {!isEditing ? (
                    <div className='flex items-center'>
                        <PencilIcon className='h-4 w-4 mr-2'/>
                        Add a file
                    </div>
                ):(
                    <p>Cancel</p>
                )}
            </Button>
        </div>
       {!isEditing ? (
            <div>
                {course.attachments.length > 0 ? (
                    <div className='space-y-3'>
                        {course.attachments.map((attachment)=>{
                            return(
                                <div key={attachment.id} className='bg-sky-400/20 p-2 rounded-md flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <File className="h-4 w-4 text-green-500"/>
                                        <p className='text-sm'>{attachment.name}</p>
                                    </div>
                                    <Trash2 className='text-red-500 h-4 w-4 cursor-pointer' onClick={()=>handleDelete(attachment)}/>
                                </div>
                            )
                        })}
                    </div>
                ):(
                    <p className='italic text-gray-500'>No attachments found!</p>
                )}
            </div>
       ):(
        <UploadDropzone
        endpoint="Attachment"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res[0]);
          SubmitAttachments(res[0])

        }}
        onUploadError={(err) => {
        console.log("An error occured!", err)
        toast.error("Something went wrong!")
        }}
      />
       )}
    </div>
  )
}

 

