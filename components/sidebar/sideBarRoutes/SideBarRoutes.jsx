"use client"
import { BadgePlus, BarChart, BarChart4, Compass, Layout, List } from 'lucide-react'
import React from 'react'
import { SideBarRouteItem } from './sideBarRouteItem/SideBarRouteItem'
import { usePathname } from 'next/navigation'

export const SideBarRoutes = () => {
    const pathname = usePathname()

    const guestRoutes = [
        {
            icon: Compass,
            label: "Browse",
            href: "/search"
        },
        {
            icon: BadgePlus,
            label: "Create course",
            href: "/teacher/create"
        }
    ]

    const TeacherRoute = [
        {
            icon: List,
            label: "Courses",
            href:"/teacher/courses"
        },
        {
            icon: BarChart4,
            label: "Analytics",
            href: "/teacher/courses/analytics"
        }
    ]

    const routes = pathname.startsWith("/teacher") ? TeacherRoute : guestRoutes

  return (
    <div className='w-full flex flex-col mt-3'>
        {routes.map((route)=>{
            return <SideBarRouteItem key={route.href} Icon={route.icon} label={route.label} href={route.href}/>
        })}
    </div> 
  )
}


