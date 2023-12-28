import ChapterAccessForm from '@/components/chapters_component/Chapter-accessForm';
import ChapterActions from '@/components/chapters_component/ChapterActions';
import { ChapterVideo } from '@/components/chapters_component/ChapterVideo';
import ChaptersDescriptionForm from '@/components/chapters_component/DescriptionForm-chapters';
import ChaptersTitleForm from '@/components/chapters_component/TitleForm-chapters';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { AlertTriangle, Eye, LayoutGrid, MoveLeft, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react'

const ChapterPage = async({params}) => {

    const { userId } = auth()

    if(!userId){
        return new NextResponse("Unauthorized", {status: 401})
    }

    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
            userId,
        },
        include:{
            chapters:{
                where: {
                    id: params.chapterId
                }
            }
        }
    });

    const chapter = await db.chapter.findUnique({
        where:{
            id: params.chapterId,
            courseId: params.courseId
        }
    })

    if(!chapter){
        redirect(`/teacher/courses/${course.id}`)
    }


    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ]
    
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length
    console.log("completed Fields", completedFields)

    const displayFields = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean)
    console.log("All fields are compled?", isComplete)


  return (
    <>
    {!chapter.isPublished && (
        <div className='flex items-center gap-x-2 bg-yellow-300 p-2'>
            <AlertTriangle className='h-4 w-4'/>
            <p className='text-sm'>This chapter is unpublished. It will not be available in the course.</p>
        </div>
    )}
    <div className='p-8 '>
        <div className='space-y-4'>
            <Link href={`/teacher/courses/${params.courseId}`}>
                <div className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 hover:transition-all  p-2 rounded-md w-fit'>
                    <MoveLeft className='w-4  h-4'/>
                    Back to course Setup
                </div>
            </Link>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1 mx-4'>
                    <p className='text-2xl font-medium'>Chapter Creation</p>
                    <div className='flex items-center gap-1'>
                        <p className='text-sm'>Complete all Fields </p>
                        <p className='font-semibold'>{displayFields}</p>
                    </div>
                </div>
                <div>
                   <ChapterActions course={course} chapter={chapter} isComplete={isComplete}/>
                </div>
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
                <div className='space-y-3'>
                    <div className='pt-10 space-y-4 '>
                        <div className='flex items-center gap-2 mb-5'>
                            <LayoutGrid className='h-9 w-9 p-1 rounded-2xl bg-sky-500/30 text-blue-500'/>
                            <p className='text-xl'>Customize your Chapter</p>
                        </div>
                        <ChaptersTitleForm chapter={chapter} course={course}/>
                        <ChaptersDescriptionForm chapter={chapter} course={course}/>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <Eye className='h-9 w-9 p-1 rounded-2xl bg-sky-500/30 text-blue-500'/>
                        <h2 className='text-xl'>Access Settings!</h2>
                    </div>
                    <ChapterAccessForm chapter={chapter} course={course} />
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center gap-x-2 pt-10'>
                        <Video className='h-9 w-9 p-1 rounded-2xl bg-sky-500/30 text-blue-500' />
                        <h2 className='text-xl'>Add a video</h2>
                    </div>
                    <ChapterVideo chapter={chapter} course={course}/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}


export default ChapterPage;



