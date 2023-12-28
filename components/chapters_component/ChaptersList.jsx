import { cn } from '@/lib/utils'
import axios from 'axios'
import { Grip, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import toast from 'react-hot-toast'


export const ChaptersList = ({course, chapters}) => {
    console.log("chapters Id", chapters)
    const [reorderedChapter, setReorderdChapter] = useState(chapters)


  const handleOndragEnd = async(result)=>{
    console.log("result: ",result)
    const items = Array.from(reorderedChapter)
    const [reorderdItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index, 0, reorderdItem);

    setReorderdChapter(items)
    // try{
    //     await axios.patch(`/api/courses/${course.id}/chapters/${result.draggableId}`, {position: reorderedChapter})
    //     toast.success("Success!")

    // }catch(err){
    //     console.log("an error occured!", err)
    //     toast.error("Something went wrong!")
    // }
  }

  const items = Array.from(chapters)
  console.log("items: ", items)

  return (
        <DragDropContext onDragEnd={handleOndragEnd}>
            <Droppable droppableId='chapters'>
                {(provided)=>(
                <div className='space-y-3' {...provided.droppableProps} ref={provided.innerRef}>
                {reorderedChapter.map((chapter, index)=>{
                return(
                    <Draggable  key={chapter.id} draggableId={chapter.id} index={index}>
                        {(provided)=>(
                          <div className={cn('bg-slate-600/20 rounded-md p-2 flex items-center justify-between', chapter.isPublished && "bg-blue-600/20"
                          )}{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <div className='flex gap-3 cursor-grab'>
                                <Grip className='h-4 w-4'/>
                                <p className='text-sm text-gray-800'>{chapter.title}</p>
                            </div>
                            <Link href={`/teacher/courses/${course.id}/${chapter.id}`}>
                            <div className='flex items-center gap-x-2'>
                              {chapter.isPublished && chapter.isFree && (
                                <p className='text-xs px-2 py-0.5 rounded-xl bg-green-700 text-gray-300'>free</p>
                              )}
                              <div className='flex gap-1 items-center'>
                                {!chapter.isPublished ? (
                                  <p className='text-xs px-2 py-0.5 rounded-xl bg-slate-700 text-gray-300'>Draft</p>
                                ):(
                                  <p className='text-xs px-2 py-0.5 rounded-xl bg-sky-700 text-gray-300'>Published</p>
                                )}
                                      <PencilIcon className='h-4 w-4'/>
                              </div>
                            </div>

                            </Link>
                      </div>  
                    )}
                    </Draggable>
                )
            })}
            {provided.placeholder}
        </div>
        )}
        </Droppable>
    </DragDropContext>
  )
}


