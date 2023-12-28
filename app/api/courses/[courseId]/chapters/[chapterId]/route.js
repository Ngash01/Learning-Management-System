import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, {params}){
    console.log("chapter params", {params})

    try{
        const { userId } = auth()
        if(!userId){
            return new NextResponse("Unauthorized!", {status: 401})
            
        }

        const isCourseOwner = db.course.findUnique({
            where:{
                id: params.courseId,
                userId
            }
        })

        if(!isCourseOwner){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const { title, courseDescription, isFreee, url } = await req.json()


        const updateChapter = await db.chapter.update({
            where:{
                id: params.chapterId,
                courseId: params.courseId
            },
            data:{
                title,
                description: courseDescription,
                isFree: isFreee,
                videoUrl: url
            }
        })

        return NextResponse.json(updateChapter)

    }catch(err){
        console.log("SERVER ERROR", err)
        return new NextResponse("Internal Server error", {status: 500})
    }
}

export async function DELETE(req, {params}){
    try{
        const { userId } = auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const isCourseOwner = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId
            }
        });        

        if(!isCourseOwner){
            return new NextResponse("An error occured!")
        }
        
        const DeletedChapter = await db.chapter.delete({
            where:{
                id: params.chapterId,
                courseId: params.courseId
            }
        })

        const publishedChaptersInCourse = await db.chapter.findMany({
            where:{
                courseId: params.courseId,
                isPublished:true
            }
        })

        if(!publishedChaptersInCourse.length){
            await db.course.update({
                where:{
                    id: params.courseId
                },
                data:{
                    isPublished: false
                }
            })
        }

        return NextResponse.json(DeletedChapter)
 
    }catch(err){
        console.log("A server side error occured!", err)
        return new NextResponse("An error occured!", {status: 500})
    }
}


