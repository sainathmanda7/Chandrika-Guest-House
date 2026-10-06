'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { site, whatsappUrl, nav } from '@/lib/site-data'

const EASE = [0.22, 1, 0.36, 1] as const

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.2,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  const isLinkActive = (item: (typeof nav)[number]) => {
    const section = activeSection.toLowerCase()
    const href = item.href.toLowerCase()
    const hrefId = href.replace(/^[/#]+/, '')
    const label = item.label.toLowerCase()

    if (hrefId === section || label === section || href === `#${section}` || href === `/${section}`) {
      return true
    }

    if (
      (section === 'home' || section === 'hero' || section === '') &&
      (href === '/' || href === '#' || hrefId === 'home' || hrefId === 'hero' || label === 'home')
    ) {
      return true
    }

    if (
      (section === 'stay' || section === 'rooms') &&
      (hrefId === 'stay' || hrefId === 'rooms' || label === 'stay' || label === 'rooms')
    ) {
      return true
    }

    if (
      (section === 'contact' || section === 'location' || section === 'cta') &&
      (hrefId === 'contact' || hrefId === 'location' || label === 'contact')
    ) {
      return true
    }

    return false
  }

  const solid = scrolled || open
  const textTone = solid ? 'text-charcoal' : 'text-soft'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? 'border-b border-charcoal/10 bg-ivory/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
          <Link
            href="/"
            className={`font-display text-xl tracking-wide transition-all duration-500 sm:text-2xl ${textTone}`}
            aria-label="Coorg North Breeze — home"
          >
            North Breeze
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = isLinkActive(item)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 ${textTone} ${
                      active ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px w-full ${solid ? 'bg-charcoal' : 'bg-soft'}`}
                      />
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 border px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 lg:inline-flex ${
                solid
                  ? 'border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-soft'
                  : 'border-soft/40 text-soft hover:bg-soft hover:text-charcoal'
              }`}
            >
              Book your stay <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden ${textTone}`}
            >
              <span
                className={`h-px w-6 bg-current transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
              />
              <span className={`h-px w-6 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span
                className={`h-px w-6 bg-current transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ivory px-6 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const active = isLinkActive(item)
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.06 }}
                    className="border-b border-charcoal/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block py-5 font-display text-4xl text-charcoal transition-opacity duration-300 ${
                        active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
            <motion.a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-charcoal px-7 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft"
            >
              Book your stay <span aria-hidden="true">↗</span>
            </motion.a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function Line({ children, delay }: { children: string; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function LandingPage() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <>
      <Navbar />
      <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
        <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-0 h-[118%] w-full">
          <motion.img
            src="/images/Landing Page.png"
            alt="Panoramic daytime view over the hills and homes of Coorg"
            className="h-full w-full object-cover"
            initial={{ scale: reduce ? 1 : 1.12 }}
            animate={{ scale: reduce ? 1 : 1 }}
            transition={{ duration: 12, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: reduce ? 0.6 : overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/80"
        />
        <motion.div
          style={{ y: reduce ? 0 : contentY }}
          className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
        >
          {/* Elegant Animated Editorial Monogram & Title Line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="flex items-center gap-3 sm:gap-4 mb-3"
          >
            {/* Glowing Animated Expanding Gold/Emerald Line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
              className="h-[1.5px] w-8 sm:w-12 bg-gradient-to-r from-amber-400/80 to-soft/40 origin-left"
            />

            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="font-serif italic text-lg sm:text-xl lg:text-2xl text-amber-200/95 tracking-wide drop-shadow-sm">
                Coorg North Breeze Homestay
              </span>
              <span className="text-soft/40 font-light hidden sm:inline">&mdash;</span>
              <span className="eyebrow text-soft/75 text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.24em] font-medium">
                {site.location}
              </span>
            </div>
          </motion.div>

          <h1 className="mt-2 max-w-4xl font-display text-[3.25rem] leading-[0.95] text-soft sm:text-7xl lg:text-8xl">
            <Line delay={0.45}>Wake to the</Line>
            <Line delay={0.58}>hills of Coorg.</Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-soft px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-500 hover:bg-forest hover:text-soft"
            >
              Book your stay
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              href="/stay"
              className="group inline-flex items-center justify-center gap-2.5 border border-soft/40 px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft transition-colors duration-500 hover:bg-soft hover:text-charcoal"
            >
              Explore rooms
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 text-soft/60 sm:right-8 lg:right-12 lg:flex"
        >
          <span className="text-[0.6875rem] uppercase tracking-[0.24em]">Scroll</span>
          <span className="h-10 w-px overflow-hidden bg-soft/20">
            <motion.span
              className="block h-4 w-px bg-soft"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      </section>
    </>
  )
}
