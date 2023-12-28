"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title is a required field!"
    }),
})


const ChaptersTitleForm = ({chapter, course}) => {
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title : chapter.title,
        }
    })
   
    const { isSubmitting, isValid } = form.formState;

    const submitForm = async(values)=>{
        try{
            const res = await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, values)
            toast.success("Title updated successfully!")
            setIsEditing(false)
            window.location.reload()
        }catch(err){
            console.log("patch error - client side",err)
            toast.error("An error occurred!")
        }
    }

  return (
    <div className="mt-6 bg-slate-400/20 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Chapter title
            <Button variant="ghost" onClick={()=>setIsEditing((curr)=>!curr)}>
                {isEditing && (
                    <>Cancel</>
                )}
                {!isEditing && (
                <div className="flex gap-1">
                    <Pencil className="h-4 w-4 mr-2"/>
                    <>Edit title</>
                </div>
                )}
            </Button>
        </div>
        {!isEditing ? (
            <p className="ttext-base text-gray-500 mt-2">{chapter.title}</p> 
        ):(
             <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className="space-y-3 mt-3">
                <FormField name="title" control={form.control} render={({field})=>{
                    return (
                        <FormItem>
                            {/* <FormLabel>
                                {title}
                            </FormLabel> */}
                            <FormControl>
                                <Input disabled={isSubmitting}  placeholder="Rename your course!" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }}/>

                <div className="flex items-center">
                    <Button disabled={isSubmitting} className="ml-auto" type="submit">Save</Button>
                </div>
            </form>
        </Form>
        )}
        
    </div>
  )
}

export default ChaptersTitleForm;




