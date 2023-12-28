"use client"
import React from 'react'
import Coursecard from './Coursecard'

const CoursesList = ({courses}) => {
  return (
    <div>
        <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 mt-5'>
            {courses.map((course)=>{
                return(
                    <Coursecard 
                    key={course.id} 
                    id={course.id}
                    title={course.title}
                    imageUrl={course.imageUrl}
                    chaptersLength={course.chapters.length}
                    price={course.price}
                    progress={course.progess}
                    category={course?.category?.name}
                    isFree={course?.isFree}
                    />
                )
            })}
        </div>
        <div>
            {courses.length === 0 && (
                <p className='text-sm text-center mt-10 text-muted-foreground'>No courses found</p>
            )}
        </div>
       
    </div>
  )
}

export default CoursesList;
