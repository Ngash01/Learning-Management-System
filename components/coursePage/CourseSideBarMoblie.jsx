"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { CourseSideBar } from "./courseSideBar"


export const MobileCourseSideBar = ({course})=>{
    return(
        <Sheet >
        <SheetTrigger className="h-5 w-5 p-5">
          <Menu/>
        </SheetTrigger>
        <SheetContent side="left">
        <CourseSideBar id={course.id} 
            chapters={course.chapters} 
            price={course.price} 
            title={course.title} 
            imageUrl={course.imageurl}
            description={course.description}
            isFree={course.isFree}
            />
        </SheetContent>
      </Sheet>
      
    )
}

