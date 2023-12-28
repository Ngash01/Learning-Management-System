"use client"
import { AlertTriangle, File, Lock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { VscPlay } from "react-icons/vsc";
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { completeChapter, setChapters } from '@/redux/slice/progressSlice';
import { useSelector } from 'react-redux';

export const ChapterWatchComponent = ({id, title, description, isFree, videoUrl, price, attachments, chapters}) => {
  const [playVideo, setPlayVideo] = useState(false)

  const dispatch = useDispatch()

  const handleChapterCompletion  = ()=>{
    dispatch(setChapters(chapters))
    dispatch(completeChapter(id))
  }


  const togglePlay = ()=>{
    setPlayVideo((curr)=> !curr)
  }

  return (
    <div className=''> 
      {!isFree && (
        <div className='bg-yellow-300 w-full p-3 flex items-center gap-x-2 sticky top-[70px] z-20'>
          <AlertTriangle className='h-5 w-5'/>
          <p className='text-gray-700 font-semibold'>This chapter is not free for preview. You need to purchase this course to watch this chapter</p>
        </div>
      )}
      <div className='flex items-center justify-end bg-blue-300 p-2'>
        <button onClick={handleChapterCompletion } className='bg-green-500 px-6 py-2 rounded-md border-none text-gray-700  font-semibold'>Mark as Complete</button>
      </div>
      <div className='block aspect-video relative rounded-md p-8 h-[100vh] w-full'>
        {!isFree && (
          <div className='bg-slate-800 w-full h-[80%] aspect-video text-white flex flex-col gap-2 justify-center items-center'>
            <Lock className='h-7 w-7 text-white'/>
            <p className='text-sm text-white'>This chapter is locked!</p>
          </div>
        )}

        {isFree && 
        ( 
        <>
          <div className='block bg-slate-800 aspect-video relative rounded-md p-0 h-[100vh] w-full'>
            {!playVideo && <div className='relative h-full w-full' onClick={togglePlay}>
              <VscPlay className='absolute bottom-0 top-0 my-auto right-0 left-0 mx-auto h-16 w-16 text-white cursor-pointer'/>
            </div>}
          {playVideo && <video src={videoUrl} controls autoplay poster='https://ehwmisgwycz.exactdn.com/wp-content/uploads/2017/03/3-Ways-Online-Productivity-Tools-Amplify-Power-Collaboration-Online-Training-Blog-EN.jpg?strip=all&lossy=1&w=1140&ssl=1' 
            className='w-full h-full rounded-md bg-black'></video>}
          </div>
          </>
          )
          }

            <div className='space-y-3 mt-8'>
              <div className='w-full bg-slate-200 p-3 rounded-sm space-y-3'>
                <div className='flex items-center gap-x-2 '>
                  <p className='text-3xl text-slate-600'>Title:</p>
                  <div className='flex   w-full items-center justify-between'>
                    <p className='text-2xl -mb-1.5 font-semibold'>{title}</p>
                    <Button>Enroll for ${price}</Button>
                  </div>
                </div>
                <div className='flex flex-col gap-y-3 '>
                  <p className='text-2xl text-slate-700'>Description: </p>
                  <p className='text-black text-base'>{description}</p>
                  <p className='text-2xl text-slate-700'>Attachments</p>
                  {attachments ? attachments.map((attachment)=>{
                    return (
                      <div key={attachment.id} className='bg-blue-200 p-3 w-[50%] rounded-md flex items-center gap-2'>
                        <File className='h-5 w-5'/>
                        <p className='mt-1 text-black '>{attachment.name}</p>
                      </div>
                    )
                  }):(
                      <p className='italic text-slate-600'>No attachments associated with this course</p>
                  )}
                </div>
              </div>
             
            </div>
        
      </div>
    </div>
    
  )
}


