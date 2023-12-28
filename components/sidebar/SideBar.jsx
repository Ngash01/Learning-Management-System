import React from 'react'
import { Logo } from './Logo'
import { SideBarRoutes } from './sideBarRoutes/SideBarRoutes'


export const SideBar = () => {
  return (
    <div className='border-r h-full flex flex-col overflow-y-auto'>
        <div className='p-3'>
            <Logo/>
        </div>
        <div className='flex flex-col w-full'>
            <SideBarRoutes/>
        </div>
    </div>
  )
}




