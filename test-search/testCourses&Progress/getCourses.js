import { getProgress } from "@/components/actions/getProgress"
import { db } from "@/lib/db"

 const getCourses = async({userId, title, categoryId})=>{
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
                    where: {
                        isPublished: true
                    },
                    select:{
                        id: true
                    }
                },
                category: true,
                purchases:{
                    where:{
                        userId
                    }
                }
            },
            orderBy:{
                createdAt: "desc"
            }
    });

        // console.log("Here are the courses", courses)

        // summary
        // find all courses where isPublished === true && categoryId === true && title contains the string provided in the title parameter
        // include chapters where isPublished === true select their Id's
        // include Category
        // include purchases where userId
        // orderBy createdAt


       const coursesWithProgess = await Promise.all(
            courses.map(async(course)=>{
                if(course.purchases.length === 0){
                    return{
                        ...course,
                        progress: null
                    }
                }
                const progressPercentage = await getProgress(userId, course.id)

                return {
                    ...course,
                    progress: progressPercentage
                }
            })
       )

       console.log("Courses with progress", coursesWithProgess);

       return coursesWithProgess;

    }catch(err){
        console.log("[GET COURSES]", err)
    }
}





