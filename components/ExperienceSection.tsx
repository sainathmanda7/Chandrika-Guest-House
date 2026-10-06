'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const header = document.querySelector('header')
    if (header) {
      if (latest > 0.01 && latest < 0.99) {
        header.style.transform = 'translateY(-100%)'
        header.style.opacity = '0'
        header.style.pointerEvents = 'none'
      } else {
        header.style.transform = ''
        header.style.opacity = ''
        header.style.pointerEvents = ''
      }
    }
  })

  // Once day dissolves by 0.65, it stays strictly at 0 opacity till the very end and beyond
  const dayOpacity = useTransform(scrollYProgress, [0.05, 0.65, 1], [1, 0, 0], { clamp: true })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05], { clamp: true })

  return (
    <section className="relative h-[200vh] w-full" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        
        {/* Background Image: Night View */}
        <motion.div 
          className="absolute inset-0 h-full w-full"
          style={{ scale: imageScale }}
        >
          <Image
            src="/images/Night-view.png"
            alt="Night view of Araku valley with starry hills"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Foreground Image: Day View with strict fade to 0 */}
        <motion.div
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ opacity: dayOpacity, scale: imageScale }}
        >
          <Image
            src="/images/Day-view.png"
            alt="Day view of Araku hills in lush sunlight"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

      </div>
    </section>
  )
}
