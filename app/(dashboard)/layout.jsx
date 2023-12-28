import { Navbar } from '@/components/navbar/NavBar';
import { SideBar } from '@/components/sidebar/SideBar';
import React from 'react'


const DashBoardLayout = ({children}) => {

  return (
    <div className='h-full'>
        <div className='h-[70px] fixed md:pl-60 w-full z-50 inset-y-0'>
            <Navbar/>
        </div>
        <div className='hidden md:flex h-full w-60 z-50 fixed flex-col'>
            <SideBar/>
        </div>

        <main className="md:ml-60 pt-[70px]">
            {children}
        </main>
    </div>
  )
}

export default DashBoardLayout;

