import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req, params){
    console.log("course params", {params})
    try{
        const { userId } = auth()
        if(!userId){
            return new NextResponse("Unauthorized!", {status: 401})
        }

        const { title } = await req.json()

        const newCourse = await db.course.create({
            data:{
                userId,
                title,
            }
        })
        return NextResponse.json(newCourse)

    }catch(err){
        console.log("An Error occured when creating the course! ", err)
        return new NextResponse("Something went wrong!", {status: 500})
    }
}

