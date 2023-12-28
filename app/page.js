"use client"
import { CarouselSidebar } from '@/components/landingPage/Carousel'
import HeaderPage from '@/components/landingPage/Header'
import { motion } from 'framer-motion'
import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { useInView, useAnimation } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'


const HomePage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref,{once:true})
  const mainControls = useAnimation()

  useEffect(()=>{
    if(isInView){
      mainControls.start("visible")
    }
  },[isInView])


  return (
    <div className='w-full' >

      <div className=''>
      <HeaderPage/>
      </div>


    {/* Banner Section */}
        <div 
        className='h-[100vh]  overflow-x-hidden imageUrl pt-[100px] flex justify-center items-center'>
          {/* <img src="/assets/lms-banner-6.png" className='absolute top-[100px] -right-[20rem] z-30 ml-auto overflow-x-hidden '  alt="" /> */}

        
          <div className='flex flex-col gap-x-4 gap-y-3 absolute z-40 bg-transparent right-[15rem] p-10'>
            <h3 className='text-4xl text-center'>The LMS</h3>
            <h2 className='text-6xl font-bold'>Designed For Achievement</h2>
            <div className='flex flex-col items-center'>
              <p className='text-xl'>Use the training platform created to</p>
              <p className='text-xl'>support the growth of exceptional teams to create a more intelligent organization.</p>
              </div>
              <div className='flex items-center mt-5 gap-3 pl-5'>
                <p className='text-6xl'>👉🏼</p>
                <Link href={'/search'}>
                  <button className='bg-sky-500 text-black px-6 py-4 rounded-xl border-none  hover:bg-sky-400 text-2xl '
                  >Start Exploring here!</button>
                </Link>
              </div>

          </div>
        </div>



    {/* Description here */}


    <motion.div
    ref={ref}
      variants={{
        hidden: {opacity:0, y:50},
        visible: {opacity:1, y:0}
      }}
      initial="hidden"
      animate={mainControls}
      transition={{duration:0.5, delay:0.25}}
    >
      
        <div 
        className='flex flex-col lg:flex-row gap-3 w-full max-w-screen-2xl mx-auto mt-[2rem] p-6 ' >
          <div 
          className='flex flex-col gap-2 flex-1 '>
            <h2 className='text-4xl font-semibold'>Industry-Leading Customer Service</h2>
            <p className=' text-2xl text-gray-700 font-medium line-clamp-9 linehight mt-3 w-4/5'>At Knowledge HUB, one of the ways we support learning is via our commitment to open-source learning technology. The ability to deliver educational materials on a customized, branded platform is highly appealing to companies looking to teach or train students, employees, volunteers, or customers.</p>
          </div>
          <div className='flex-1 ml-auto text-left w-full  rounded-md aspect-video'>
            <video src="/assets/lms-video-2.mp4" autoPlay loop muted className='w-full border-l-0  h-full'></video>
          </div>
          
        </div>

        <div className='flex flex-col lg:flex-row gap-3 w-full max-w-screen-2xl mx-auto mt-[2rem] p-6 ' >
        
          <div className='flex-1 ml-auto text-left w-full  rounded-md aspect-video'>
            <video src="/assets/lms-video1.mp4" autoPlay muted poster='https://cambodianeducationforum.files.wordpress.com/2020/09/lms.png?w=729' className='w-full border-l-0  h-full'></video>
          </div>
          <div className='flex flex-col gap-2 flex-1 '>
            <h2 className='text-4xl font-semibold'>All about an LMS</h2>
            <p className=' text-2xl text-gray-700 font-medium line-clamp-9 linehight mt-3 w-4/5'>An LMS, or learning management system, is a software tool that allows you to create, deliver, and report on training courses and programs. There are many LMSs to choose from, each offering different features and capabilities.</p>
          </div>
          
        </div>

        <div className='flex flex-col lg:flex-row gap-3 w-full max-w-screen-2xl mx-auto mt-[2rem] p-6 ' >
          <div className='flex flex-col gap-2 flex-1 '>
            <h2 className='text-4xl font-semibold'>Matches your style</h2>
            <p className=' text-2xl text-gray-700 font-medium line-clamp-9 linehight mt-3 w-4/5'>Teams embrace training when it’s relevant. Personalize their experience to match your branding and localize to your users’ languages for training that feels like it’s built just for them.</p>
          </div>
          <div className='flex-1 ml-auto text-left w-full  rounded-md aspect-video'>
            <video src="/assets/lms-video1.mp4" autoPlay loop muted className='w-full border-l-0  h-full'></video>
          </div>
          
        </div>

        <CarouselSidebar/>


    {/* Footer Section */}
        <div className='footer bg-blue-400 max-w-screen-3xl p-6  rounded-md h-[30rem] mx-auto mt-[7rem]'>
          <h1 className='text-2xl'>Contact us</h1>
          <div className='flex flex-col gap-5 items-center p-6'>
            <div>
              <p className='text-2xl'>Name</p>
              <input className="px-5 py-3 rounded-md bg-slate-200 text-2xl" placeholder="add a name"/>
            </div>
            <div>
              <p className='text-2xl'>Email</p>
              <input type="text" className="px-5 py-3 rounded-md bg-slate-200 text-2xl" placeholder="add an email"/>
            </div>
            <div>
              <p className='text-2xl'>Contact</p>
              <input type="text" className="px-5 py-3 rounded-md bg-slate-200 text-2xl" placeholder="add a contact"/>
            </div>
            <div className='w-[22%]'>
              <button className='p-4 bg-orange-500 rounded-md px-3 py-2 text-2xl w-full'>Submit</button>

            </div>
          </div>

        </div>

      </motion.div>


    </div>
  )
}


export default HomePage;


// font-family: 'Fira Sans', sans-serif;
