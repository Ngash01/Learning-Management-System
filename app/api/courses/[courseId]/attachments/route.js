import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, {params}){
    try{
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized!", {status: 401})
        }

        const isCourseOwner = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId
            }
        })

        if(!isCourseOwner){
            return new NextResponse("unauthorized!", {status: 401})
        }

        const {url, name} = await req.json()

        const createAttachment = await db.attachment.create({
            data:{
                url,
                name,
                courseId:params.courseId
            }
        })

        return NextResponse.json(createAttachment)

    }catch(err){
        console.log("A server erorr occured!", err)
        return new NextResponse("Server side error!", {status: 500})
    }
}


export async function DELETE(req, {params}){
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized!",{status: 401})
        }

        const isOwner = db.course.findUnique({
            where:{
                id: params.courseId,
                userId
            }
        })

        if(!isOwner){
            return new NextResponse("Unauthorized!", {status: 401})
        }

        const { id } = await req.json()

        const deleteAttachment = await db.attachment.delete({
            where:{
                id,
                courseId: params.courseId
            }
        })

        return NextResponse.json(deleteAttachment)

    }catch(err){
        console.log("Server side error - DELETE", err)
        return new NextResponse("Server side Error", {status: 500})
    }
}

