import React from 'react'
import { MobileSideBar } from '../mobilesSideBar/MobileSideBar'
import { NavBarRoutes } from './navbarRoutes/NavBarRoutes'

export const Navbar = () => {
  return (
    <div className='h-full p-4 border-b flex items-center shadow-sm bg-white'>
        <MobileSideBar/>
        <NavBarRoutes/>
    </div>
  )
}


