import { MobileCourseSideBar } from "@/components/coursePage/CourseSideBarMoblie";
import { CourseSideBar } from "@/components/coursePage/courseSideBar";
import { Navbar } from "@/components/navbar/NavBar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const CourseLayout = async({children, params}) => {
    console.log("course params", params)


  const course = await db.course.findUnique({
    where:{
      id: params.courseId,
    },
    include:{
      chapters:{
        where:{
          isPublished: true
        }
      }
    }
  })

  console.log("course in coursePage", course)

  return (
    <div className='h-full '>
        <div className='h-[70px] fixed md:pl-80 w-full z-50 inset-y-0'>
            <Navbar/>
        </div>
        <div className="hidden md:block fixed  w-80 border-r h-full">
            <CourseSideBar 
            id={course.id} 
            chapters={course.chapters} 
            price={course.price} 
            title={course.title} 
            imageUrl={course.imageurl}
            description={course.description}
            isFree={course.isFree}
            />
        </div>
        <div className="md:hidden h-full">
            <MobileCourseSideBar course={course}/>
        </div>
        <main className="md:ml-80 pt-[70px] ">
            {children}  
        </main>
    </div>
  )
}

export default CourseLayout;

