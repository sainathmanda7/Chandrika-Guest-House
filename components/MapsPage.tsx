'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { site } from '@/lib/site-data'

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

export function MapsPage() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <Reveal>
            <span className="eyebrow text-earth">Finding Us</span>
          </Reveal>
          <h2 className="font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
            Find us in Araku
          </h2>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Chandrika Guest House sits in the scenic surroundings of Araku, an easy base for the viewpoints and
              coffee country of Araku valley. Reach out and we will gladly help you plan your route.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <ArrowLink href={site.mapsDirectionsUrl} variant="solid" external>
              Get directions
            </ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="aspect-[4/3] w-full overflow-hidden border border-charcoal/10 lg:aspect-auto">
          <iframe
            title="Map showing Araku Valley"
            src={site.mapsEmbedUrl}
            className="h-full min-h-[320px] w-full grayscale-[0.2]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  )
}
