"use client"
import { PencilIcon, PlusCircle, Video } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { UploadDropzone } from '@/lib/uploadthing'
import toast from 'react-hot-toast'
import axios from 'axios'

export const ChapterVideo = ({chapter, course}) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEditing = ()=>{
        setIsEditing((curr)=>!curr)
    }

    const submitForm = async(values)=>{
        console.log("values here", values)
        try{
            const res = await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, values)
            toast.success("Chapter video updated successfully!")
            toggleEditing()
            window.location.reload()

        }catch(err){
            console.log("A client error occured!", err)
            toast.error("Something went Wong!")
        }
    }

  return (
    <div className='bg-gray-400/20 p-4 rounded-md'>
        <div className='flex justify-between items-center text-normal font-medium'>
            Chapter video
            <Button variant="ghost" className='flex items-center gap-1' onClick={toggleEditing}>
                {!isEditing ? (
                    <>
                        {!chapter.videoUrl ? 
                        <>
                            <PlusCircle className='h-4 w-4 '/>
                            Add a Video
                        </>
                        :
                        (
                              <>
                              <PencilIcon className='h-4 w-4 '/>
                              Edit Video
                          </>
                        )
                        }  
                    </>
                ):(
                    <>Cancel</>
                )} 
            </Button>
        </div>
        {!isEditing && !chapter.videoUrl && (
            <div className='aspect-video flex items-center justify-center bg-gray-700/20 rounded-md'>
                <Video className=' h-14 w-14 text-gray-500'/>
            </div>
        )}
        {!isEditing && chapter.videoUrl &&(
            <video src={chapter.videoUrl} controls autoPlay className="" poster='https://static.vecteezy.com/system/resources/previews/009/264/644/original/lms-learning-management-system-as-online-education-concept-educational-technology-online-learning-delivery-training-knowledge-software-application-qualification-framework-illustration-free-vector.jpg' />
        )}
        {isEditing && (
            <UploadDropzone className="aspect-video"
            endpoint="chapterVideo"
            onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            submitForm(res[0])
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
        <p className='text-xs mt-1'>Aspect ratio 16:9 recommended</p>
    </div>
  )
}



