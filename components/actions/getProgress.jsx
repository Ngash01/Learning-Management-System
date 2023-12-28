// fetch all chapters where isPublished === true && courseId === courseId
// fetch the userProgress model && count the number of chapters that are in userProgress model and are published

import { db } from "@/lib/db";

  const getProgress = async(courseId)=>{
    try{
        const PublishedChapters = await db.chapter.findMany({
            where:{
                courseId : courseId,
                isPublished: true
            },
            select:{
                id: true
            }
        })
        console.log("isPublishedChapters", PublishedChapters);
    
        const PublishedChaptersLists = PublishedChapters.map((chapter)=>chapter.id)
        console.log("publishedChapterLists", PublishedChaptersLists)
    
        const completedPublishedChapters = await db.userProgress.count({
            where:{
                chapterId: {
                    in: PublishedChaptersLists
                },
                isCompleted: true
            }
        })
    
        console.log("completed Published Chapters", completedPublishedChapters);
    
        const percentageProgress = ( completedPublishedChapters / PublishedChaptersLists.length ) * 100;
        console.log("percentage Progress", percentageProgress)
        return percentageProgress;
    
    }catch(err){
        console.log("[GET-PROGRESS ERRROR]", err)
    }

    }

export default getProgress;