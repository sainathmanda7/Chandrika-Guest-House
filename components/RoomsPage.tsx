'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { rooms } from '@/lib/site-data'

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

function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  className,
  children,
}: {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className ?? ''}`}
    >
      <Reveal>
        <span className="eyebrow text-earth">{eyebrow}</span>
      </Reveal>
      <h2 className="font-display text-4xl leading-[1.02] text-charcoal sm:text-5xl lg:text-6xl">
        <TextReveal text={title} />
      </h2>
      {children ? (
        <Reveal delay={0.1} className={align === 'center' ? 'max-w-xl' : 'max-w-md'}>
          <div className="text-base leading-relaxed text-charcoal/70 sm:text-lg">{children}</div>
        </Reveal>
      ) : null}
    </div>
  )
}

export function RoomsPage() {
  return (
    <section id="stay" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="The Rooms" title="Simple, restful rooms." />
      </div>

      <div className="mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:gap-10">
        {rooms.map((room, i) => (
          <Reveal key={room.id} delay={i * 0.1} className="group">
            <article className="flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <ImageReveal
                  src={room.image}
                  alt={`${room.name} at Chandrika Guest House`}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl text-charcoal sm:text-3xl">{room.name}</h3>
                <span className="eyebrow text-earth">{room.label}</span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/65 sm:text-base">
                {room.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
