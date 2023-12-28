"use client"
import { FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcGlobe, FcGenealogy, FcSalesPerformance, FcSportsMode } from "react-icons/fc"
import { PiCurrencyDollarFill } from "react-icons/pi";

import React from 'react'
import { CategoryItem } from './CategoryItem'



 const SearchCategories = ({categories}) => {

    const iconMap = {
        "Accounting and Finance": PiCurrencyDollarFill ,
        "Computer Science" : FcEngineering,
        "fitness and Health" : FcSportsMode,
        "History and Government" : FcGlobe,
        "Music and Arts" : FcMusic,
        "Web3 and Blockchain" : FcGenealogy
    }

  return (
    <div className='flex items-center gap-3 overflow-x-auto pb-5 scrollbar scrollbar1'>
        {categories.map((category)=>{
            return(
                <CategoryItem key={category.id} label={category.name} value={category.id} icon={iconMap[category.name]}/>
            )
        })}
    </div>
  )
}


