'use client'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'
const AnimatedHero = () => {
  return (
      <motion.div
          initial={{ scale: 0.96, rotate: 1}}
            transition={{
                duration: 1.2,
                delay: 0.1,
                type: "keyframes",
                stiffness: 100,
                damping: 20,
                animation: "spring",
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
          }}
          animate={{ scale: 1, rotate:0}}

          className="flex items-center justify-center w-full">
         <Image priority alt="hero" src="/images/hero.png" width={300} height={300} />
    </motion.div>
  )
}

export default AnimatedHero
