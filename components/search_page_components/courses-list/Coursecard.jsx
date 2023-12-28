import { Book, BookOpenText } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Coursecard = ({id, title, imageUrl, chaptersLength, price, progress, category, isFree}) => {
  return (
    <Link href={`/courses/${id}`}>
        <div className='border-2 rounded-lg '>
            <div className='p-2 flex flex-col gap-2'>
                <img src={imageUrl} alt='' className='rounded-lg aspect-video'  />
                <p className='text-xl font-medium hover:text-sky-600 transition'>{title}</p>
                <p className='text-sm text-gray-500'>{category}</p>
                <div className='flex gap-1 items-center '>
                    <BookOpenText className='h-5 w-5 text-blue-400'/>
                    <p className='text-sm'>{chaptersLength} Chapters</p>
                </div>
                <p className='mt-3 text-lg'>${price}.00</p>
            </div>
        </div>
    </Link>
  )
}

export default Coursecard;

