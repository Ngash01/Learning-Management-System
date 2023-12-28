import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <Link href={'/'}>
        <Image src={"/assets/LMS-Logo12.jpg"} height={100} width={100}/>
    </Link>
  )
}
