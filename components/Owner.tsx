'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { site, whatsappUrl } from '@/lib/site-data'

const EASE = [0.22, 1, 0.36, 1] as const

function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : '100%', opacity: reduce ? 1 : 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.06 }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Parallax({
  children,
  className,
  distance = 30,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}

export function Owner() {
  const hostWhatsAppMessage =
    "Hello Ravindra garu, I would like to connect regarding a stay at Chandrika Guest House."

  return (
    <section id="owner" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        
        {/* Owner Image */}
        <Parallax distance={30} className="relative aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
          <div className="group relative h-full w-full overflow-hidden border border-charcoal/15 bg-charcoal/5 shadow-md">
            <Image
              src="/images/owner.webp"
              alt="Ravindra, Owner of Chandrika Guest House"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-[52%_20%] transition-transform duration-1000 ease-out group-hover:scale-105"
              priority
            />
          </div>
        </Parallax>

        {/* Minimal, Professional Bio & Contact */}
        <div className="flex flex-col gap-6 lg:max-w-xl">
          <Reveal>
            <span className="eyebrow text-earth">Host & Founder</span>
          </Reveal>

          <h2 className="font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-[3.5rem]">
            <TextReveal text="Ravindra" />
          </h2>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-charcoal/75 sm:text-xl font-display italic">
              &ldquo;Dedicated to offering you a peaceful stay and warm, personal hospitality in Araku Valley.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-sm leading-relaxed text-charcoal/65 sm:text-base">
              Chandrika Guest House is managed with direct care to ensure every guest enjoys 
              tranquil surroundings, clean and comfortable rooms, and prompt assistance throughout their stay.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappUrl(hostWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-forest px-6 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft transition-colors duration-500 hover:bg-charcoal"
              >
                <span>WhatsApp</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>

              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 border border-charcoal/25 px-6 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-soft"
              >
                <span>{site.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
