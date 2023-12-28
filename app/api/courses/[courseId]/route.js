import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"; 

export async function PATCH(req, {params}){

    try{
        const { userId } = auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const { title, description, imageUrl, categoryId, price1 } = await req.json()

        
        const courseTitle = await db.course.update({
            where:{
                userId,
                id:params.courseId
            },
            data:{
                title,
                description,
                imageUrl,
                categoryId,
                price: price1,
            }
        })

        return NextResponse.json(courseTitle)

    }catch(err){
        console.log("[SERVER SIDE ERROR]",err)
        return new NextResponse("Server side error", {status: 500})
    }
}



// ///////////////////////////////////////////////////////////////////////////////////////////////

// DELETE ACTION


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
        
        const DeletedCourse = await db.course.delete({
            where:{
                id: params.courseId,
            }
        })


        return NextResponse.json(DeletedCourse)
 
    }catch(err){
        console.log("A server side error occured!", err)
        return new NextResponse("An error occured!", {status: 500})
    }
}
