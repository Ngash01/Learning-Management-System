"use client"
import { Button } from '@/components/ui/button';
import React from 'react'
import toast from 'react-hot-toast';

const AnalyticsPage = () => {

  const handleToast = ()=>{
    toast.success("Here is your hot toast!")
  }

  return (
    <div className='text-center space-y-10'>
      <Button onClick={handleToast}>
        Get Toast
      </Button>
    </div>
  )
}

export default AnalyticsPage;

