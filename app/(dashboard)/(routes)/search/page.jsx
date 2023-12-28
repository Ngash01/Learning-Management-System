import { getCourses } from '@/components/actions/get-courses';
import { CategoriesItmes } from '@/components/search_page_components/Category_Search/Categories_Items';
import CoursesList from '@/components/search_page_components/courses-list/CoursesList';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const SearchPage = async({searchParams}) => {
 
  const categories = await db.category.findMany({
    orderBy:{
      name: "asc"
    }
  })

  
  // const { userId } = auth()
  // if(!userId){
  //   return redirect('/')
  // }

  const categoryId = searchParams.categoryId;
  console.log("categoryId to be searched: ", categoryId)

  const title = searchParams.title;
  console.log("title to be searched: ", title)

  const courses = await getCourses(title, categoryId)
  
  return (
    <div className='p-6'>
      <CategoriesItmes categories={categories} />
      <CoursesList courses={courses}/>
    </div>
  )
}

export default SearchPage;

