// get All courses where  title is in the url parameter categoryId, isPublished === true 
// include chapters where isPublished === true
// include category
// declare a variable that will check if payments === null ...if so let progress === null else let progess === getProgress function

import { db } from "@/lib/db"
import getProgress from "./getProgress"


// summary
// find all courses where isPublished === true && categoryId === true && title contains the string provided in the title parameter
// include chapters where isPublished === true select their Id's
// include Category
// include purchases where userId
// orderBy createdAt
// Add a progress to the courses - check if they are puchases, if not assign progress to null, 
// else assign progress to the progress Percentage component


export const getCourses = async(title, categoryId)=>{
    console.log("title argument here", title)
    console.log("categoryId argument here", title)

    try{
        const courses = await db.course.findMany({
            where:{
                isPublished: true,
                title:{
                    contains: title
                },
                categoryId
            },
            include:{
                chapters:{
                    where:{
                        isPublished: true
                    },
                    select:{
                        id: true
                    }
                },
                category:true,
            },
            orderBy:{
                createdAt: "desc"
            }
        })
        console.log("courses: ",courses)


        // const coursesWithProgress = await Promise.all(
        //     courses.map(async(course)=>{
        //         if(course.purchases.length === 0){
        //             return{
        //                 ...course,
        //                 progress: null 
        //             }
        //         }

        //         const progressPercentage = await getProgress(course.id)

        //         return {
        //             ...course,
        //             progress: progressPercentage
        //         }

        //     })
        // )
        // console.log("This is the course with progress", coursesWithProgress);
        return courses;

    }catch(err){
        console.log("[GET-COURSES]", err)
    }
}






