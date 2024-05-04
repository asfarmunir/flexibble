'use client'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect } from 'react'

const LiveNumbers = () => {

    const developers = useMotionValue(0);
    const projects = useMotionValue(0);
    const roundedDevelopers = useTransform(developers, latest => Math.round(latest));
    const roundedProjects = useTransform(projects, latest => Math.round(latest));
useEffect(() => {
  const controls = animate(developers, 15,
  {
    duration: 3,
    ease: "easeOut",
  }
  )

  return controls.stop
}, [])
useEffect(() => {
  const controls = animate(projects, 30,
  {
    duration: 3,
    ease: "easeOut",
  }
  )

  return controls.stop
}, [])
  return (
    <div className='flex items-center justify-evenly mt-5 gap-8 md:gap-12'>
          <div className=' flex flex-col-reverse items-center justify-center text-center gap-2 text-blue-100'>
              <h3 className='text-sm font-thin'> Our Developers </h3>
              
              <div className='flex items-center justify-center gap-0.5 text-white'>
                    <motion.div className=' font-semibold text-5xl'>
                {roundedDevelopers}
                  </motion.div>
                  <span className='font-semibold text-3xl'>+</span>
              </div>
            
        </div>
          <div className=' flex flex-col-reverse items-center justify-center text-center gap-2 text-blue-100'>
              <h3 className='text-sm font-light'> Projects Showcased</h3>
              
              <div className='flex items-center justify-center gap-0.5 text-white'>
                    <motion.div className=' font-semibold text-5xl'>
                {roundedProjects}
                  </motion.div>
                  <span className='font-semibold text-3xl'>+</span>
              </div>
            
        </div>
    </div>
  )
}

export default LiveNumbers
