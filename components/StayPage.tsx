'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import type { ComponentProps } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Fade + rise reveal, triggered when the element enters the viewport. */
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

/** Word-by-word text reveal for headings. */
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

/** Image that reveals with a slow zoom-out as it enters the viewport. */
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

/** Parallax wrapper — child drifts vertically as the section scrolls through view. */
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

type Variant = 'solid' | 'outline' | 'ghost' | 'light'

const base =
  'group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500'

const variants: Record<Variant, string> = {
  solid: 'bg-charcoal text-soft px-7 py-4 hover:bg-forest',
  outline: 'border border-charcoal/30 text-charcoal px-7 py-4 hover:border-charcoal hover:bg-charcoal hover:text-soft',
  light: 'border border-soft/40 text-soft px-7 py-4 hover:bg-soft hover:text-charcoal',
  ghost: 'text-charcoal hover:text-earth',
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
    >
      ↗
    </span>
  )
}

function ArrowLink({
  href,
  children,
  variant = 'solid',
  className,
  external,
  ...rest
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  external?: boolean
} & Omit<ComponentProps<typeof Link>, 'href'>) {
  const cls = `${base} ${variants[variant]} ${className ?? ''}`
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <Arrow />
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      <Arrow />
    </Link>
  )
}

export function StayPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <Reveal>
            <span className="eyebrow text-earth">Welcome to North Breeze</span>
          </Reveal>
          <h2 className="font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-[3.75rem]">
            <TextReveal text="A home in the hills, made for slow days." />
          </h2>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Set on a ridge above Madikeri, North Breeze looks out across the rolling green of Coorg.
              Days begin with mist over the valley and end with the town glowing far below. Between them
              are open terraces, quiet rooms and the easy warmth of a family homestay.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="pt-2">
              <ArrowLink href="/stay" variant="outline">
                Discover the stay
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        <Parallax distance={40} className="aspect-[4/5] w-full overflow-hidden lg:aspect-[5/6]">
          <ImageReveal
            src="/images/property-exterior.png"
            alt="The North Breeze homestay in golden evening light, with its terracotta tiled roof"
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Parallax>
      </div>
    </section>
  )
}
