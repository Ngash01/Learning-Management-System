"use client"
import { Pencil, PlusCircle } from 'lucide-react';
import * as z from 'zod';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { UploadDropzone } from '@uploadthing/react';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';


const ImageForm = ({imageUrl, course}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState()

    const toggleEdit = ()=>{
        setIsEditing((curr)=> !curr)
    }

    if(uploadedImageUrl){
      console.log("Uploaded Image Url", uploadedImageUrl)    
    }


  const submitForm = async(uploadthingUrl)=>{
      try{
        const res = await axios.patch(`/api/courses/${course.id}`, {imageUrl: uploadthingUrl} )
        toast.success("Image Uploaded Successfully!")
        window.location.reload()
        
      }catch(err){
        console.log("An error occured - axios", err)
        toast.error("Something went wrong!")
      }
  }


  return (
    <div className='p-4 bg-slate-400/20 rounded-md'>
        <div className='flex items-center justify-between'>
            Course Image
            <Button className='flex items-center gap-1' variant="none" onClick={toggleEdit}>
                {!isEditing && imageUrl && (
                    <>
                        <Pencil className='h-4 w-4'/>
                        Edit Image
                    </>
                )}
                {isEditing && (
                    <p>Cancel</p>
                )}                
            </Button>
            {!isEditing && !imageUrl && (
                  <div className='flex items-center gap-x-1'>
                    <PlusCircle className='h-4 w-4'/>
                    Add An Image
                  </div>
                )}
                
        </div>    
        {!isEditing  && imageUrl ? (
            <img src={imageUrl} alt="" className='rounded-md mt-5 aspect-video object-cover'/>

        ):
            <UploadDropzone 
                endpoint="courseImage"
                onClientUploadComplete={(res) => {
                console.log("Files: ", res[0]);
                setUploadedImageUrl(res[0].url)
                submitForm(res[0].url)
                toast.success("File Upload success. Be sure to save the changes")
                }}
                onUploadError={(error) => {
                // Do something with the error.
                toast.error("Something went wrong!")
                console.log("Error", error)
                }}
            />}

            <div className='text-xs text-gray-500 mt-3'>
              16:9 aspect ratio recommended
            </div>
            
    </div>
  )
}


export default ImageForm;



