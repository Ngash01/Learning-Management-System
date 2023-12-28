"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


const CreateCoursePage = () => {
  const router = useRouter()

  const formSchema = z.object({
    title: z.string().min(3, {
      message: "Title is a required field!"
    })
  })

  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting, isValid } = form.formState


  const submitForm = async(values)=>{
    try{
      const res = await axios.post("/api/courses", values)
      router.push(`/teacher/courses/${res.data.id}`)
      toast.success("Course created!")
      console.log("res",res)

    }catch(err){
      console.log("err", err)
      toast.error(err)
    }
  }
 
  return (
    <div className='max-w-3xl mx-auto p-7 h-full'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-xl'>Name Your Course</h2>
        <p className='text-sm text-slate-600'>What would you like to name your course! Dont worry you can change this later!</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-2">
            <FormField control={form.control} name="title" render={({field})=>{
              return(
                <FormItem className="space-y-4">
                  <FormLabel>
                    Course Title
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g Advanced Web Development" {...field}/>
                  </FormControl>
                  <FormDescription>
                    What would you like to name your course!
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )
            }}/>
            <div className="flex gap-3 items-center mt-4">
              <Link href={"/"}>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Continue
                </Button>
            </div>
            <div className="flex items-center gap-x-2">
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCoursePage;



