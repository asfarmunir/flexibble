'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TypeWriter } from '@/components/shared/TypeWriter'
import { motion } from "framer-motion";
import { AuroraBackground } from './AuroraBackground';
import { ImRocket } from "react-icons/im";

const page = () => {
  return (
    
          <AuroraBackground>
                <div className=' w-full flex items-center justify-between p-8 px-10 '>
              <Image src='/logo.svg' width={100} height={100} alt='logo' />
              <div className="group relative">
  <Link href={'https://github.com/asfarmunir'}>
  <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8 hover:scale-125 duration-200 hover:stroke-blue-500"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  </Link>
  <span className="absolute top-14 left-[50%] -translate-x-[50%] 
  z-20 origin-left scale-0 px-3 rounded-lg border 
  border-gray-300 bg-white py-2 text-sm font-bold
  shadow-md transition-all duration-200 ease-in-out 
  group-hover:scale-100">GitHub<span>
</span></span></div>
      </div>
          <TypeWriter />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-4xl md:text-7xl font-bold dark:text-white text-center">
        Welcome to <span className=' text-primary-100'> Flexibble </span>Where Dreams Become Portfolios!        </div>
        <div className="font-extralight text-base text-center md:text-3xl dark:text-neutral-200 py-4">
                  Join the Revolution of Creative Expression!
              </div>
        <Link href={'/home'} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-12 py-2 flex items-center justify-center gap-3 ">
          Lets Dive In <ImRocket className=' text-lg text-white' />

        </Link>
          </motion.div>
          
    </AuroraBackground>
  )
}

export default page



