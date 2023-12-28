"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { PencilIcon } from 'lucide-react';
import * as z from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,
FormField,
FormItem,
FormControl,
FormDescription,
FormLabel,
FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FormatPrice } from '@/lib/formatPrice';

const formSchema = z.object({
    price1: z.coerce.number().min(1, {
        message: "price is a required field!"
    })
})

const PriceForm = ({course}) => {
    const [isEditing, setIsEditing] = useState(false) 

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            price1: course.price
        }
    })

    const { isSubmitting, isValid } = form.formState

    const toggleEdit = ()=>{
        setIsEditing((current)=>!current)
    }

    const submitForm = async(values)=>{
        try{
            const res = await axios.patch(`/api/courses/${course.id}`, values)
            toast.success("Price updated successfully!"),
            toggleEdit()
            window.location.reload()
        }catch(err){
            console.log("An error occured while updating price", err)
            toast.error("Something went wrong!")
        }
    }

  return (
    <div className='bg-slate-400/20 p-4 rounded-md'>
        <div className='flex justify-between items-center'>
            Course Price
            <Button variant="ghost" onClick={toggleEdit}>
                {!isEditing ? (
                    <div className='flex items-center gap-2'>
                        <PencilIcon className='h-4 w-4'/>
                        Edit course
                    </div>
                ):
                    <p>
                        Cancel
                    </p>
                }
            </Button>
        </div>
        {!isEditing ?
            <div>
                {course.price ? <p className='text-base text-gray-600 '>{FormatPrice(course.price)}</p> : <p className='italic text-sm'>No Price!</p>} 
            </div>
            
        :(
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className='space-y-3'>
                <FormField control={form.control} name="price1" render={({field})=>{
                    return(
                        <FormItem>
                            <FormLabel>
                                price
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="$200.00" {...field} disabled={isSubmitting} type="number"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }}/>
                <Button type="submit" disabled={isSubmitting} className="ml-auto">Save</Button>
            </form>
          </Form>  
        )}
    </div>
  )
}

export default PriceForm;

