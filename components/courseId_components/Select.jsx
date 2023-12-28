"use client"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const  SelectCategory = ({categories, course, uniqueCategory})=>{
  const [InputCategory, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  console.log("unique category", uniqueCategory)

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(()=>{
    if(InputCategory){
      submitCategory()
    }
  },[InputCategory])


  if(InputCategory){
    console.log("Category here:", InputCategory)
  }

  const submitCategory = async()=>{
    if(InputCategory){
        try{
            setIsLoading(true)
            const data = await axios.patch(`/api/courses/${course.id}`, {categoryId: InputCategory})
            toast.success("Course category added successfully!")
            setIsLoading(false)
            window.location.reload()
            window.scrollTo(0, document.body.scrollHeight); // Scroll to bottom
        }catch(err){
            console.log("Axios error occurred! ", err)
            toast.error("An error occured!")
            setIsLoading(false)
        }
    }
  }

  return (
    <div  className="">
      <FormControl sx={{ m: 0, width: "100%" }} className='mt-4'>
        <InputLabel style={{cursor: isLoading ? "not-allowed": "pointer"}}>{uniqueCategory?.name || "Select Category"}</InputLabel>
        <Select disabled={isLoading}
          value={InputCategory}
          onChange={handleChange}
          autoWidth
          label={uniqueCategory?.name || " Select Category"}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category)=>{
            return (
                <MenuItem value={category.id}  key={category.id}  className={`disabled:cursor-not-allowed`}>
                  {category.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  );
}

