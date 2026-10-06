'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery } from '@/lib/site-data'
import type { GalleryImage } from '@/lib/site-data'
import Image from 'next/image'

const EASE = [0.16, 1, 0.3, 1] as const
const MODAL_EASE = [0.22, 1, 0.36, 1] as const

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const open = index !== null

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      onNavigate((index + dir + images.length) % images.length)
    },
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go, onClose])

  const current = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-charcoal/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: MODAL_EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="flex items-center justify-between px-5 py-5 text-soft sm:px-8">
            <span className="text-[0.8125rem] tracking-[0.16em] tabular-nums text-soft/70">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-[0.8125rem] uppercase tracking-[0.16em] text-soft/80 transition-colors hover:text-soft"
            >
              Close ✕
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-16">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center border border-soft/30 text-soft transition-colors hover:bg-soft hover:text-charcoal sm:left-6"
            >
              ←
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={current.src}
                src={current.src || '/placeholder.svg'}
                alt={current.alt}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: MODAL_EASE }}
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center border border-soft/30 text-soft transition-colors hover:bg-soft hover:text-charcoal sm:right-6"
            >
              →
            </button>
          </div>

          <p className="px-5 pb-6 text-center text-sm text-soft/60 sm:px-8">{current.alt}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

// Random aesthetic bento grid layout for the 6 images:
const layout = [
  // 0: Road view (Special Attraction - massive hero piece spanning 7 cols & 2 rows)
  'col-span-12 row-span-1 md:col-span-7 md:row-span-2',
  // 1: Balcony (Top right)
  'col-span-6 row-span-1 md:col-span-5 md:row-span-1',
  // 2: Pent House (Mid right)
  'col-span-6 row-span-1 md:col-span-5 md:row-span-1',
  // 3: Real night view (Bottom left)
  'col-span-4 row-span-1 md:col-span-4 md:row-span-1',
  // 4: Hall (Bottom center - wider for visual rhythm)
  'col-span-4 row-span-1 md:col-span-5 md:row-span-1',
  // 5: Window view (Bottom right)
  'col-span-4 row-span-1 md:col-span-3 md:row-span-1',
]

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  
  // Exactly 6 curated images from public/Gallery
  const preview = gallery.slice(0, 6)

  return (
    <section 
      id="gallery" 
      className="relative bg-white overflow-hidden h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 select-none"
    >
      <div className="mx-auto w-full max-w-[1400px] h-full flex flex-col justify-between gap-2.5 sm:gap-3.5">
        
        {/* Header Bar - Positioned cleanly below the fixed navbar */}
        <div className="shrink-0 flex items-end justify-between gap-4 border-b border-charcoal/10 pb-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-forest uppercase tracking-[0.25em] font-semibold text-[10px] sm:text-xs block mb-0.5"
            >
              Visual Journal
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal tracking-tight leading-none"
            >
              A Canvas of <span className="italic font-light text-forest">Moments.</span>
            </motion.h2>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/60 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
            <span>Click to Expand</span>
          </div>
        </div>

        {/* Asymmetrical Bento Grid - Perfectly fills 100% of remaining screen height */}
        <div className="flex-1 min-h-0 w-full grid grid-cols-12 grid-rows-3 gap-2 sm:gap-3 lg:gap-3.5">
          {preview.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal/10 bg-stone-100 cursor-pointer ${layout[i] ?? 'col-span-4 row-span-1'}`}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.03 }}
            >
              {/* Special Attraction Badge for Road View (Index 0) */}
              {i === 0 && (
                <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-30 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white shadow-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                    <span className="text-[9px] sm:text-[11px] uppercase tracking-widest font-semibold">Special Attraction</span>
                  </div>
                </div>
              )}

              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 50vw, 30vw'}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              
              {/* Refined Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-2.5 sm:p-3.5">
                <div className="text-left text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/75 font-mono">{img.category}</p>
                  <p className="text-xs sm:text-sm font-serif font-medium tracking-wide drop-shadow-sm">{img.alt}</p>
                </div>
              </div>
              
              {/* Soft Inner Border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl sm:rounded-2xl lg:rounded-3xl z-20 pointer-events-none" />
            </motion.button>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox 
        images={preview} 
        index={lightbox} 
        onClose={() => setLightbox(null)} 
        onNavigate={setLightbox} 
      />
    </section>
  )
}
