'use client'

import { type ReactNode, useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { site, whatsappUrl } from '@/lib/site-data'

const EASE = [0.22, 1, 0.36, 1] as const

function Reveal({
  children,
  delay = 0,
  y = 28,
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
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src || '/placeholder.svg'}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        initial={{ scale: reduce ? 1 : 1.18, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </div>
  )
}

function Parallax({
  children,
  className,
  distance = 60,
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

function WhatsAppFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 bg-forest px-5 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-soft shadow-lg transition-colors duration-500 hover:bg-charcoal sm:bottom-8 sm:right-8"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-soft"
          />
          WhatsApp
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}

export function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal">
        <Parallax distance={50} className="absolute inset-0 h-[120%]">
          <ImageReveal
            src="/images/night-terrace.png"
            alt="Warmly lit terrace of North Breeze at dusk with string lights"
            className="h-full w-full"
            imgClassName="opacity-45"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-36 lg:py-44">
          <Reveal>
            <span className="eyebrow text-soft/60">Your Stay Awaits</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] text-soft sm:text-6xl lg:text-7xl text-balance">
              Come stay a while in the hills.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-soft/75 sm:text-lg">
              Message us on WhatsApp or give us a call — we will help you find the right dates and answer
              anything about the stay.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-soft px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-500 hover:bg-forest hover:text-soft"
            >
              Book on WhatsApp
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="group inline-flex items-center justify-center gap-2.5 border border-soft/40 px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft transition-colors duration-500 hover:bg-soft hover:text-charcoal"
            >
              Call {site.phone}
            </a>
          </Reveal>
        </div>
      </section>
      <WhatsAppFab />
    </>
  )
}
