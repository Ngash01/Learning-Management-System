"use client"
import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { Button } from '../ui/button';
import { useState } from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from 'next/link';
import { Logo } from '../sidebar/Logo';



const HeaderPage = () => {
    const [showDropDown, setShowDRopDown] = useState(false)

    const toggleDropDown = ()=>{
        setShowDRopDown((curr)=>!curr)
    }

  return (
    <div className='fixed h-[100px] border-b shadow-sm w-full bg-white z-50 '>
        <div className='flex p-4 gap-3 items-center'>
            <div className=''>
                {/* <img src="/assets/LMS-PLATFORM.png" className="w-[130px] h-[130px]" alt="" /> */}
                <Logo/>
            </div>
            <div className=' hidden lg:block ml-[4rem] relative'>
                <ul className='flex text-xl gap-3.5'>
                    <li className='ul-li'>Platform</li>
                    <div className={`group`}>
                        <div className='group flex items-center gap-x-1 ul-li' onMouseEnter={toggleDropDown} >
                            <li className=''>Courses</li>
                            <li className={`group-hover:rotate-180 group-hover:transition-all `}><IoIosArrowDown/></li>
                        </div>
                        <ul className={`absolute top-[50px] 
                         border-2 border-bg-gray-400 bg-white flex flex-col gap-23 p-4 ${!showDropDown ? "hidden" : "block"}`} onMouseLeave={toggleDropDown}>
                            <Link href={'/search'} className='hover:text-orange-500'>
                                <div className='flex gap-x-4 relative items-center p-2'>
                                    <li>Music And Arts</li>
                                    <IoIosArrowRoundForward className='right-0 absolute'/>
                                </div>
                            </Link>
                            <Link href={'/search'} className='hover:text-orange-500'>
                                <div className='flex gap-x-4 relative items-center p-2'>
                                    <li>Fitness and Health</li>
                                    <IoIosArrowRoundForward className='right-0 absolute'/>
                                </div>
                            </Link>
                            <Link href={"/search"} className='hover:text-orange-500'>
                                <div className='flex gap-x-4 relative items-center p-2'>
                                    <li>Computer Science</li>
                                    <IoIosArrowRoundForward className='right-0 absolute'/>
                                </div>
                            </Link>
                            <Link href={"/search"} className='hover:text-orange-500'>
                                <div className='flex gap-x-4 relative items-center p-2'>
                                    <li>Accounting and Finance</li>
                                    <IoIosArrowRoundForward className='-right-3 absolute ml-2'/>
                                </div>
                            </Link>
                            <Link href={"/search"} className='hover:text-orange-500'>
                                <div className='flex gap-x-4 relative items-center p-2'>
                                    <li>Web3 and Blockchain </li>
                                    <IoIosArrowRoundForward className='right-0 absolute'/>
                                </div>
                            </Link>
                        </ul>
                    </div>
                    <div className='flex items-center gap-x-1 ul-li group'>
                        <li>Pricing</li>
                        <li className='group-hover:rotate-180 transition-all'><IoIosArrowDown/></li>
                    </div>
                    <li className='ul-li'>Solutions</li>
                    <li className='ul-li'>Resourses</li>
                    <li className='ul-li'>Company</li>
                </ul>
            </div>
            <div className='flex items-center ml-auto gap-x-3'>
                <Link href={"/sign-in"}>
                    <button className='rounded-2xl px-8 py-3 bg-orange-400 border-none hover:bg-orange-300 transition'>Login</button>
                </Link>
                <hr className='h-[2.5rem] border border-slate-600'/>
                <button className='rounded-2xl px-8 py-3 border border-black hover:bg-sky-500/30 transition'>Request a Demo</button>
                <Link href={'/sign-up'}>
                    <button className='rounded-2xl px-8 py-3 bg-sky-500 hover:bg-sky-400 border-none transition'>SignUp</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HeaderPage