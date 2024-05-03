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
    <div className='flex items-center justify-evenly text-cyan-100 mt-5 gap-8'>
          <div className=' flex flex-col items-center justify-center gap-2'>
              <h3 className='text-xl font-bold'> Our Developers </h3>
              
              <div className='flex items-center justify-center gap-0.5'>
                    <motion.div className=' font-semibold text-5xl'>
                {roundedDevelopers}
                  </motion.div>
                  <span className='font-semibold text-3xl'>+</span>
              </div>
            
        </div>
          <div className=' flex flex-col items-center justify-center gap-2'>
              <h3 className='text-xl font-bold'> Project Showcased </h3>
              
              <div className='flex items-center justify-center gap-0.5'>
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
