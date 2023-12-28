import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, {params}){
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
        })

        if(!isCourseOwner){
            return new NextResponse("Unauthorized", {status: 401})
        }

        //1 intro 
        //2 chapter1
        //3 chapter2

        // findFirst retrieves the first record that matches a certain criteria in the database
        const currentChapter = await db.chapter.findFirst({
            where:{
                courseId:params.courseId
            },
            orderBy:{
                position: "desc"
            }
        })

        const newPosition = currentChapter ? currentChapter.position + 1 : 0

        const  { title1 }  = await req.json()

        const createChapter = await db.chapter.create({
            data:{
                title: title1,
                courseId: params.courseId,
                position: newPosition
            }
        });
       
        return NextResponse.json(createChapter)

    }catch(err){
        console.log("A server error occured!", err)
        return new NextResponse("Something went wrong!", {status: 500})
    }
}

// ///////////////////////////////////////////////////////////////////////////////


