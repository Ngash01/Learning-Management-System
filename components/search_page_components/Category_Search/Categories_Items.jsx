"use client"
import React from 'react'
import CategoryItem from './Category_Item'
import { FcEngineering,  FcMultipleDevices, FcMusic, FcGlobe, FcGenealogy, FcSalesPerformance, FcSportsMode } from "react-icons/fc"
import { PiCurrencyDollarFill } from "react-icons/pi";

export const CategoriesItmes = ({categories}) => {
  // console.log("categories", categories)

  const iconMap = {
    "Accounting and Finance": PiCurrencyDollarFill,
    "Computer Science" : FcEngineering,
    "fitness and Health" : FcSportsMode,
    "History and Government" : FcGlobe,
    "Music and Arts" : FcMusic,
    "Web3 and Blockchain" : FcGenealogy
  }


  return (
    <div className='flex gap-3 overflow-x-auto pb-7 items-center scrollbar scrollbar1'>
        {categories.map((category)=>{
            return (
                <CategoryItem key={category.id} name={category.name} id={category.id} icon={iconMap[category.name]}/>
            )
        })}
    </div>
  )
}

