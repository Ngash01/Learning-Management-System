import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, {params}){
    try{
        const { userId } = auth()        
        if(!userId){
            return new NextResponse("unauthorized!", {status: 401})
        }

        const isCourseOwner = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId
            }
        })

        if(!isCourseOwner){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const publishCourse = await db.chapter.update({
            where:{
                id: params.chapterId,
                courseId: params.courseId
            },
            data:{
                isPublished: false
            }
        });

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

        return NextResponse.json(publishCourse);

    }catch(err){
        console.log("An error occured!", err)
        return new NextResponse("Internal server error", {status: 500})
    }
}
