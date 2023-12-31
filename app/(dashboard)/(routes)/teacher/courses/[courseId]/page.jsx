import { Attachments } from "@/components/courseId_components/Attachments";
import { CategoryForm } from "@/components/courseId_components/CategoryForm";
import ChaptersForm from "@/components/courseId_components/ChaptersForm";
import CourseActions from "@/components/courseId_components/CourseActions";
import DescriptionForm from "@/components/courseId_components/DescriptionForm";
import ImageForm from "@/components/courseId_components/ImageForm";
import PriceForm from "@/components/courseId_components/PriceForm";
import TitleForm from "@/components/courseId_components/TitleForm";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ConfettiStore } from "@/lib/use-confetti-store";
import { auth } from "@clerk/nextjs";
import { AlertTriangle, DollarSign, File, LayoutGrid, List, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const CourseIdPage = async({params}) => {
    console.log("params here", params)

    const { userId } = auth()

    if(!userId){
        return new NextResponse("Unauthorized!", {status: 500})
    }

    const course = await db.course.findUnique({
        where:{
            userId,
            id: params.courseId
        },
        include:{
            chapters:{
                where:{
                    courseId:params.courseId
                },
                orderBy:{
                    position: "desc"
                }
            },
            attachments:{
                where:{
                    courseId:params.courseId
                }
        }
    }
    }) 


    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.price,
        course.chapters.some((chapter)=>chapter.isPublished)
    ]

    console.log("requiredFields", requiredFields)

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    // console.log("Boolean ", completedFields)
    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean)
    console.log("complete all course fields: ", isComplete)

    if(!course){
        return redirect("/")
    }

    let allCategories;

    Promise.all(
        allCategories = await db.category.findMany()
    )


  return (
    <>
    {!course.isPublished && (
        <div className='flex items-center gap-x-2 bg-yellow-300 p-2'>
            <AlertTriangle className='h-4 w-4'/>
            <p className='text-sm'>This course is unpublished. It will not be available in the course.</p>
        </div>
    )}
    <div className="p-6">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-2 ">
                <h2 className="text-2xl">Course Setup</h2>
                <div className="flex gap-2">
                    Complete all fields 
                    {completionText}
                </div>
            </div>
            <div className="flex gap-3 flex-col">
            <CourseActions course={course} chapter={course.chapters} isComplete={isComplete} />
            <Link href={'/search'}>
                <div className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 hover:transition-all cursor-pointer  
                p-2 rounded-md w-fit text-md'>
                    Navigate to your published course
                    <MoveRight className='w-4  h-4'/>
                </div>
            </Link>
            
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-4">
            <div className="space-y-6" >
                <div className="flex items-center gap-2">
                    <LayoutGrid className="gridIcon cursor-pointer "/>
                    <p className="text-xl">Customize your course</p>
                </div>
                <TitleForm title={course.title} course={course} />
                <DescriptionForm course={course} description={course.description}/>
                <ImageForm course={course} imageUrl={course.imageUrl}/>
                <CategoryForm course={course} allCategories={allCategories}/>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <List className="gridIcon"/>
                    <p className="text-xl ">Course chapters</p>
                </div>
                <div>
                    <ChaptersForm course={course} chapters={course.chapters}/>
                </div>
                <div className="">
                    <div className="flex items-center gap-x-2">
                        <DollarSign className="gridIcon"/>
                        <p className="text-xl">Sell Your Course!</p>
                    </div>
                </div>
                <PriceForm course={course}/>
                <div className="flex items-center gap-2">
                    <File className="gridIcon"/>
                    <p className="text-xl">Resources & Attachments</p>
                </div>
                <Attachments course={course}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default CourseIdPage;



