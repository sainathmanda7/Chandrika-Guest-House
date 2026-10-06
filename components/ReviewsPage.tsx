'use client'

import { testimonials } from '@/lib/site-data'
import { motion } from 'framer-motion'

export function ReviewsPage() {
  const items = [...testimonials, ...testimonials]

  return (
    <section className="overflow-hidden bg-charcoal py-24 text-soft sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="eyebrow text-soft/50 block mb-2">Guest Words</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-soft">
            Stories from our guests.
          </h2>
        </div>
        <a
          href="https://www.booking.com/reviews/in/hotel/coorg-estate-breeze-homestay.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-amber-200/80 hover:text-amber-200 transition-colors inline-flex items-center gap-1.5"
        >
          <span>Read all on Booking.com</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Soft edge gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-charcoal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-charcoal to-transparent" />

        <motion.div 
          className="flex w-max gap-6 px-3 sm:gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 65, ease: "linear" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="w-[340px] flex-shrink-0 rounded-2xl bg-white/5 p-8 border border-white/10 sm:w-[440px] flex flex-col justify-between hover:bg-white/[0.07] transition-colors"
            >
              <p className="font-display text-base leading-relaxed text-soft/90 sm:text-lg italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-medium tracking-wide text-soft">{item.name}</span>
                  <span className="text-xs uppercase tracking-widest text-soft/50">{item.detail}</span>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-amber-200/80 hover:text-amber-200 underline underline-offset-4"
                  >
                    Booking.com
                  </a>
                )}
              </footer>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
