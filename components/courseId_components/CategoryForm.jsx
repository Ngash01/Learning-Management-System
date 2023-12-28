"use client"
import { db } from "@/lib/db";
import { SelectCategory } from "./Select";
import { useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

export const CategoryForm = ({course, allCategories}) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = ()=>{
        setIsEditing((curr)=>!curr)
        window.scrollTo(0, document.body.scrollHeight); // Scroll to bottom

    }

    // console.log("course in Category: ",course)

    // console.log("All categories", allCategories)

    const uniqueCategory = allCategories.find((category) => category.id === course.categoryId)
    // console.log("unique category", uniqueCategory)
  
  return (
    <div className='bg-slate-400/20 p-3 rounded-md space-y-3'>
        <div className="flex justify-between font-normal items-center">
            Category
            <Button variant="ghost" onClick={toggleEditing}>
            {!isEditing ? (
                <div className="flex items-center gap-1" >
                    <PencilIcon className="h-4 w-4"/>
                    Edit Category
                </div>
            ): (
                <div>
                    Cancel
                </div>
            )}
            </Button>
           
        </div>
        <div className="">
            {uniqueCategory ? (
                <p className="italic">{uniqueCategory.name}</p>
            ):(
                <p className="italic">No categories selected</p>
            )}
        </div>
        {isEditing && <SelectCategory categories={allCategories} course={course} uniqueCategory={uniqueCategory}/>}
    </div>
  )
}


