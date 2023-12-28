import DataTable from '@/components/tables/DataTable';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const TeacherPage = async() => {

  const { userId } = auth()

  const courses = await db.course.findMany({
    where:{
      userId
    }
  })


  const categories = await db.category.findMany()


  return (
    <div className='p-4 '>
      <div className=''>
        <Link href={'/teacher/create'} className='w-fit'>
          <Button className="flex items-center gap-x-1">
            <PlusCircle className='w-[18px]'/>
              Create Course
          </Button>
          </Link>
      </div>
      <DataTable courses={courses} categories={categories}/>

    </div>
  )
}

export default TeacherPage;

