"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const SideBarRouteItem = ({Icon, href, label}) => {
    const pathname = usePathname()

    // const isActive = (pathname === "/" && href === "/") ||
    const isActive = pathname === href

  return (
    <Link href={href} className=''>
    <div className={cn('flex p-4 gap-x-2 text-sm items-center cursor-pointer hover:bg-slate-100', 
    isActive && "bg-sky-400/20 text-sky-600 hover:bg-sky-400/20 border-r-2 border-sky-900 ")}>
        <Icon className="text-blue-400"/>
        <p>{label}</p>
    </div>
    </Link>
  )
}


