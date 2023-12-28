import { ChapterWatchComponent } from "@/components/coursePage/ChapterWatchComponent";
import { db } from "@/lib/db";

const ChapterId = async({params}) => {

  const course = await db.course.findUnique({
    where:{
      id: params.courseId,
    },
    include:{
      chapters:{
        where:{
          isPublished:true
        }
      },
      attachments: true
    }
  })

  console.log("course", course)
  
  const chapter = course.chapters.find((chapter)=> chapter.id === params.chapterId)
  console.log("chapter", chapter)

  return (
    <div className='h-[100vh]'>
      <ChapterWatchComponent 
      chapters={course.chapters}
      id={chapter.id} 
      title={chapter.title} 
      description={chapter.description} 
      isFree={chapter.isFree} 
      videoUrl={chapter.videoUrl}
      attachments={course.attachments}
      price={course.price}/>
    </div>
  )
}

export default ChapterId;



