import { Menu } from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { SideBar } from '../sidebar/SideBar'
  

export const MobileSideBar = () => {
  return (
    <div className='md:hidden '>
        <Sheet>
            <SheetTrigger  className='cursor-pointer md:hidden'>
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 ">
                <SideBar/>
            </SheetContent>
        </Sheet>
    </div>
  )
}
