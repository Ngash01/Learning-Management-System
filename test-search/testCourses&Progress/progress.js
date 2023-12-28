import { db } from "@/lib/db";
// get all chapters where courseId : courseId  && isPublished: true

 export const getProgress = async(userId, courseId)=>{
    try{
        const publishedChapterIds = await db.chapter.findMany({
            where:{
                courseId: courseId,
                isPublished:true
            },
            select:{
                id:true
            }
        })

        console.log("published Chapter Id's", publishedChapterIds);

        const PublishedchapterIdsLists = publishedChapterIds.map((chapter)=> chapter.id)
        console.log("Chapter Id's Lists", PublishedchapterIdsLists)


        // now count the number of id's in userProgress that are published or are in ChpaterIdsLists and also completed
        const publishedCompletedChapters = await db.userProgress.count({
            where:{
                // userId,
                chapterId:{
                    in: PublishedchapterIdsLists
                },
                isCompleted: true
            }
        })

        console.log("Published Completed Chapters", publishedCompletedChapters)

        const progressPercentage = ( publishedCompletedChapters / PublishedchapterIdsLists.length ) * 100
        console.log("progressPercentage", progressPercentage)

        // Summary, let's say we have 5 published chapters, 3 are completed, 3/5 * 100

    }catch(err){
        console.log("[GET-PROGRESS]", err)
    }
}


